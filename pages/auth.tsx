import React, { useState } from "react";
import MyLayout from "@/components/MyLayout";
import { Button, Form, Stack } from "react-bootstrap";
import { useAppDispatch } from "@/hooks/redux.hook";
import {
  checkAuthAsync,
  getNewTokensAsync,
  logOutAsync,
  signInAsync,
  signUpAsync,
} from "@/redux/authSlice";

const Auth = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: "a@m.com",
    password: "123",
    username: "qwe",
  });

  const changeFormData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  function handleSignUp() {
    dispatch(signUpAsync(formData.email, formData.password, formData.username));
  }

  function handleSignIn() {
    dispatch(signInAsync(formData.email, formData.password));
  }

  function handleCheckUserAuth() {
    dispatch(checkAuthAsync());
  }

  function handleSignOut() {
    dispatch(logOutAsync());
  }

  function handleGetNewTokensAsync() {
    dispatch(getNewTokensAsync());
  }

  return (
    <MyLayout>
      <h1>Auth</h1>
      <pre>{JSON.stringify(formData)}</pre>
      <Form onSubmit={(e) => e.preventDefault()} noValidate>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={changeFormData}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={changeFormData}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={changeFormData}
            onClick={(e) => {}}
          />
        </Form.Group>

        <Stack direction={"horizontal"} gap={2}>
          <Button variant="primary" name="signUp" onClick={handleSignUp}>
            Sign Up
          </Button>

          <Button variant="primary" name="signIn" onClick={handleSignIn}>
            Sign In
          </Button>

          <Button variant="primary" name="logOut" onClick={handleSignOut}>
            Log Out
          </Button>
        </Stack>

        <hr />

        <Stack direction={"horizontal"} gap={2}>
          <Button
            variant="primary"
            name="checkUserAuth"
            onClick={handleCheckUserAuth}
          >
            Check User Auth
          </Button>

          <Button
            variant="primary"
            name="getNewTokens"
            onClick={handleGetNewTokensAsync}
          >
            Get New Tokens
          </Button>
        </Stack>
      </Form>
    </MyLayout>
  );
};

export default Auth;
