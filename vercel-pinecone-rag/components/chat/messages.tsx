import { Message } from "ai";
import { useRef } from "react";

const Messages = ({ messages }: { messages: Message[] }) => {
  const messagesEnfRef = useRef<HTMLDivElement | null>(null);
  return (
    <div>
      {messages?.map((msg, index) => (
        <div
          key={index}
          className={`${msg.role === "assistant" ? "text-green-300" : "text-blue-300"}`}
        >
          <div>{msg.role === "assistant" ? "🤖" : "🧑‍💻"}</div>
          <div>{msg.content}</div>
        </div>
      ))}
      <div ref={messagesEnfRef} />
    </div>
  );
};
export default Messages;
