"use client";

import Chat from "@/components/chat/chat";
import { Context } from "@/components/context/context";
import Header from "@/components/header";
import { useChat } from "ai/react";
import React, { useEffect, useRef, useState } from "react";

const Page: React.FC = () => {
  const [gotMessages, setGotMessages] = useState(false);
  const [context, setContext] = useState<string[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    onFinish: async () => {
      setGotMessages(true);
    },
  });

  const prevMessagesLengthRef = useRef(messages.length);

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
    setContext(null);
    setGotMessages(false);
  };

  useEffect(() => {
    const getContext = async () => {
      const response = await fetch("/api/context", {
        method: "POST",
        body: JSON.stringify({
          messages,
        }),
      });

      const { context } = await response.json();
      setContext(context.map((c: any) => c.id));
    };

    if (gotMessages && messages.length >= prevMessagesLengthRef.current) {
      getContext();
    }
  }, [gotMessages, messages]);

  return (
    <div className="flex h-screen w-full flex-col bg-gray-800">
      <Header className="my-2" />
      <div className="mx-auto flex h-full w-full max-w-screen-2xl flex-col justify-between">
        <div className="" />
        <div className="justify-betweenl relative flex w-full flex-col overflow-hidden">
          <Chat
            input={input}
            handleInputChange={handleInputChange}
            handleMessageSubmit={handleMessageSubmit}
            messages={messages}
          />
          <div className="mt-3 border-t-2">
            <Context className="" selected={context} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
