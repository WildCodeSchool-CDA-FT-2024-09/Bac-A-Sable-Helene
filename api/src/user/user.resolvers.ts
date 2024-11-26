import { Arg, Ctx, Query, Resolver } from "type-graphql";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const { AUTH_SECRET_KEY } = process.env;
if (!AUTH_SECRET_KEY) {
  throw new Error('AUTH_SECRET_KEY is not defined in the environment variables');
}

const me = {
  email: "test@test.com",
  password: "argon2hash",
};
console.log(me);

@Resolver()
export default class UserResolver {
  // Methode GET pour tous les repos
  @Query(() => Boolean)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx()
    context: { res: { setHeader: (name: string, value: string) => void } }
  ) {
    console.info(email, password);
    
    // 1ère étape, à partir de l'email, vérifier si j'ai un user... user.find..
    if (me.email === email) {
      // 2ème étape, vérifier le hash du password
      try {
        // Générer le token JWT
        const token = jwt.sign(
          { email: me.email, name: "helene", role: "admin" },
          AUTH_SECRET_KEY as string
        );
        context.res.setHeader(
          "Set-Cookie",
          `cdatokenexample=${token};httpOnly;SameSite=Strict;expires=${new Date(
            new Date().getTime() + 1000 * 60 * 60 * 48
          ).toUTCString()}`
        );
        return true;// Connexion réussie
      } catch (error) {
        console.error("Error during token generation:", error);
        return false;
      }
    }
  
    // Si l'email ou le mot de passe est incorrect
    return false;
  }
}