"use client";

import { X } from "lucide-react";

type Props = {
  onNewChat: () => void;
  mobileOpen: boolean;
  setMobileOpen: (
    value: boolean
  ) => void;
};

export default function Sidebar({
  onNewChat,
  mobileOpen,
  setMobileOpen,
}: Props) {
  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 z-50 h-screen w-72
          transform border-r border-zinc-800
          bg-zinc-950 p-4 transition-transform duration-300
          lg:static lg:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Mobile Close Button */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">
            AI Code Assistant
          </h1>

          <button
            onClick={() =>
              setMobileOpen(false)
            }
            className="lg:hidden"
          >
            <X size={24} />
          </button>
        </div>

        {/* New Chat */}
        <button
          onClick={() => {
            onNewChat();
            setMobileOpen(false);
          }}
          className="w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          + New Chat
        </button>
      </div>
    </>
  );
}