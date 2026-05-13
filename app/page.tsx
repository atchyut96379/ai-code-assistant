"use client";

import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";

export default function HomePage() {
  const [resetTrigger, setResetTrigger] =
    useState(0);

  const handleNewChat = () => {
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <main className="flex h-screen overflow-hidden">
      <Sidebar
        onNewChat={handleNewChat}
      />

      <div className="flex-1">
        <ChatWindow
          resetTrigger={resetTrigger}
        />
      </div>
    </main>
  );
}