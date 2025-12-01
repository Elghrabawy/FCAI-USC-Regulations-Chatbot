"use client";

import { motion } from "framer-motion";
import type { FormEventHandler } from "react";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ui/shadcn-io/ai/prompt-input";
import type { Translation } from "@/lib/types";

interface ChatInputProps {
  inputText: string;
  onInputChange: (value: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  status: "submitted" | "streaming" | "ready" | "error";
  t: Translation;
}

export function ChatInput({
  inputText,
  onInputChange,
  onSubmit,
  isLoading,
  status,
  t,
}: ChatInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="border-t bg-gradient-to-t from-background via-background to-background/80 backdrop-blur-sm p-4"
    >
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          whileFocus={{ scale: 1.01 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <PromptInput onSubmit={onSubmit} className="relative bg-secondary/30 border-2 border-border/50 hover:border-primary/30 focus-within:border-primary/50 rounded-2xl transition-all shadow-lg shadow-background/50">
            <PromptInputTextarea
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onInputChange(e.target.value)}
              value={inputText}
              placeholder={t.placeholder}
              disabled={isLoading}
              className="min-h-[60px] text-base"
            />
            <PromptInputToolbar className="p-2">
              <PromptInputTools />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PromptInputSubmit 
                  disabled={!inputText.trim() || isLoading} 
                  status={status}
                  className="rounded-xl h-10 w-10 bg-primary hover:bg-primary/90 transition-all"
                />
              </motion.div>
            </PromptInputToolbar>
          </PromptInput>
        </motion.div>
      </div>
    </motion.div>
  );
}
