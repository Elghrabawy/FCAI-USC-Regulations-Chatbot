"use client";

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

  return (
    <div className={`flex h-screen bg-background ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
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
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <ChatHeader
          t={t}
          onToggleSidebar={toggleSidebar}
          onToggleLanguage={toggleLanguage}
        />

        {/* Chat Area */}
        <Conversation className="flex-1" style={{ minHeight: 0 }}>
          <ConversationContent className="max-w-4xl mx-auto">
            {messages.length === 0 ? (
              <WelcomeScreen t={t} isRTL={isRTL} />
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
      </div>
    </div>
  );
}