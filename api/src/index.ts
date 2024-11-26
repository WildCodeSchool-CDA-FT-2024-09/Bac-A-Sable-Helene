import { ApolloServer } from "@apollo/server"; // preserve-line
import { startStandaloneServer } from "@apollo/server/standalone";
// Permet de décoder le cookie
import setCookie from "set-cookie-parser";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
const { AUTH_SECRET_KEY, PORT } = process.env;

import { buildSchema } from "type-graphql";
import { dataSource } from "./db/client";
import "reflect-metadata";

import RepoResolver from "./repos/repo.resolvers";
import LangResolver from "./langs/lang.resolvers";
import StatusResolver from "./status/status.resolvers";
import UserResolver from "./user/user.resolvers";

(async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [RepoResolver, LangResolver, StatusResolver, UserResolver],
    //La propiété "authChecker" appelle une fonction qui récupère le contexte. Cette propriété vient du schema : nom strict
    //Ici on détermine les règles d'autehntification
    authChecker: ({ context }, roles): boolean => {
      console.log(context.cookie);

    // Vérification de l'authentification de l'utilisateur
      if (!context.cookie) {
        throw new Error('Access denied! You need to be authenticated to perform this action!');
      }

      // Si utilisateur admin et Authorized("admin")
      if (roles.length > 0)
        // je boucle pour vérifier ds ts les cookies et récupérer le role
        return roles.some((role) => context.cookie.role === role);
      // Si utilisateur connect et Authorized()
      if (context.cookie) return true;
      // Default
      return false;  // Si aucun rôle n'est requis, retourne vrai
    }

  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
    context: async ({ req, res }) => {
      // console.info("Request cookies:", req.headers.cookie);
      
      // Processus de vérification du cookie: 1 seule fois à la racine (paramétrage) - le cookie est ds les headers ds req
      if (!req.headers.cookie) return { res };
      
      // Ici on décode le cookie avec 'option map: true pour rnedre 2 format de données différents (tableau ou ici on veut un objet pour le retrouver plus facilement)
      const { cdatokenexample } = setCookie.parse(
        req.headers.cookie as string,
        { map: true }
      );
      // console.info("cdatokenexample:", cdatokenexample?.value); // Log du cookie "cdatokenexample"

      if (!cdatokenexample) return { res };
  
      try {
        const payload = jwt.verify(
          cdatokenexample.value,  // l'objet à 2 valeurs value et name
          AUTH_SECRET_KEY as string
        );
        console.info("Payload:", payload); // Log du payload JWT
        return { res, cookie: payload };
      } catch (err) {
        console.error("Invalid JWT", err); // Log si le JWT est invalide
        return { res };
      }
    }
  });
  
  console.info("Docker compose is watching");
  console.log(`🚀  Server ready at: ${url}`);
})();