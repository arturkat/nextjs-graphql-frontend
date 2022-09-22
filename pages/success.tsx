import React from "react";
import { Alert } from "react-bootstrap";
import MyLayout from "@/components/MyLayout";

export default function success() {
  return (
    <MyLayout>
      <Alert variant="success">Your Payment was successful</Alert>
    </MyLayout>
  );
}
