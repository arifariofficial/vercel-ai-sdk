import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeedings(input: string) {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: input.replace(/\n/g, ""),
    });

    const result = await response.json();

    return result.data[0].embeddings as number[];
  } catch (error) {
    console.log("Error calling OpenAI embedding API: ", error);
    throw new Error(`Error calling OpenAI embedding API: ${error}`);
  }
}
