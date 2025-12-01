"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlusIcon, MessageSquareIcon, Trash2Icon, XIcon, PanelLeftCloseIcon, PanelLeftOpenIcon, SparklesIcon } from "lucide-react";
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

  // Shared sidebar content - render function to avoid React compiler warning
  const renderSidebarContent = (isMobile = false) => (
    <>
      {/* Sidebar Header */}
      <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-transparent flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <MessageSquareIcon className="h-4 w-4 text-primary" />
          </div>
          <h2 className="font-semibold text-sm">{t.chatHistory}</h2>
        </div>
        <div className="flex items-center gap-1">
          {!isMobile && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleDesktop}
                className="h-8 w-8 rounded-lg hover:bg-primary/10"
                title={t.hideSidebar}
              >
                {isRTL ? <PanelLeftOpenIcon className="h-4 w-4" /> : <PanelLeftCloseIcon className="h-4 w-4" />}
              </Button>
            </motion.div>
          )}
          {isMobile && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 rounded-lg hover:bg-destructive/10 hover:text-destructive"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-11 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 hover:bg-primary/15 transition-all group"
            onClick={onNewChat}
          >
            <div className="h-6 w-6 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <PlusIcon className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="font-medium">{t.newChat}</span>
            <SparklesIcon className="h-3.5 w-3.5 text-primary/50 ml-auto" />
          </Button>
        </motion.div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-1.5">
        <AnimatePresence mode="popLayout">
          {sortedChats.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mb-4">
                <MessageSquareIcon className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <p className="text-sm text-muted-foreground">{t.noChats}</p>
            </motion.div>
          ) : (
            sortedChats.map((chat, index) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectChat(chat.id)}
                className={`
                  group flex items-center gap-3 p-3 rounded-xl cursor-pointer
                  transition-all duration-200
                  ${currentChatId === chat.id 
                    ? "bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/20 shadow-sm" 
                    : "hover:bg-accent/80 border border-transparent"
                  }
                `}
              >
                <div className={`
                  h-9 w-9 rounded-lg flex items-center justify-center shrink-0 transition-colors
                  ${currentChatId === chat.id 
                    ? "bg-primary/20 text-primary" 
                    : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  }
                `}>
                  <MessageSquareIcon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{chat.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatDate(chat.updatedAt, lang)}
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="opacity-0 group-hover:opacity-100"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-lg hover:bg-destructive/15 hover:text-destructive transition-all"
                    onClick={(e) => onDeleteChat(chat.id, e)}
                    title={t.deleteChat}
                  >
                    <Trash2Icon className="h-3.5 w-3.5" />
                  </Button>
                </motion.div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: isRTL ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? "100%" : "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed z-50 h-full w-72 bg-gradient-to-b from-background/95 to-background/90 backdrop-blur-xl border-e flex flex-col shadow-2xl md:hidden"
          >
            {renderSidebarContent(true)}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Collapsed Bar */}
      <motion.div
        initial={false}
        animate={{ 
          width: isDesktopCollapsed ? 48 : 0,
          opacity: isDesktopCollapsed ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:flex flex-col items-center py-3 bg-gradient-to-b from-secondary/40 to-secondary/20 border-e overflow-hidden"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDesktop}
            className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all"
            title={t.showSidebar}
          >
            {isRTL ? <PanelLeftCloseIcon className="h-4 w-4" /> : <PanelLeftOpenIcon className="h-4 w-4" />}
          </Button>
        </motion.div>
      </motion.div>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isDesktopCollapsed ? 0 : 288,
          opacity: isDesktopCollapsed ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`
          hidden md:flex flex-col bg-gradient-to-b from-secondary/30 to-secondary/10 border-e
          ${isDesktopCollapsed ? "overflow-hidden border-0" : ""}
        `}
      >
        {renderSidebarContent(false)}
      </motion.aside>
    </>
  );
}
