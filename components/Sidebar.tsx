"use client";

type Props = {
  onNewChat: () => void;
};

export default function Sidebar({
  onNewChat,
}: Props) {
  return (
    <div className="flex w-72 flex-col border-r border-zinc-800 bg-zinc-950 p-4">
      <h1 className="mb-6 text-xl font-bold text-white">
        AI Code Assistant
      </h1>

      <button
        onClick={onNewChat}
        className="rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700"
      >
        + New Chat
      </button>
    </div>
  );
}