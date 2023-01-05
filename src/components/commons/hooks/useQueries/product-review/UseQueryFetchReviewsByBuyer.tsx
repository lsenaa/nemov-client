import { gql, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchReviewsByBuyerArgs,
} from "../../../../../commons/types/generated/types";

export const FETCH_REVIEWS_BY_BUYER = gql`
  query fetchReviewsByBuyer($page: Int!) {
    fetchReviewsByBuyer(page: $page) {
      id
    }
  }
`;

export const UseQueryFetchReviewsByBuyer = (variables: IQueryFetchReviewsByBuyerArgs) => {
  const query = useQuery<Pick<IQuery, "fetchReviewsByBuyer">, IQueryFetchReviewsByBuyerArgs>(
    FETCH_REVIEWS_BY_BUYER,
    { variables }
  );

  return query;
};