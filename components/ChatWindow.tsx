"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import MessageBubble from "./MessageBubble";
import PromptInput from "./PromptInput";

import { Message } from "@/types/chat";

type Props = {
  resetTrigger: number;
};

const STORAGE_KEY =
  "ai-code-assistant-messages";

export default function ChatWindow({
  resetTrigger,
}: Props) {
  const [messages, setMessages] =
    useState<Message[]>([]);

  const [loading, setLoading] =
    useState(false);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  // Load saved messages
  useEffect(() => {
    const savedMessages =
      localStorage.getItem(STORAGE_KEY);

    if (savedMessages) {
      setMessages(
        JSON.parse(savedMessages)
      );
    }
  }, []);

  // Save messages
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(messages)
    );

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Reset chat
useEffect(() => {
  if (resetTrigger === 0) return;

  setMessages([]);

  localStorage.removeItem(STORAGE_KEY);
}, [resetTrigger]);

  const sendMessage = async (
    prompt: string
  ) => {
    const userMessage: Message = {
      role: "user",
      content: prompt,
    };

    const updatedMessages: Message[] = [
      ...messages,
      userMessage,
    ];

    setMessages(updatedMessages);

    setLoading(true);

    try {
      const response = await fetch(
        "/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            messages: updatedMessages,
          }),
        }
      );

if (!response.body) return;

const reader =
  response.body.getReader();

let assistantText = "";

while (true) {
  const { done, value } =
    await reader.read();

  if (done) break;

  const chunk =
    new TextDecoder().decode(value);

  assistantText += chunk;

  setMessages([
    ...updatedMessages,
    {
      role: "assistant",
      content: assistantText,
    },
  ]);
}
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-zinc-950 text-white">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {messages.length === 0 && (
            <div className="mt-20 text-center text-zinc-500">
              Start a conversation...
            </div>
          )}

          {messages.map(
            (message, index) => (
              <MessageBubble
                key={index}
                role={message.role}
                content={message.content}
              />
            )
          )}

          {loading && (
            <div className="text-zinc-400">
              AI is thinking...
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      <PromptInput
        onSend={sendMessage}
        loading={loading}
      />
    </div>
  );
}