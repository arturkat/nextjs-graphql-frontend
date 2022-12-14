import React from "react";
import MyLayout from "@/components/MyLayout";
import ProductList from "@/components/ProductList";

const About = () => {
  return (
    <>
      <MyLayout>
        <h1>About</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
          deleniti ducimus maxime nesciunt, odit porro quos unde vero! Delectus
          laborum necessitatibus placeat provident repellendus! Amet blanditiis
          dolorem, dolores enim exercitationem ipsum labore magnam magni
          necessitatibus non porro possimus similique soluta ullam veniam
          veritatis vero vitae voluptates? Ab accusamus aspernatur, assumenda
          aut blanditiis consequuntur delectus dicta error nam, omnis placeat
          sint sunt, ullam. Aspernatur ipsum nihil perspiciatis!
        </p>
        <ProductList />
      </MyLayout>
    </>
  );
};

export default About;
