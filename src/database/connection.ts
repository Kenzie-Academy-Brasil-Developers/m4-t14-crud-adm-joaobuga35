import { client } from "./config";

export const connectDataBase = async (): Promise<void> => {
  await client.connect();
  console.log("Database connected");
};
