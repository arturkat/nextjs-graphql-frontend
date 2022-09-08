import React, { ReactNode } from "react";
import MyNavbar from "./MyNavbar";
import MyFooter from "./MyFooter";
import { Container } from "react-bootstrap";
import Cart from "./Cart";
import { useAppSelector } from "../hooks/redux.hook";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import MyContainer from "./MyContainer";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const Layout = ({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
}): JSX.Element => {
  return (
    <main style={{ marginTop: "5rem" }}>
      <MyContainer>
        <NextSeo
          title={title}
          description={description}
          openGraph={{ title, description }}
        />

        {/*<motion.main*/}
        {/*  initial="hidden"*/}
        {/*  animate="enter"*/}
        {/*  exit="exit"*/}
        {/*  variants={variants}*/}
        {/*  transition={{ type: "linear" }}*/}
        {/*  className=""*/}
        {/*>*/}
        {/*  {children}*/}
        {/*</motion.main>*/}

        {children}
      </MyContainer>
    </main>
  );
};

export default Layout;
