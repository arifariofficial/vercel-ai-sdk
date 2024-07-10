import { ScoredPineconeRecord } from "@pinecone-database/pinecone";
import { getEmbeddings } from "./embeddings";
import { getMatchesFromEmbeddings } from "./pinecone";

export type Metadata = {
  url: string;
  text: string;
  chunk: string;
};

// The funciton "getContext" is used to retrieve the context of give message
export const getContext = async (
  message: string,
  namespace: string,
  maxTokens = 3000,
  minTokens = 3000,
  minScore = 0.7,
  getOnlyText = true,
): Promise<string | ScoredPineconeRecord[]> => {
  // Get the embeddings of the input message
  const embeeding = await getEmbeddings(message);

  // Retreive the matches for the embeddings from the specified namespace
  const matches = await getMatchesFromEmbeddings(embeeding, 3, namespace);

  // Filter out the matches that have a score lower than the minimum score
  const qualifyingDocs = matches.filter((m) => m.score && m.score > minScore);

  if (!getOnlyText) {
    // Use a map to duplicate matches by URL
    return qualifyingDocs;
  }

  let docs = matches
    ? qualifyingDocs.map((match) => (match.metadata as Metadata).chunk)
    : [];
  // Join all the chunks of text together, truncate to the maximum number of tokens, and return the result
  return docs.join("\n").substring(0, maxTokens);
};
