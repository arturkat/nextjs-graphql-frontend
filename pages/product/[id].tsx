import React, { useState, useEffect } from "react";
// import Router from "next/router";
import {
  GetAllProductsQuery,
  GetProductByIdQuery,
  GetProductByIdQueryVariables,
  Product,
} from "@/graphql/types";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { Button, Card, Stack } from "react-bootstrap";
import { addItemToCart, deleteItemFromCart } from "@/redux/cartSlice";
import { getAllProducts } from "@/graphql/getAllProducts.query";
import { getProductById } from "@/graphql/getProductById.query";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { ApolloQueryResult, useApolloClient } from "@apollo/client";
import ProductList from "@/components/ProductList";
import MyLayout from "@/components/MyLayout";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { animations } from "@/lib/animations";
import MyTransition from "@/components/MyTransition";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import {
  NextApiRequest,
  GetStaticPropsContext,
  GetStaticPathsContext,
} from "next";
import apolloClient from "@/http/apollo";

const ProductDetails = ({ product }: { product: Product | null }) => {
  // console.log("product =", product);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [productState, setProductState] = useState(product);

  let productsInCart: Product[] = useAppSelector((state) => {
    let foundProducts: Product[] = [];
    if (product) {
      foundProducts = state.cart.productsInCart.filter(
        (prod) => prod.id === product.id
      );
    }
    return foundProducts;
  });

  if (!product) {
    return (
      <MyLayout>
        <h1 className={"text-center"}>No Such Product</h1>
      </MyLayout>
    );
  }

  // If the page is not yet generated, this will be displayed initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <MyLayout>
        <h1 className={"text-center"}>Loading...</h1>
      </MyLayout>
    );
  }

  return (
    <MyLayout>
      <MyTransition mKey={String(product.id)}>
        <Link href={"/product/1"}>Product 1</Link>
        <Link href={"/product/2"}>Product 2</Link>
        <Link href={"/product/3"}>Product 3</Link>

        <ProductCard productInput={productState} />
        {/*<ProductList />*/}
        {/*<hr />*/}
        {/*<ProductCard />*/}
      </MyTransition>
    </MyLayout>
  );
};

export default ProductDetails;

// {
//   req,
//   params,
// }: {
//   req: NextApiRequest;
//   params: { id: string };

export async function getStaticProps(context: GetStaticPropsContext) {
  console.log("getStaticProps");
  let result: ApolloQueryResult<GetProductByIdQuery> | null = null;

  console.log("context");
  console.log(context);

  try {
    result = await apolloClient.query<
      GetProductByIdQuery,
      GetProductByIdQueryVariables
    >({
      query: getProductById,
      variables: { id: Number(context?.params?.id) },
    });
  } catch (err) {
    console.error(err);
  }

  if (result && result.data) {
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
export const getStaticPaths: GetStaticPaths = async (
  context: GetStaticPathsContext
) => {
  console.log("GetStaticPaths");
  console.log(context);
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

// const [loading, setLoading] = useState(false);
// useEffect(() => {
//   router.events.on("routeChangeStart", () => setLoading(true));
//   router.events.on("routeChangeComplete", () => setLoading(false));
//   router.events.on("routeChangeError", () => setLoading(false));
//   return () => {
//     router.events.off("routeChangeStart", () => setLoading(true));
//     router.events.off("routeChangeComplete", () => setLoading(false));
//     router.events.off("routeChangeError", () => setLoading(false));
//   };
// }, [router.events]);
