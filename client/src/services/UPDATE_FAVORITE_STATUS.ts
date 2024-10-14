import { gql } from '@apollo/client';

const UPDATE_FAVORITE_STATUS = gql`
  mutation UpdateFavoriteStatus($id: String!, $isFavorite: Boolean!) {
    updateFavoriteStatus(id: $id, isFavorite: $isFavorite) {
      id
      isFavorite
    }
  }
`;

export default UPDATE_FAVORITE_STATUS;
