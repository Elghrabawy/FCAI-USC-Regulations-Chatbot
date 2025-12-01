"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Message,
  MessageContent,
} from "@/components/ui/shadcn-io/ai/message";
import { Response } from "@/components/ui/shadcn-io/ai/response";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ui/shadcn-io/ai/source";
import { BotIcon, UserIcon } from "lucide-react";
import type { ChatMessage, Translation } from "@/lib/types";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
  t: Translation;
}

const messageVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: { opacity: 0, scale: 0.95 }
};

export function ChatMessages({ messages, isLoading, t }: ChatMessagesProps) {
  return (
    <AnimatePresence mode="popLayout">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          variants={messageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          layout
        >
          <Message from={message.role}>
            <div className={`
              relative h-10 w-10 rounded-xl flex items-center justify-center shrink-0
              ${message.role === "user" 
                ? "bg-gradient-to-br from-primary/20 to-primary/10" 
                : "bg-gradient-to-br from-emerald-500/20 to-teal-500/10"
              }
            `}>
              {message.role === "user" ? (
                <UserIcon className="h-5 w-5 text-primary" />
              ) : (
                <BotIcon className="h-5 w-5 text-emerald-600" />
              )}
              {message.role === "assistant" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background"
                />
              )}
            </div>
            <MessageContent>
              {message.role === "assistant" ? (
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <Response>{message.content}</Response>
                  </div>

                  {message.sources && message.sources.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Sources>
                        <SourcesTrigger count={message.sources.length} label={t.sources} />
                        <SourcesContent>
                          {message.sources.map((source, idx) => (
                            <Source
                              key={idx}
                              href={`/${source.title}#page=${source.page}`}
                              title={`${source.title}${source.page ? ` - ${t.page} ${source.page}` : ""}`}
                            />
                          ))}
                        </SourcesContent>
                      </Sources>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <div className="text-foreground/90">{message.content}</div>
              )}
            </MessageContent>
          </Message>
        </motion.div>
      ))}

      {/* Loading indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Message from="assistant">
            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center shrink-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <BotIcon className="h-5 w-5 text-emerald-600" />
              </motion.div>
            </div>
            <MessageContent>
              <div className="flex items-center gap-3 py-2">
                <div className="flex items-center gap-1.5">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="h-2 w-2 rounded-full bg-emerald-500"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="h-2 w-2 rounded-full bg-emerald-500"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="h-2 w-2 rounded-full bg-emerald-500"
                  />
                </div>
                <span className="text-muted-foreground text-sm">{t.thinking}</span>
              </div>
            </MessageContent>
          </Message>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

