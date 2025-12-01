"use client";

import { motion } from "framer-motion";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ui/shadcn-io/ai/conversation";
import {
  ChatSidebar,
  ChatHeader,
  WelcomeScreen,
  ChatMessages,
  ChatInput,
} from "@/components/chat";
import { useChatState } from "@/hooks";

export default function Home() {
  const {
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
    setInputText,
    createNewChat,
    selectChat,
    deleteChat,
    handleSubmit,
    toggleLanguage,
    toggleSidebar,
    closeSidebar,
    toggleDesktopSidebar,
  } = useChatState();

  const handleExampleClick = (example: string) => {
    setInputText(example);
  };

  return (
    <div className={`flex h-screen bg-background overflow-hidden ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Sidebar */}
      <ChatSidebar
        isOpen={sidebarOpen}
        isDesktopCollapsed={desktopSidebarCollapsed}
        onClose={closeSidebar}
        onToggleDesktop={toggleDesktopSidebar}
        chatSessions={chatSessions}
        currentChatId={currentChatId}
        lang={lang}
        t={t}
        isRTL={isRTL}
        onNewChat={createNewChat}
        onSelectChat={selectChat}
        onDeleteChat={deleteChat}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col min-w-0 relative"
      >
        {/* Header */}
        <ChatHeader
          t={t}
          onToggleSidebar={toggleSidebar}
          onToggleLanguage={toggleLanguage}
        />

        {/* Chat Area */}
        <Conversation className="flex-1 relative" style={{ minHeight: 0 }}>
          <ConversationContent className="max-w-4xl mx-auto px-4">
            {messages.length === 0 ? (
              <WelcomeScreen t={t} isRTL={isRTL} onExampleClick={handleExampleClick} />
            ) : (
              <ChatMessages
                messages={messages}
                isLoading={isLoading}
                t={t}
              />
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {/* Input Area */}
        <ChatInput
          inputText={inputText}
          onInputChange={setInputText}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          status={status}
          t={t}
        />
      </motion.div>
    </div>
  );
}