import gql from "graphql-tag";

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      id
      name
      price
      quantity
      description
      image
      brand
      createdAt
      updatedAt
    }
  }
`;
