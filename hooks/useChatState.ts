"use client";

import { useState, useCallback, useEffect, type FormEventHandler } from "react";
import type { Language, ChatMessage, ChatSession } from "@/lib/types";
import { translations, STORAGE_KEYS } from "@/lib/constants";
import {
  generateId,
  saveToStorage,
  apiQuery,
  parseSources,
  initializeChatSessions,
  initializeCurrentChatId,
  initializeMessages,
  initializeLanguage,
} from "@/lib/chat-helpers";

export function useChatState() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(initializeChatSessions);
  const [currentChatId, setCurrentChatId] = useState<string | null>(initializeCurrentChatId);
  const [messages, setMessages] = useState<ChatMessage[]>(initializeMessages);
  const [inputText, setInputText] = useState("");
  const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready");
  const [lang, setLang] = useState<Language>(initializeLanguage);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const t = translations[lang];
  const isRTL = lang === "ar";

  // Mark as hydrated on mount
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Save chats to local storage when they change
  useEffect(() => {
    if (isHydrated) {
      saveToStorage(STORAGE_KEYS.CHATS, chatSessions);
    }
  }, [chatSessions, isHydrated]);

  // Save current chat ID to local storage
  useEffect(() => {
    if (isHydrated) {
      saveToStorage(STORAGE_KEYS.CURRENT_CHAT, currentChatId);
    }
  }, [currentChatId, isHydrated]);

  // Save language preference
  useEffect(() => {
    if (isHydrated) {
      saveToStorage(STORAGE_KEYS.LANGUAGE, lang);
    }
  }, [lang, isHydrated]);

  // Function to update chat session
  const updateChatSession = useCallback((chatId: string, newMessages: ChatMessage[]) => {
    setChatSessions(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, messages: newMessages, updatedAt: Date.now() }
        : chat
    ));
  }, []);

  const createNewChat = useCallback(() => {
    setCurrentChatId(null);
    setMessages([]);
    setSidebarOpen(false);
  }, []);

  const selectChat = useCallback((chatId: string) => {
    const chat = chatSessions.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
      setSidebarOpen(false);
    }
  }, [chatSessions]);

  const deleteChat = useCallback((chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChatSessions(prev => prev.filter(c => c.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
      setMessages([]);
    }
  }, [currentChatId]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!inputText.trim() || status !== "ready") {
      return;
    }

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: inputText.trim(),
    };

    let activeChatId = currentChatId;
    let updatedMessages: ChatMessage[];

    // Create new chat session if none exists
    if (!currentChatId) {
      const newChatId = `chat-${Date.now()}`;
      const newChat: ChatSession = {
        id: newChatId,
        title: inputText.trim().slice(0, 50) + (inputText.trim().length > 50 ? "..." : ""),
        messages: [userMessage],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setChatSessions(prev => [newChat, ...prev]);
      setCurrentChatId(newChatId);
      activeChatId = newChatId;
      updatedMessages = [userMessage];
      setMessages(updatedMessages);
    } else {
      updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      updateChatSession(currentChatId, updatedMessages);
    }

    setInputText("");
    setStatus("submitted");

    try {
      setStatus("streaming");
      const response = await apiQuery(userMessage.content);
      
      const { cleanAnswer, sources } = parseSources(response.answer);

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: cleanAnswer,
        sources,
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      if (activeChatId) {
        updateChatSession(activeChatId, finalMessages);
      }
      setStatus("ready");
    } catch (error) {
      console.error("Error fetching response:", error);
      setStatus("error");
      
      const errorMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: t.errorMessage,
      };
      
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      if (activeChatId) {
        updateChatSession(activeChatId, finalMessages);
      }
      
      setTimeout(() => setStatus("ready"), 2000);
    }
  };

  const toggleLanguage = useCallback(() => {
    setLang(lang === "ar" ? "en" : "ar");
  }, [lang]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const toggleDesktopSidebar = useCallback(() => {
    setDesktopSidebarCollapsed(prev => !prev);
  }, []);

  const isLoading = status === "submitted" || status === "streaming";

  return {
    // State
    chatSessions,
    currentChatId,
    messages,
    inputText,
    status,
    lang,
    sidebarOpen,
    desktopSidebarCollapsed,
    isLoading,
    t,
    isRTL,
    
    // Actions
    setInputText,
    createNewChat,
    selectChat,
    deleteChat,
    handleSubmit,
    toggleLanguage,
    toggleSidebar,
    closeSidebar,
    toggleDesktopSidebar,
  };
}
