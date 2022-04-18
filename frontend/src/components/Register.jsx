import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import { Text } from "react-native";

import zxcvbn from "zxcvbn";
import "../styles/Register.css";

export default function Register(props) {
  const [username, setUserName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [mobile, setMobile] = useState("5555555555");
  const [intro, setIntro] = useState("...");
  const [profile, setProfile] = useState("...");
  const [myText, setMyText] = useState("");
  const minStrength = 3,
    thresholdLength = 7;
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];

  const setScore = (score) => {
    const meter = document.querySelector("#passwordmeter span");
    const msg = document.getElementById("passwordmessage");
    meter.style.width = (score + 1) * 25 + "px";
    //Set the color of the meter to
    // a) red if the score < 3
    // b) yellow if the score = 3
    // c) green if the score = 4
    //Change the text of the password message element accordingly.
    if (score < 2) {
      meter.style.backgroundColor = "red";
    } else if (score < 3) {
      meter.style.backgroundColor = "yellow";
    } else {
      meter.style.backgroundColor = "green";
    }
    msg.innerHTML = "<strong>" + strengthLabels[score] + "</strong> Password";
  };

  const validatePasswordStrong = (value) => {
    setPassword(value);
    setScore(zxcvbn(value).score);
    // ensure password is long enough
    // if (value.length <= this.thresholdLength) console.log("Password is short");

    // ensure password is strong enough using the zxcvbn library
    // if (zxcvbn(value).score < this.minStrength) console.log("Password is weak");
  };

  const navigate = useNavigate();
  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      username.length > 0 &&
      firstname.length > 0 &&
      lastname.length > 0
    );
  }

  function passwordCheck(props) {
    setcPassword(props);
    const pass = props;
    const pass1 = password;
    if (pass === password) {
      setMyText("All Good!");
    } else {
      setMyText("Passwords don't match");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.apiservice
      .create_user(
        firstname,
        lastname,
        email,
        username,
        password,
        mobile,
        intro,
        profile
      )
      .then(() => {
        navigate({
          pathname: "/home",
        });
      });
  }

  return (
    <div className="register">
      <h1>Register for an account!</h1>
      <div className="card">
        <Form>
          <FormGroup className="card-inside" controlId="username">
            <FormLabel className="input-label">username</FormLabel>
            <FormControl
              autoFocus
              type="text"
              className="username-input-filed"
              name="username"
              placeholder=" "
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="card-inside" controlId="firstname">
            <FormLabel className="input-label">firstname</FormLabel>
            <FormControl
              autoFocus
              type="text"
              name="firstname"
              className="username-input-filed"
              placeholder=" "
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="card-inside" controlId="lastname">
            <FormLabel className="input-label">lastname</FormLabel>
            <FormControl
              autoFocus
              type="text"
              name="lastname"
              className="username-input-filed"
              placeholder=" "
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="card-inside" controlId="email">
            <FormLabel className="input-label">email</FormLabel>
            <FormControl
              type="text"
              name="email"
              className="username-input-filed"
              placeholder=" "
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="card-inside" controlId="mobile">
            <FormLabel className="input-label">mobile</FormLabel>
            <FormControl
              autoFocus
              type="text"
              name="mobile"
              className="username-input-filed"
              placeholder="Optional"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="card-inside" controlId="password">
            <FormLabel className="input-label">Password</FormLabel>
            <FormControl
              type="password"
              name="password"
              className="username-input-filed"
              value={password}
              placeholder=" "
              onChange={(e) => validatePasswordStrong(e.target.value)}
            />
          </FormGroup>
          <div style={{ marginBottom: "15px" }}>
            <span id="passwordmeter">
              <span />
            </span>
            <span id="passwordmessage" aria-live="polite" />
          </div>
          <FormGroup className="card-inside" controlId="Cpassword">
            <FormLabel className="input-label">Confirm Password</FormLabel>
            <FormControl
              type="password"
              name="Cpassword"
              className="username-input-filed"
              value={cpassword}
              onChange={(e) => passwordCheck(e.target.value)}
            />
            <br />
            <Text>{myText}</Text>
          </FormGroup>
          <Button
            onClick={handleSubmit}
            className="reg-button"
            disabled={!validateForm()}
            block
            type="submit"
            id="login"
            value="login"
          >
            Register
          </Button>
        </Form>
      </div>

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </div>
  );
}
