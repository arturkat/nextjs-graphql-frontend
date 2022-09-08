import React, { ReactNode } from "react";
import { Container } from "react-bootstrap";

const MyContainer = (props: any) => {
  return (
    <Container {...props} fluid={"xxl"}>
      {props.children}
    </Container>
  );
};

export default MyContainer;
