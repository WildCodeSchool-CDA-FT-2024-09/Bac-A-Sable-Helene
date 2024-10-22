import { ApolloServer } from "@apollo/server"; // preserve-line
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";

import { buildSchema } from "type-graphql";
import { dataSource } from "./db/client";
import "reflect-metadata";

import RepoResolver from "./repos/repo.resolvers";
import LangResolver from "./langs/lang.resolvers";
import StatusResolver from "./status/status.resolvers";

dotenv.config();

(async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [RepoResolver, LangResolver, StatusResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(parseInt(process.env.PORT || '4000', 10))},
  });

  console.log(`🚀  Server ready at: ${url}`);
})();