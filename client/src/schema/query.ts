import { gql } from "@apollo/client";

export const GET_REPOS = gql`
  query Fullrepos {
    fullrepos {
      id
      name
      url
      isFavorite
      status {
        id
        label
      }
      languages {  # Ajout de la sélection des sous-champs de languages
        id
        name
      }
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

export const LOGIN = gql`
  query Login($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;