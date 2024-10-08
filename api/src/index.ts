import { ApolloServer } from "@apollo/server"; // preserve-line
import { startStandaloneServer } from "@apollo/server/standalone";

import { buildSchema } from "type-graphql";
import { dataSource } from "./db/client";
import "reflect-metadata";

import RepoResolver from "./repos/repo.resolvers";
import LangResolver from "./langs/lang.resolvers";
import StatusResolver from "./status/status.resolvers";

(async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [RepoResolver, LangResolver, StatusResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();