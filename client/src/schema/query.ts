import { gql } from "@apollo/client";

export const GET_REPOS = gql`
  query Fullrepos {
    fullrepos {
      id
      name
      url
      isFavorite
    }
  }
`;

export const GET_LANGS = gql`
  query langs {
    langs {
      id
      name
    }
  }
`;