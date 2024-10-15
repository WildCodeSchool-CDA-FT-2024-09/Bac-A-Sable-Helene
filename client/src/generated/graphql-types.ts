import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Lang = {
  __typename?: 'Lang';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  repos: Array<Repo>;
};

export type LightRepo = {
  __typename?: 'LightRepo';
  id: Scalars['ID']['output'];
  isFavorite: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewRepo: Repo;
  createNewStatus: Status;
  updateFavoriteStatus: Repo;
};


export type MutationCreateNewRepoArgs = {
  data: RepoInput;
};


export type MutationCreateNewStatusArgs = {
  data: StatusInput;
};


export type MutationUpdateFavoriteStatusArgs = {
  id: Scalars['String']['input'];
  isFavorite: Scalars['Boolean']['input'];
};

export type Query = {
  __typename?: 'Query';
  fullrepos: Array<Repo>;
  getAllRepos: Array<Repo>;
  lang?: Maybe<Lang>;
  langs: Array<Lang>;
  lightrepos: Array<LightRepo>;
  status: Array<Status>;
};


export type QueryGetAllReposArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLangArgs = {
  id: Scalars['Float']['input'];
};

export type Repo = {
  __typename?: 'Repo';
  id: Scalars['ID']['output'];
  isFavorite: Scalars['Boolean']['output'];
  languages: Array<Lang>;
  name: Scalars['String']['output'];
  status: Status;
  url: Scalars['String']['output'];
};

export type RepoInput = {
  id: Scalars['String']['input'];
  isFavorite: Scalars['Boolean']['input'];
  languages: Array<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  status: Array<Scalars['ID']['input']>;
  url: Scalars['String']['input'];
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
  repos: Array<Repo>;
};

export type StatusInput = {
  label: Scalars['String']['input'];
};

export type UpdateFavoriteStatusMutationVariables = Exact<{
  id: Scalars['String']['input'];
  isFavorite: Scalars['Boolean']['input'];
}>;


export type UpdateFavoriteStatusMutation = { __typename?: 'Mutation', updateFavoriteStatus: { __typename?: 'Repo', id: string, isFavorite: boolean } };

export type FullreposQueryVariables = Exact<{ [key: string]: never; }>;


export type FullreposQuery = { __typename?: 'Query', fullrepos: Array<{ __typename?: 'Repo', id: string, name: string, url: string, isFavorite: boolean }> };

export type LangsQueryVariables = Exact<{ [key: string]: never; }>;


export type LangsQuery = { __typename?: 'Query', langs: Array<{ __typename?: 'Lang', id: number, name: string }> };


export const UpdateFavoriteStatusDocument = gql`
    mutation UpdateFavoriteStatus($id: String!, $isFavorite: Boolean!) {
  updateFavoriteStatus(id: $id, isFavorite: $isFavorite) {
    id
    isFavorite
  }
}
    `;
export type UpdateFavoriteStatusMutationFn = Apollo.MutationFunction<UpdateFavoriteStatusMutation, UpdateFavoriteStatusMutationVariables>;

/**
 * __useUpdateFavoriteStatusMutation__
 *
 * To run a mutation, you first call `useUpdateFavoriteStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFavoriteStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFavoriteStatusMutation, { data, loading, error }] = useUpdateFavoriteStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      isFavorite: // value for 'isFavorite'
 *   },
 * });
 */
export function useUpdateFavoriteStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFavoriteStatusMutation, UpdateFavoriteStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFavoriteStatusMutation, UpdateFavoriteStatusMutationVariables>(UpdateFavoriteStatusDocument, options);
      }
export type UpdateFavoriteStatusMutationHookResult = ReturnType<typeof useUpdateFavoriteStatusMutation>;
export type UpdateFavoriteStatusMutationResult = Apollo.MutationResult<UpdateFavoriteStatusMutation>;
export type UpdateFavoriteStatusMutationOptions = Apollo.BaseMutationOptions<UpdateFavoriteStatusMutation, UpdateFavoriteStatusMutationVariables>;
export const FullreposDocument = gql`
    query Fullrepos {
  fullrepos {
    id
    name
    url
    isFavorite
  }
}
    `;

/**
 * __useFullreposQuery__
 *
 * To run a query within a React component, call `useFullreposQuery` and pass it any options that fit your needs.
 * When your component renders, `useFullreposQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFullreposQuery({
 *   variables: {
 *   },
 * });
 */
export function useFullreposQuery(baseOptions?: Apollo.QueryHookOptions<FullreposQuery, FullreposQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FullreposQuery, FullreposQueryVariables>(FullreposDocument, options);
      }
export function useFullreposLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FullreposQuery, FullreposQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FullreposQuery, FullreposQueryVariables>(FullreposDocument, options);
        }
export function useFullreposSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FullreposQuery, FullreposQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FullreposQuery, FullreposQueryVariables>(FullreposDocument, options);
        }
export type FullreposQueryHookResult = ReturnType<typeof useFullreposQuery>;
export type FullreposLazyQueryHookResult = ReturnType<typeof useFullreposLazyQuery>;
export type FullreposSuspenseQueryHookResult = ReturnType<typeof useFullreposSuspenseQuery>;
export type FullreposQueryResult = Apollo.QueryResult<FullreposQuery, FullreposQueryVariables>;
export const LangsDocument = gql`
    query langs {
  langs {
    id
    name
  }
}
    `;

/**
 * __useLangsQuery__
 *
 * To run a query within a React component, call `useLangsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLangsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLangsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLangsQuery(baseOptions?: Apollo.QueryHookOptions<LangsQuery, LangsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LangsQuery, LangsQueryVariables>(LangsDocument, options);
      }
export function useLangsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LangsQuery, LangsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LangsQuery, LangsQueryVariables>(LangsDocument, options);
        }
export function useLangsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LangsQuery, LangsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LangsQuery, LangsQueryVariables>(LangsDocument, options);
        }
export type LangsQueryHookResult = ReturnType<typeof useLangsQuery>;
export type LangsLazyQueryHookResult = ReturnType<typeof useLangsLazyQuery>;
export type LangsSuspenseQueryHookResult = ReturnType<typeof useLangsSuspenseQuery>;
export type LangsQueryResult = Apollo.QueryResult<LangsQuery, LangsQueryVariables>;