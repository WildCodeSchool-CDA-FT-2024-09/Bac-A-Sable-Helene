// import "reflect-metadata";
// import express from 'express';
// import router from './router';
// import dotenv from 'dotenv';
// import { dataSource } from "./db/client";
// import cors from "cors";

// dotenv.config();

// const app = express();

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL as string,
//   })
// );
// app.use(express.json());  // MDW pour lire les fichiers json

// app.use('/api', router);

// const PORT = process.env.PORT ;

// app.listen(PORT, async () => {
//   await dataSource.initialize();
//   console.log(`Server is listenning on http://localhost:${PORT}/api`);
// })

import { ApolloServer } from "@apollo/server"; // preserve-line
import { startStandaloneServer } from "@apollo/server/standalone";

import repos from "../data/repos.json";

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Repo {
    id: String
    name: String
    url: String
    isFavorite: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    repos: [Repo]
  }
`;

const resolvers = {
  Query: {
    repos: () => repos,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();