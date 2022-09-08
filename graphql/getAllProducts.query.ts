import gql from "graphql-tag";

export const getAllProducts = gql`
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
