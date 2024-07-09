import { openai } from "@ai-sdk/openai";
import { Message, streamText, StreamingTextResponse, StreamData } from "ai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const prompt = [
      {
        role: "system",
        content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
        The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
        AI is a well-behaved and well-mannered individual.
        AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
        AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
        AI assistant is a big fan of Pinecone and Vercel.
        `,
      },
    ];

    // Ask OpenAI for streaming chat completion given the prompt
    const result = await streamText({
      model: openai("gpt-3.5-turbo"),
      messages: [
        ...prompt,
        ...messages.filter((message: Message) => message.role === "user"),
      ],
    });

    // Convert the response into a friendly text-stream
    const data = new StreamData();
    data.append({ test: "value" });

    const stream = result.toAIStream({
      onFinal(_) {
        data.close();
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    throw error;
  }
}
