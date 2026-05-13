"use client";

import { useState } from "react";

import { Menu } from "lucide-react";

import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";

export default function HomePage() {
  const [resetTrigger, setResetTrigger] =
    useState(0);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const handleNewChat = () => {
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <main className="flex h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Mobile Menu Button */}
      <button
        onClick={() =>
          setMobileOpen(true)
        }
        className="
          fixed left-4 top-4 z-30
          rounded-lg bg-zinc-900 p-2
          shadow-lg lg:hidden
        "
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <Sidebar
        onNewChat={handleNewChat}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden pt-16 lg:pt-0">
        <ChatWindow
          resetTrigger={resetTrigger}
        />
      </div>
    </main>
  );
}