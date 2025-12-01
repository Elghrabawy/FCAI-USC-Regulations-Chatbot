"use client";

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
    <div className="border-t p-4 max-w-4xl mx-auto w-full">
      <PromptInput onSubmit={onSubmit}>
        <PromptInputTextarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onInputChange(e.target.value)}
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
  );
}
