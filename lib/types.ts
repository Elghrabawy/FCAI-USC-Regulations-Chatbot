// Language types
export type Language = "ar" | "en";

// Types for chat messages
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: ParsedSource[];
}

export interface ParsedSource {
  title: string;
  page: string;
}

export interface ApiResponse {
  answer: string;
}

// Chat session type for history
export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

// Translation type
export interface Translation {
  title: string;
  subtitle: string;
  reference: string;
  referenceName: string;
  welcome: string;
  welcomeDesc: string;
  examplesTitle: string;
  examples: string[];
  placeholder: string;
  thinking: string;
  errorMessage: string;
  sources: string;
  page: string;
  langSwitch: string;
  newChat: string;
  chatHistory: string;
  noChats: string;
  deleteChat: string;
  hideSidebar: string;
  showSidebar: string;
  darkMode: string;
  lightMode: string;
}

export type Theme = "light" | "dark";

export type Translations = Record<Language, Translation>;
