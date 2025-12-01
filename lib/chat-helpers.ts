import type { Language, ParsedSource, ApiResponse, ChatSession, ChatMessage, Theme } from "./types";
import { API_ENDPOINT } from "./constants";

// Simple ID generator
let messageIdCounter = 0;
export const generateId = () => `msg-${Date.now()}-${++messageIdCounter}`;

// Helper functions for local storage
export const saveToStorage = (key: string, data: unknown) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored) as T;
      } catch {
        return defaultValue;
      }
    }
  }
  return defaultValue;
};

// Format date for display
export const formatDate = (timestamp: number, lang: Language): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return lang === "ar" ? "اليوم" : "Today";
  } else if (diffDays === 1) {
    return lang === "ar" ? "أمس" : "Yesterday";
  } else if (diffDays < 7) {
    return lang === "ar" ? `منذ ${diffDays} أيام` : `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
      month: "short",
      day: "numeric",
    });
  }
};

// Parse sources from the answer text
export function parseSources(answer: string): { cleanAnswer: string; sources: ParsedSource[] } {
  const sourcesMatch = answer.match(/📚 المصادر:\n([\s\S]*?)$/);
  
  if (!sourcesMatch) {
    return { cleanAnswer: answer, sources: [] };
  }

  const cleanAnswer = answer.replace(/📚 المصادر:\n[\s\S]*$/, "").trim();
  const sourcesText = sourcesMatch[1];
  
  const sourceLines = sourcesText.split("\n").filter(line => line.trim().startsWith("•"));
  const sources: ParsedSource[] = sourceLines.map(line => {
    const match = line.match(/• (.+\.pdf) \| صفحة (\d+)/);
    if (match) {
      return {
        title: match[1].replace("./", ""),
        page: match[2],
      };
    }
    return { title: line.replace("• ", "").trim(), page: "" };
  });

  return { cleanAnswer, sources };
}

// API query function
export async function apiQuery(query: string): Promise<ApiResponse> {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch response");
  }
  
  return response.json();
}

// Initialize state from storage
export function initializeChatSessions(): ChatSession[] {
  if (typeof window !== "undefined") {
    return loadFromStorage<ChatSession[]>("fcai-chatbot-chats", []);
  }
  return [];
}

export function initializeCurrentChatId(): string | null {
  if (typeof window !== "undefined") {
    return loadFromStorage<string | null>("fcai-chatbot-current-chat", null);
  }
  return null;
}

export function initializeMessages(): ChatMessage[] {
  if (typeof window !== "undefined") {
    const storedCurrentChat = loadFromStorage<string | null>("fcai-chatbot-current-chat", null);
    const storedChats = loadFromStorage<ChatSession[]>("fcai-chatbot-chats", []);
    if (storedCurrentChat) {
      const currentChat = storedChats.find(c => c.id === storedCurrentChat);
      if (currentChat) {
        return currentChat.messages;
      }
    }
  }
  return [];
}

export function initializeLanguage(): Language {
  if (typeof window !== "undefined") {
    return loadFromStorage<Language>("fcai-chatbot-language", "ar");
  }
  return "ar";
}

export function initializeTheme(): Theme {
  if (typeof window !== "undefined") {
    const stored = loadFromStorage<Theme>("fcai-chatbot-theme", "light");
    // Check system preference if no stored value
    if (!localStorage.getItem("fcai-chatbot-theme")) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return stored;
  }
  return "light";
}
