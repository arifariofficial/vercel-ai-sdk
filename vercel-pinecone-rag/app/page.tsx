"use client";

import Chat from "@/components/chat/chat";
import Header from "@/components/header";
import { useChat } from "ai/react";
import React, { useState } from "react";

const Page: React.FC = () => {
  const [context, setContext] = useState<string[] | null>(null);
  const { input, handleInputChange, handleSubmit, messages } = useChat();

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gray-800">
      <Header className="my-2" />
      <div className="mx-auto flex h-full w-full max-w-screen-2xl flex-col justify-between">
        <div className="" />
        <div className="relative flex w-full overflow-hidden">
          <Chat
            input={input}
            handleInputChange={handleInputChange}
            handleMessageSubmit={handleMessageSubmit}
            messages={messages}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
