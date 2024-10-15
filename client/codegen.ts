import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000",  //url du cak pour analyser
  documents: ["src/schema/*.ts"], //source des requêtes ds le dossier schema ayant 2 fichiers query.ts et mutations.ts
  generates: {
    "./src/generated/graphql-types.ts": { //Indique où mettre le résultat à mémoriser - Je dois créer ce dossier generated dans src
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,  // j'indique de générer les hooks
      },
    },
  },
  overwrite: true,  // si je relance la commande j'indiquer que j'écrase le fichier
};

export default config;