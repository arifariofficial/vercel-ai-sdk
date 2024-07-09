"use client";

import Chat from "@/components/chat/chat";
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
    <Chat
      input={input}
      handleInputChange={handleInputChange}
      handleMessageSubmit={handleMessageSubmit}
      messages={messages}
    />
  );
};

export default Page;
