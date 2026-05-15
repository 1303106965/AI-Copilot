import { retrieveSchema } from "../retrieval/retrieveSchema";

const run = async () => {
  const result = await retrieveSchema("班级名称");

  console.log(result);
};

run();
