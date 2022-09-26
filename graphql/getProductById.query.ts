import gql from "graphql-tag";

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: Int!) {
    product(id: $id) {
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
