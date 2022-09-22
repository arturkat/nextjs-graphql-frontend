import type { NextPage } from "next";
import ProductList from "@/components/ProductList";
import MyLayout from "@/components/MyLayout";
import React from "react";

const Home: NextPage = () => {
  return (
    <MyLayout>
      <h1>Products</h1>
      <ProductList />
    </MyLayout>
  );
};

export default Home;
