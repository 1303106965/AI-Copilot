import { EmbeddingProvider } from "../providers/embedding.provider";

const run = async () => {
  const provider = new EmbeddingProvider();

  const vector = await provider.embedding("班级名称");

  console.log("向量维度:", vector.length);

  console.log(vector.slice(0, 10));
};

run();
