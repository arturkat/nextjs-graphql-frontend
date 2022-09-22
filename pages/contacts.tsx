import React from "react";
import MyLayout from "@/components/MyLayout";
import ProductList from "@/components/ProductList";
import ProductCard from "@/components/ProductCard";

const Contacts = () => {
  return (
    <>
      <MyLayout>
        <h1>Contacts</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
          consequatur facilis harum magni molestias mollitia pariatur sequi ut.
          Commodi quia tempora velit? Asperiores dolorem molestiae pariatur. A
          aperiam at autem beatae corporis deserunt dignissimos eaque earum, est
          ex facere fuga fugit, in laboriosam laborum libero maxime
          necessitatibus nesciunt nostrum officiis optio praesentium quibusdam
          rem tempore vitae voluptas, voluptatem. Accusantium ad alias aperiam
          at commodi eaque et, ex exercitationem explicabo libero, magnam, nam
          neque odit perspiciatis quae quis quos ratione repellendus saepe
          velit.
        </p>
        <ProductCard id={1} />
        {/*<ProductCard id={2} />*/}
        {/*<ProductCard id={3} />*/}
      </MyLayout>
    </>
  );
};

export default Contacts;
