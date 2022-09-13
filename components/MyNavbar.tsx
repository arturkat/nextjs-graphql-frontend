import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { toggleCartModal } from "@/redux/cartSlice";
import MyContainer from "@/components/MyContainer";

const MyNavbar = (props: any) => {
  const productsInCart = useAppSelector((state) => state.cart.productsInCart);
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);
  const dispatch = useAppDispatch();

  return (
    <Navbar {...props} bg="dark" variant="dark" fixed="top">
      <MyContainer>
        <Navbar.Brand>
          <Link href={"/"} passHref>
            <Nav.Link>Products</Nav.Link>
          </Link>
        </Navbar.Brand>

        <Nav className="ml-auto">
          <Link href={"/contacts"} passHref>
            <Nav.Link>Contacts</Nav.Link>
          </Link>

          <Link href={"/about"} passHref>
            <Nav.Link>About</Nav.Link>
          </Link>

          <Nav.Link onClick={() => dispatch(toggleCartModal(!isCartOpen))}>
            <i className="fa-solid fa-cart-shopping me-1"></i>
            <span className="me-2">Cart</span>
            <span className="bg-danger text-center text-white rounded-pill px-2 py-1 ml-2">
              {productsInCart.reduce(
                (acc, product) => acc + product.quantity,
                0
              )}
            </span>
          </Nav.Link>
        </Nav>
      </MyContainer>
    </Navbar>
  );
};

export default MyNavbar;
