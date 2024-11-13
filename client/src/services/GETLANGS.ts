import { gql } from "@apollo/client";
const GETLANGS = gql`
  query langs {
    langs {
      id
      name
    }
  }
`;

export default GETLANGS;