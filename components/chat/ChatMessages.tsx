"use client";

import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/shadcn-io/ai/message";
import { Response } from "@/components/ui/shadcn-io/ai/response";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ui/shadcn-io/ai/source";
import { Loader } from "@/components/ui/shadcn-io/ai/loader";
import type { ChatMessage, Translation } from "@/lib/types";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
  t: Translation;
}

export function ChatMessages({ messages, isLoading, t }: ChatMessagesProps) {
  return (
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
  );
}
