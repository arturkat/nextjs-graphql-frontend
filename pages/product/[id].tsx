import React, { useState, useEffect } from "react";
// import Router from "next/router";
import {
  GetAllProductsQuery,
  GetProductByIdQuery,
  GetProductByIdQueryVariables,
  Product,
} from "@/graphql/types";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { apolloClient } from "../_app";
import { Button, Card, Stack } from "react-bootstrap";
import { addItemToCart, deleteItemFromCart } from "../../redux/cartSlice";
import { getAllProducts } from "../../graphql/getAllProducts.query";
import { getProductById } from "../../graphql/getProductById.query";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { ApolloQueryResult } from "@apollo/client";
import ProductList from "../../components/ProductList";
import Layout from "../../components/Layout";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { animations } from "../../lib/animations";
import MyTransition from "../../components/MyTransition";

const ProductDetails = ({ product }: { product: Product | null }) => {
  // console.log("product =", product);
  const router = useRouter();
  const dispatch = useAppDispatch();

  let productsInCart: Product[] = useAppSelector((state) => {
    let foundProducts: Product[] = [];
    if (product) {
      foundProducts = state.cart.productsInCart.filter(
        (prod) => prod.id === product.id
      );
    }
    return foundProducts;
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
    router.events.on("routeChangeError", () => setLoading(false));
    return () => {
      router.events.off("routeChangeStart", () => setLoading(true));
      router.events.off("routeChangeComplete", () => setLoading(false));
      router.events.off("routeChangeError", () => setLoading(false));
    };
  }, [router.events]);

  if (!product) {
    return (
      <Layout>
        <h1 className={"text-center"}>No Such Product</h1>
      </Layout>
    );
  }

  // If the page is not yet generated, this will be displayed initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <Layout>
        <h1 className={"text-center"}>Loading...</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <MyTransition mKey={String(product.id)}>
        <Card>
          <Card.Header>
            <h3>{product.name}</h3>
          </Card.Header>
          <Card.Body>
            <p>{product.description}</p>
            <p>{product.price}</p>
            {productsInCart.length === 0 ? (
              <Button onClick={() => dispatch(addItemToCart(product))}>
                Add to Cart
              </Button>
            ) : (
              <Stack direction="horizontal" gap={2}>
                <Button onClick={() => dispatch(addItemToCart(product))}>
                  <i className="fas fa-plus"></i>
                </Button>
                <div>{productsInCart[0]?.quantity}</div>
                <Button
                  onClick={() => dispatch(deleteItemFromCart(product))}
                  variant="danger"
                >
                  <i className="fas fa-minus"></i>
                </Button>
              </Stack>
            )}
          </Card.Body>
        </Card>

        <ProductList />
      </MyTransition>
    </Layout>
  );
};

export default ProductDetails;

export async function getStaticProps({ params }: { params: { id: string } }) {
  let result: ApolloQueryResult<GetProductByIdQuery> | null = null;

  try {
    result = await apolloClient.query<
      GetProductByIdQuery,
      GetProductByIdQueryVariables
    >({
      query: getProductById,
      variables: { id: Number(params.id) },
    });
  } catch (err) {
    console.error(err);
  }

  if (result) {
    return {
      props: {
        product: result.data.product,
      },
    };
  } else {
    return {
      props: {
        product: null,
      },
    };
  }
}

// export async function getStaticPaths() {
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await apolloClient.query<GetAllProductsQuery>({
    query: getAllProducts,
  });

  let paths = data.products.map((product) => ({
    params: { id: product.id.toString() },
  }));
  // paths = [{ params: { id: "1" } }, { params: { id: "2" } }];

  return {
    paths,
    fallback: true, // Enable statically generating additional pages
  };
};
