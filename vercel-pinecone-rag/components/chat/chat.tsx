import { Message } from "ai";
import { ChangeEvent, FormEvent } from "react";

interface Chat {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMessageSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  messages: Message[];
}

const Chat = () => {
  return <div>Chat</div>;
};
export default Chat;
