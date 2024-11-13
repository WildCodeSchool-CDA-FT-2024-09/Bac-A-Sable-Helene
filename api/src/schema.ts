import { buildSchema } from "type-graphql";
import RepoResolver from "./repos/repo.resolvers";
import LangResolver from "./langs/lang.resolvers";
import StatusResolver from "./status/status.resolvers";

const getSchema = async () => {
  return await buildSchema({
      resolvers: [RepoResolver, LangResolver, StatusResolver],
    });
  }

  export default getSchema;