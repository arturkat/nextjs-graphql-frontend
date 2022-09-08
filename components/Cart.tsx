import Image from "next/image";
import React, { useState } from "react";
import { Container, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { openCart } from "../redux/cartSlice";
import { openModal } from "../redux/paymentModalSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook";
import MyContainer from "./MyContainer";

export default function Cart() {
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(openCart(false));

  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);
  const productsInCart = useAppSelector((state) => state.cart.productsInCart);
  const total = useAppSelector((state) => state.cart.total);

  return (
    <>
      <Offcanvas show={isCartOpen} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={2}>
            {productsInCart.length > 0 ? (
              productsInCart.map((product) => (
                <Stack key={product.id} direction="horizontal">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                  />
                  <MyContainer>
                    <Stack gap={2}>
                      <div>{product.name}</div>
                      <div>
                        {product.quantity} x {product.price}
                      </div>
                    </Stack>
                  </MyContainer>
                  <div>{product.quantity * product.price}</div>
                </Stack>
              ))
            ) : (
              <div>No products in cart</div>
            )}

            <div className="boder-2 border-top mt-3 py-3">
              Total:<span className="text-secondary">{total}</span>
            </div>
            {total > 0 && (
              <Button onClick={() => dispatch(openModal(true))}>Pay</Button>
            )}
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
