// Chat.tsx

import React, { FormEvent, ChangeEvent } from "react";
import { Message } from "ai/react";
import Messages from "./messages";

interface Chat {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMessageSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  messages: Message[];
}

const Chat: React.FC<Chat> = ({
  input,
  handleInputChange,
  handleMessageSubmit,
  messages,
}) => {
  return (
    <div id="chat" className="mx-5 mr-4 flex w-full flex-col lg:mx-0 lg:w-3/5">
      <Messages messages={messages} />
      <>
        <form
          onSubmit={handleMessageSubmit}
          className="relative mb-5 mt-5 rounded-lg bg-gray-700"
        >
          <input
            title="text"
            type="text"
            className="input-glow focus:shadow-outline w-full appearance-none rounded border border-gray-600 bg-gray-600 px-3 py-2 pl-3 pr-10 leading-tight text-gray-200 transition-shadow duration-200 focus:outline-none"
            value={input}
            onChange={handleInputChange}
          />

          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
            Press ⮐ to send
          </span>
        </form>
      </>
    </div>
  );
};

export default Chat;
