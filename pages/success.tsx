import React from "react";
import { Alert } from "react-bootstrap";
import Layout from "@/components/Layout";

export default function success() {
  return (
    <Layout>
      <Alert variant="success">Your Payment was successful</Alert>
    </Layout>
  );
}
