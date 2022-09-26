import gql from "graphql-tag";

export const CREATE_CHECKOUT_SESSION = gql`
  mutation CreateCheckoutSession($items: [CreateSessionInput!]!) {
    createCheckoutSession(items: $items) {
      url
    }
  }
`;
