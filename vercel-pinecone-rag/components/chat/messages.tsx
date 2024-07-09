import { Message } from "ai";
import { useRef } from "react";

const Messages = ({ messages }: { messages: Message[] }) => {
  const messagesEnfRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="h-svh-[300px] flex flex-grow flex-col justify-end overflow-y-scroll rounded-lg border-2 border-gray-600 bg-gray-700 p-6">
      {messages?.map((msg, index) => (
        <div
          key={index}
          className={`${msg.role === "assistant" ? "text-green-300" : "text-blue-300"} slide-in-bottom message-glow my-2 flex rounded border border-gray-600 bg-gray-800 p-3 shadow-md transition-shadow duration-200 hover:shadow-lg`}
        >
          <div className="flex items-center rounded-tl-lg border-r border-gray-600 bg-gray-800">
            {msg.role === "assistant" ? "🤖" : "🧑‍💻"}
          </div>
          <div className="ml-2 flex items-center text-gray-200">
            {msg.content}
          </div>
        </div>
      ))}
      <div ref={messagesEnfRef} />
    </div>
  );
};
export default Messages;
