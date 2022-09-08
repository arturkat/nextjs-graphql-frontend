import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MyContainer from "./MyContainer";

export default function MyFooter() {
  return (
    <footer>
      <MyContainer fluid>
        <Row className="text-center py-3">
          <Col>Copyright &copy; CustomShop </Col>
        </Row>
      </MyContainer>
    </footer>
  );
}
