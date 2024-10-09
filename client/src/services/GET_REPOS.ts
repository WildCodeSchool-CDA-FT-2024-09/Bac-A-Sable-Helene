import { gql } from "@apollo/client";
const GET_REPOS = gql`
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
      languages {
        id
        name
      }

    }
  }
`;

export default GET_REPOS;