import { gql } from '@apollo/client';

export const UPDATE_FAVORITE_STATUS = gql`
  mutation UpdateFavoriteStatus($id: String!, $isFavorite: Boolean!) {
    updateFavoriteStatus(id: $id, isFavorite: $isFavorite) {
      id
      isFavorite
    }
  }
`;