export function bigArraySplitter(batch: any, size: number) {
  const chunks = [];

  while (batch.length) {
    chunks.push(
      batch.splice(0, size)
    );
  }

  return chunks;
}
