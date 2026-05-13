"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  language: string;
  value: string;
};

export default function CodeBlock({
  language,
  value,
}: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(value);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative my-4 overflow-hidden rounded-xl border border-zinc-700">
      <div className="flex items-center justify-between bg-zinc-800 px-4 py-2 text-sm text-zinc-300">
        <span>{language}</span>

        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 hover:text-white"
        >
          {copied ? (
            <Check size={16} />
          ) : (
            <Copy size={16} />
          )}

          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "#18181b",
          fontSize: "14px",
        }}
        wrapLongLines={true}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}