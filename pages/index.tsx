import type { NextPage } from "next";
import ProductList from "@/components/ProductList";
import Layout from "@/components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <ProductList />
    </Layout>
  );
};

export default Home;
