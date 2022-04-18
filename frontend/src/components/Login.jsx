import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";

import APIService from "./APIService";

import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleNew() {
    navigate("/register");
  }

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const handleSubmit = (event) => {
    props.apiservice.login(username, password).then(() => {
      navigate({
        pathname: "/home",
      });
    });
    // Prevent page reload
    event.preventDefault();
  };

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  // JSX code for login form
  return (
    <div className="Login">
      <meta charSet="UTF-8" />

      <h1>Advanced Vacation Planner</h1>
      <div className="card">
        <Form onSubmit={handleSubmit}>
          <FormGroup className="card-inside" controlId="username" size="lg">
            <FormLabel className="input-label">Username:</FormLabel>

            <FormControl
              autoFocus
              type="text"
              className="username-input-filed"
              name="userid"
              value={username}
              placeholder="username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormGroup>
          <Form.Group className="card-inside" size="lg" controlId="password">
            <Form.Label className="input-label">Password:</Form.Label>
            <Form.Control
              type="password"
              className="username-input-filed"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            className="login-button"
            onClick={handleSubmit}
            variant="primary"
            block
            size="lg"
            type="submit"
            disabled={!validateForm()}
          >
            Login
          </Button>
          <br />
          <p className="register-text">
            New User? Register today!
            <br />
            <Button
              className="signup-button"
              onClick={handleNew}
              type="submit"
              id="login"
            >
              Sign up
            </Button>
          </p>
        </Form>
      </div>
    </div>
  );
}
