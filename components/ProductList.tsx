import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import ProductListItem from "../components/ProductListItem";
import { getAllProducts } from "../graphql/getAllProducts.query";
import { GetAllProductsQuery } from "../graphql/types";
import { Col, Container, Row } from "react-bootstrap";

const productMock = {
  id: 100,
  name: "Airpods Wireless Bluetooth Headphones",
  image: "/images/airpods.jpg",
  description:
    "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
  brand: "Apple",
  category: "Electronics",
  price: 89.99,
  quantity: 5,
  countInStock: 10,
  rating: 4.5,
  numReviews: 12,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const ProductList: NextPage = () => {
  const { data } = useQuery<GetAllProductsQuery>(getAllProducts);
  return (
    <div className={"mt-4"}>
      <Row>
        {data?.products.map((product) => (
          <Col key={product.id} sm={6} md={4} lg={3} className={"mb-4"}>
            <ProductListItem product={product} />
          </Col>
        ))}
      </Row>

      <Row>
        <Col key={productMock.id} sm={6} md={4} lg={3} className={"mb-4"}>
          <ProductListItem product={productMock} />
        </Col>
      </Row>
    </div>
  );
};

export default ProductList;
