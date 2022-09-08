import Image from "next/image";
import React from "react";
import { Card } from "react-bootstrap";
import { Product as ProductType } from "../graphql/types";
import Link from "next/link";
// import Link from "./NoScrollLink";

export default function ProductListItem({ product }: { product: ProductType }) {
  return (
    <Card>
      <Link href={`/product/${product.id}`}>
        <a className="text-center">
          <Image
            src={`${product.image}`}
            alt={product.name}
            width={200}
            height={200}
            objectFit={"contain"}
          />
        </a>
      </Link>
    </Card>
  );
}
