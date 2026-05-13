"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type Props = {
  onSend: (message: string) => void;
  loading: boolean;
};

export default function PromptInput({
  onSend,
  loading,
}: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim() || loading) return;

    onSend(input);

    setInput("");
  };

  return (
    <div className="border-t border-zinc-800 bg-zinc-950 p-4">
      <div className="mx-auto flex max-w-4xl items-center gap-3">
        <textarea
          rows={2}
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault();

              handleSubmit();
            }
          }}
          placeholder="Ask anything..."
          className="flex-1 resize-none rounded-xl border border-zinc-700 bg-zinc-900 p-4 outline-none focus:border-blue-500"
        />

        <button
          disabled={loading}
          onClick={handleSubmit}
          className="rounded-xl bg-blue-600 p-4 hover:bg-blue-700 disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}