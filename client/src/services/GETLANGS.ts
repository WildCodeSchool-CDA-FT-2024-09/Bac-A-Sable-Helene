import { gql } from "@apollo/client";
const GET_LANGS = gql`
  query langs {
    langs {
      id
      name
    }
  }
`;

export default GET_LANGS;