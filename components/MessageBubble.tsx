"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeBlock from "./CodeBlock";

type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({
  role,
  content,
}: Props) {
  return (
    <div
      className={`flex w-full ${
        role === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-4xl whitespace-pre-wrap rounded-2xl px-5 py-4 ${
          role === "user"
            ? "bg-blue-600 text-white"
            : "bg-zinc-900 text-zinc-100"
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const {
                children,
                className,
              } = props;

              const match = /language-(\w+)/.exec(
                className || ""
              );

              const language =
                match?.[1] || "text";

              const value = String(
                children
              ).replace(/\n$/, "");

              if (match) {
                return (
                  <CodeBlock
                    language={language}
                    value={value}
                  />
                );
              }

              return (
                <code className="rounded bg-zinc-800 px-1 py-0.5">
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}