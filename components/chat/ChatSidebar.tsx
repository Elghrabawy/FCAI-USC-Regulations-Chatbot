"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, MessageSquareIcon, Trash2Icon, XIcon, PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";
import type { ChatSession, Language, Translation } from "@/lib/types";
import { formatDate } from "@/lib/chat-helpers";

interface ChatSidebarProps {
  isOpen: boolean;
  isDesktopCollapsed: boolean;
  onClose: () => void;
  onToggleDesktop: () => void;
  chatSessions: ChatSession[];
  currentChatId: string | null;
  lang: Language;
  t: Translation;
  isRTL: boolean;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string, e: React.MouseEvent) => void;
}

export function ChatSidebar({
  isOpen,
  isDesktopCollapsed,
  onClose,
  onToggleDesktop,
  chatSessions,
  currentChatId,
  lang,
  t,
  isRTL,
  onNewChat,
  onSelectChat,
  onDeleteChat,
}: ChatSidebarProps) {
  // Sort chats by updatedAt (most recent first)
  const sortedChats = [...chatSessions].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <>
      {/* Sidebar Overlay for Mobile - transparent with blur */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-transparent backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Collapsed Sidebar Bar for Desktop - thin strip with open button */}
      <div className={`
        hidden md:flex flex-col items-center py-3 bg-secondary/30 border-e
        transition-all duration-300 ease-in-out
        ${isDesktopCollapsed ? "w-12" : "w-0 overflow-hidden border-0"}
      `}>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleDesktop}
          className="h-8 w-8"
          title={t.showSidebar}
        >
          {isRTL ? <PanelLeftCloseIcon className="h-4 w-4" /> : <PanelLeftOpenIcon className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed z-50 h-full w-72 bg-background/80 backdrop-blur-md border-e flex flex-col
        transition-all duration-300 ease-in-out
        md:relative md:bg-secondary/30 md:backdrop-blur-none
        ${isOpen ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"} 
        ${isDesktopCollapsed ? "md:w-0 md:opacity-0 md:overflow-hidden md:border-0" : "md:translate-x-0 md:w-72 md:opacity-100"}
      `}>
        {/* Sidebar Header */}
        <div className="p-3 border-b flex items-center justify-between">
          <h2 className="font-semibold text-sm">{t.chatHistory}</h2>
          <div className="flex items-center gap-1">
            {/* Desktop collapse button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleDesktop}
              className="hidden md:flex h-7 w-7"
              title={t.hideSidebar}
            >
              {isRTL ? <PanelLeftOpenIcon className="h-4 w-4" /> : <PanelLeftCloseIcon className="h-4 w-4" />}
            </Button>
            {/* Mobile close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="md:hidden h-7 w-7"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-2">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={onNewChat}
          >
            <PlusIcon className="h-4 w-4" />
            {t.newChat}
          </Button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {sortedChats.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              {t.noChats}
            </p>
          ) : (
            sortedChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`
                  group flex items-center gap-2 p-2 rounded-lg cursor-pointer
                  hover:bg-accent transition-colors
                  ${currentChatId === chat.id ? "bg-accent" : ""}
                `}
              >
                <MessageSquareIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{chat.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(chat.updatedAt, lang)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => onDeleteChat(chat.id, e)}
                  title={t.deleteChat}
                >
                  <Trash2Icon className="h-3 w-3 text-destructive" />
                </Button>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}
