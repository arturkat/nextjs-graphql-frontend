import React, { useEffect, useState } from "react";
import { ApolloQueryResult } from "@apollo/client";
import {
  GetProductByIdQuery,
  GetProductByIdQueryVariables,
  Product,
} from "@/graphql/types";
import apolloClient from "@/http/apollo";
import { GET_PRODUCT_BY_ID } from "@/graphql/getProductById.query";
import { Button, Card, Stack } from "react-bootstrap";
import { addItemToCart, deleteItemFromCart } from "@/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import Link from "next/link";

async function getProduct(id: number) {
  let result: ApolloQueryResult<GetProductByIdQuery> | null = null;

  try {
    result = await apolloClient.query<
      GetProductByIdQuery,
      GetProductByIdQueryVariables
    >({
      query: GET_PRODUCT_BY_ID,
      variables: { id: Number(id) },
    });
  } catch (err) {
    console.error(err);
  }

  if (result) {
    return result.data.product;
  } else {
    return null;
  }
}

const ProductCard = ({
  id = 1,
  productInput = null,
}: {
  id?: number;
  productInput?: Product | null;
}) => {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(productInput || null);

  let productsInCart: Product[] = useAppSelector((state) => {
    let foundProducts: Product[] = [];
    if (product) {
      foundProducts = state.cart.productsInCart.filter(
        (prod) => prod.id === product.id
      );
    }
    return foundProducts;
  });

  useEffect(() => {
    async function loadProduct() {
      const _product = await getProduct(id);
      setProduct(_product);
    }
    if (!productInput) {
      loadProduct();
    }
  }, []);

  if (!product) {
    return <h1 className={"text-center"}>Loading...</h1>;
  }

  return (
    <>
      <Card>
        <Card.Header>
          <Link href={`/product/${product.id}`}>
            <a>
              <h3>{product.name}</h3>
            </a>
          </Link>
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
    </>
  );
};

export default ProductCard;
