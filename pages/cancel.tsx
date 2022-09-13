import React from "react";
import { Alert } from "react-bootstrap";
import Layout from "@/components/Layout";

export default function cancel() {
  return (
    <Layout>
      <Alert variant="danger">Your payment failed</Alert>
    </Layout>
  );
}
