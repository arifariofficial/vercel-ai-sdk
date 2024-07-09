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
    <div id="chat" className="p-4">
      <Messages messages={messages} />
      <div>
        <form onSubmit={handleMessageSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Write message"
            className="text-black"
          />
          <span>Press Enter to send</span>
        </form>
      </div>
    </div>
  );
};
export default Chat;
