"use client";

import { useState, useCallback, type FormEventHandler } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ui/shadcn-io/ai/conversation";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/shadcn-io/ai/message";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ui/shadcn-io/ai/prompt-input";
import { Response } from "@/components/ui/shadcn-io/ai/response";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ui/shadcn-io/ai/source";
import { Loader } from "@/components/ui/shadcn-io/ai/loader";
import { FileTextIcon, GlobeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Language types
type Language = "ar" | "en";

// Translations
const translations = {
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
  },
};

// Reference PDF file
const REFERENCE_PDF = {
  file: "FCAI Internal Regulations.pdf",
  year: "2019",
  url: "/USC Faculty of Computer and Artificial Intelligence Internal Regulations (October 2019).pdf",
};

// Simple ID generator
let messageIdCounter = 0;
const generateId = () => `msg-${Date.now()}-${++messageIdCounter}`;

// Types for chat messages
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: ParsedSource[];
}

interface ParsedSource {
  title: string;
  page: string;
}

interface ApiResponse {
  answer: string;
}

// Parse sources from the answer text
function parseSources(answer: string): { cleanAnswer: string; sources: ParsedSource[] } {
  console.log("Parsing answer for sources:", answer);
  const sourcesMatch = answer.match(/📚 المصادر:\n([\s\S]*?)$/);
  
  if (!sourcesMatch) {
    return { cleanAnswer: answer, sources: [] };
  }

  const cleanAnswer = answer.replace(/📚 المصادر:\n[\s\S]*$/, "").trim();
  const sourcesText = sourcesMatch[1];
  
  const sourceLines = sourcesText.split("\n").filter(line => line.trim().startsWith("•"));
  const sources: ParsedSource[] = sourceLines.map(line => {
    const match = line.match(/• (.+\.pdf) \| صفحة (\d+)/);
    console.log("match:", match);
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

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready");
  const [lang, setLang] = useState<Language>("ar");

  const t = translations[lang];
  const isRTL = lang === "ar";

  const apiQuery = useCallback(async (query: string): Promise<ApiResponse> => {
    const response = await fetch(
      "https://ahmed-ayman-fcai-usc-regulations-chatbot-api.hf.space/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch response");
    }
    
    return response.json();
  }, []);

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

    setMessages((prev) => [...prev, userMessage]);
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

      setMessages((prev) => [...prev, assistantMessage]);
      setStatus("ready");
    } catch (error) {
      console.error("Error fetching response:", error);
      setStatus("error");
      
      const errorMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: t.errorMessage,
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      
      setTimeout(() => setStatus("ready"), 2000);
    }
  };

  const isLoading = status === "submitted" || status === "streaming";

  const toggleLanguage = () => {
    setLang(lang === "ar" ? "en" : "ar");
  };

  return (
    <div className={`flex flex-col h-screen bg-background ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="border-b px-4 py-3">
        <div className="flex items-center justify-between mx-auto">
          <div className="flex-1 hidden md:flex justify-start text-sm text-muted-foreground items-center">
            <a
              href={REFERENCE_PDF.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-accent"
              title={`${t.reference}: ${t.referenceName} (${REFERENCE_PDF.year})`}
            >
              <FileTextIcon className="h-4 w-4 text-red-500" />
              <span>{t.reference}</span>
            </a>
          </div>
          
          <div className="flex-3 text-center">
            <h1 className="md:text-md lg:text-lg xl:text-xl font-semibold">
              {t.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t.subtitle}
            </p>
          </div>
          
          <div className="flex-1 hidden md:flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2"
            >
              <GlobeIcon className="h-4 w-4" />
              {t.langSwitch}
            </Button>
          </div>
        
        </div>
      </header>

      {/* Chat Area */}
      <Conversation className="flex-1" style={{ minHeight: 0 }}>
        <ConversationContent className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="text-6xl mb-4">🤖</div>
              <h2 className="text-2xl font-semibold mb-2">{t.welcome}</h2>
              <p className="text-muted-foreground max-w-md mb-6">
                {t.welcomeDesc}
              </p>
              <div className="bg-secondary/50 rounded-lg p-4 max-w-md">
                <p className="text-sm text-primary mb-2">{t.examplesTitle}</p>
                <ul className={`text-sm text-muted-foreground space-y-1 ${isRTL ? "text-right" : "text-left"}`}>
                  {t.examples.map((example, index) => (
                    <li key={index}>• {example}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <Message from={message.role} key={message.id}>
                  <MessageAvatar
                    src={
                      message.role === "user"
                        ? "https://github.com/human.png"
                        : "https://github.com/openai.png"
                    }
                    name={message.role === "user" ? "You" : "AI"}
                  />
                  <MessageContent>
                    {message.role === "assistant" ? (
                      <div className="space-y-4">
                        <Response>{message.content}</Response>
                        
                        {message.sources && message.sources.length > 0 && (
                          <Sources>
                            <SourcesTrigger count={message.sources.length} label={t.sources} />
                            <SourcesContent>
                              {message.sources.map((source, index) => (
                                <Source
                                  key={index}
                                  href={`/${source.title}#page=${source.page}`}
                                  title={`${source.title}${source.page ? ` - ${t.page} ${source.page}` : ""}`}
                                />
                              ))}
                            </SourcesContent>
                          </Sources>
                        )}
                      </div>
                    ) : (
                      message.content
                    )}
                  </MessageContent>
                </Message>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <Message from="assistant">
                  <MessageAvatar
                    src="https://github.com/openai.png"
                    name="AI"
                  />
                  <MessageContent>
                    <div className="flex items-center gap-2">
                      <Loader size={16} />
                      <span className="text-muted-foreground">{t.thinking}</span>
                    </div>
                  </MessageContent>
                </Message>
              )}
            </>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {/* Input Area */}
      <div className="border-t p-4 max-w-4xl mx-auto w-full">
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
            value={inputText}
            placeholder={t.placeholder}
            disabled={isLoading}
          />
          <PromptInputToolbar>
            <PromptInputTools />
            <PromptInputSubmit disabled={!inputText.trim() || isLoading} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
}