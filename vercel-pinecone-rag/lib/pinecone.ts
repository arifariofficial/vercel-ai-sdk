import { Pinecone, ScoredPineconeRecord } from "@pinecone-database/pinecone";

export type Metadata = {
  url: string;
  text: string;
  chunk: string;
  hash: string;
};

//"getMatchesFromEmbeddings" is used to retrieve matches for given embeddings
const getMatchesFromEmbeddings = async (
  embeddings: number[],
  topK: number,
  namespace: string,
): Promise<ScoredPineconeRecord<Metadata>[]> => {
  // Obtain a client for Pinecone
  const pinecone = new Pinecone();

  const indexName: string = process.env.PINECONE_INDEX || "";
  if (indexName === "") {
    throw new Error("PINECONE_INDEX environment variable not set");
  }

  // Retrieve the list of indexes to check if expected index exists
};
