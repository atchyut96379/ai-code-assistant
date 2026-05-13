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

    localStorage.removeItem(
      STORAGE_KEY
    );
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
          credentials: "include",
          body: JSON.stringify({
            messages: updatedMessages,
          }),
        }
      );

      const data =
        await response.json();

      const assistantMessage: Message =
        {
          role: "assistant",
          content:
            data.content ||
            "No response",
        };

      setMessages([
        ...updatedMessages,
        assistantMessage,
      ]);
    } catch (error) {
      console.error(error);

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-zinc-950 text-white">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto w-full max-w-4xl space-y-6">
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