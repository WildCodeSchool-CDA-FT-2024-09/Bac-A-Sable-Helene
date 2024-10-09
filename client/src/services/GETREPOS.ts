import { gql } from "@apollo/client";

const GETREPOS = gql`
 query GetAllRepos($filter: String) {
    getAllRepos(filter: $filter) {
      id
      name
      url
      languages {
        id
        name
      }
      isFavorite
      status {
        id
        label
      }
    }
  }


  # query Fullrepos {
  #   fullrepos {
  #     id
  #     name
  #     url
  #     isFavorite
  #     status {
  #       id
  #       label
  #     }
  #     languages {
  #       id
  #       name
  #     }

  #   }

`;

export default GETREPOS;