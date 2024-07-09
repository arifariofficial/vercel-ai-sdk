import { Message } from "ai";
import React, { ChangeEvent, FormEvent } from "react";
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
    <div id="chat" className="mx-auto flex h-full w-full max-w-5xl flex-col">
      <Messages messages={messages} />
      <form
        onSubmit={handleMessageSubmit}
        className="relative mb-5 mt-5 rounded-lg bg-gray-700 px-1"
      >
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Write message"
          className="input-glow focus:shadow-outline focus:shadow-outline pr-100 w-full appearance-none rounded border bg-gray-600 px-3 py-2 pl-3 leading-tight text-gray-200 transition-shadow duration-200"
        />
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
          Press ⮐ to send
        </span>
      </form>
    </div>
  );
};
export default Chat;
