import { Index, PineconeRecord } from "@pinecone-database/pinecone";

const sliceIntoChunkds = <T>(arr: T[], chunkSize: number) => {
  return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, i) =>
    arr.slice(i * chunkSize, i + 1 * chunkSize),
  );
};

export const chunkedUpsert = async (
  index: Index,
  vectors: Array<PineconeRecord>,
  namespace: string,
  chunkSize = 10,
) => {
  // Split the vectors into chunk
  const chunks = sliceIntoChunkds<PineconeRecord>(vectors, chunkSize);

  try {
    await Promise.allSettled(
      chunks.map(async (chunk) => {
        try {
          await index.namespace(namespace).upsert(vectors);
        } catch (error) {}
      }),
    );
  } catch (error) {
    throw new Error(`Error upserting vectors into index: ${error}`);
  }
};
