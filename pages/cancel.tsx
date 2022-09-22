import React from "react";
import { Alert } from "react-bootstrap";
import MyLayout from "@/components/MyLayout";

export default function cancel() {
  return (
    <MyLayout>
      <Alert variant="danger">Your payment failed</Alert>
    </MyLayout>
  );
}
