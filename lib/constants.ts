import type { Translations } from "./types";

// Translations
export const translations: Translations = {
  ar: {
    title: "روبوت الدردشة للوائح كلية الحاسبات والذكاء الاصطناعي",
    subtitle: "اسأل عن لوائح كلية الحاسبات والذكاء الاصطناعي - جامعة مدينة السادات",
    reference: "المرجع",
    referenceName: "اللائحة الداخلية لكلية الحاسبات والذكاء الاصطناعي",
    welcome: "مرحباً بك!",
    welcomeDesc: "أنا مساعدك للإجابة عن أسئلتك حول لوائح كلية الحاسبات والذكاء الاصطناعي. اكتب سؤالك في الأسفل للبدء.",
    examplesTitle: "💡 أمثلة على الأسئلة:",
    examples: [
      "كم عدد الساعات المطلوبة للتخرج؟",
      "ما هي شروط الانسحاب من المقررات؟",
      "كيف يتم حساب المعدل التراكمي؟",
      "ما هي المقررات الاختيارية المتاحة؟",
    ],
    placeholder: "اكتب سؤالك هنا... (مثال: كم عدد الساعات المطلوبة للتخرج؟)",
    thinking: "جاري التفكير...",
    errorMessage: "عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.",
    sources: "المصادر",
    page: "صفحة",
    langSwitch: "English",
    newChat: "محادثة جديدة",
    chatHistory: "سجل المحادثات",
    noChats: "لا توجد محادثات سابقة",
    deleteChat: "حذف المحادثة",
    hideSidebar: "إخفاء القائمة الجانبية",
    showSidebar: "إظهار القائمة الجانبية",
  },
  en: {
    title: "FCAI USC Regulations Chatbot",
    subtitle: "Ask about Faculty of Computers and AI regulations - University of Sadat City",
    reference: "Reference",
    referenceName: "FCAI Internal Regulations",
    welcome: "Welcome!",
    welcomeDesc: "I'm your assistant to answer questions about the Faculty of Computers and Artificial Intelligence regulations. Type your question below to get started.",
    examplesTitle: "💡 Example questions:",
    examples: [
      "How many credit hours are required for graduation?",
      "What are the course withdrawal conditions?",
      "How is the GPA calculated?",
      "What are the available elective courses?",
    ],
    placeholder: "Type your question here... (e.g., How many hours are required for graduation?)",
    thinking: "Thinking...",
    errorMessage: "Sorry, an error occurred while processing your request. Please try again.",
    sources: "Sources",
    page: "Page",
    langSwitch: "العربية",
    newChat: "New Chat",
    chatHistory: "Chat History",
    noChats: "No previous chats",
    deleteChat: "Delete chat",
    hideSidebar: "Hide sidebar",
    showSidebar: "Show sidebar",
  },
};

// Reference PDF file
export const REFERENCE_PDF = {
  file: "FCAI Internal Regulations.pdf",
  year: "2019",
  url: "/USC Faculty of Computer and Artificial Intelligence Internal Regulations (October 2019).pdf",
};

// Local storage keys
export const STORAGE_KEYS = {
  CHATS: "fcai-chatbot-chats",
  CURRENT_CHAT: "fcai-chatbot-current-chat",
  LANGUAGE: "fcai-chatbot-language",
};

// API endpoint
export const API_ENDPOINT = "https://ahmed-ayman-fcai-usc-regulations-chatbot-api.hf.space/api/chat";
