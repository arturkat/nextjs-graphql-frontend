import Image from "next/image";
import React from "react";
import { Card } from "react-bootstrap";
import { m } from "framer-motion";
import Link from "next/link";
import { Product as ProductType } from "@/graphql/types";
// import Link from "./NoScrollLink";

export default function ProductListItem({ product }: { product: ProductType }) {
  return (
    <m.div
      whileHover={{ scale: 1.02, zIndex: 10, position: "relative" }}
      whileTap={{ scale: 0.98 }}
    >
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
    </m.div>
  );
}
