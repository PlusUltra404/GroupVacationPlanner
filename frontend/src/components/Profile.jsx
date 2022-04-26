import { useState, useEffect } from "react";
import Header from "./Header";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Text, TextInput } from "react-native";
import zxcvbn from "zxcvbn";

import "../styles/Profile.css";

function Profile(props) {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [intro, setintro] = useState("");
  const [mobile, setmobile] = useState("");
  const [firstname, setfirst] = useState("");
  const [lastname, setlast] = useState("");

  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Intro, setIntro] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Firstname, setFirst] = useState("");
  const [Lastname, setLast] = useState("");

  const [edit, setEdit] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (username === "") {
      setusername(Username);
    }
    if (email === "") {
      setemail(Email);
    }
    if (password === "") {
      setpassword(Password);
    } 
    if (intro === "") {
      setintro(Intro);
    }
    if (mobile === "") {
      setmobile(Mobile);
    }
    if (firstname === "") {
      setfirst(Firstname);
    }
    if (lastname === "") {
      setlast(Lastname);
    }
    props.apiservice.update_user(username,
      email,
      password,
      intro,
      mobile,
      firstname,
      lastname)(
    );
  }
  useEffect(() => {
    props.apiservice.get_user(props.username).then((result) => {
      console.log(result.data);
      setUsername(result["data"][0]["username"]);
      setEmail(result["data"][0]["email"]);
      setPassword(result["data"][0]["password"]);
      setIntro(result["data"][0]["intro"]);
      setMobile(result["data"][0]["mobile"]);
      setFirst(result["data"][0]["firstname"]);
      setLast(result["data"][0]["lastname"]);
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="profile">
          <div className="left">
            <div>
              <img
                className="avatar"
                src="https://www.w3schools.com/w3images/avatar2.png"
              />
            </div>
            <h1 className="pic-text">{Username}</h1>
          </div>
          <div className="right">
            <p className="info">First name: {Firstname}</p>
            <p className="info">Last name: {Lastname}</p>
            <p className="info">Username: {Username}</p>
            <p className="info">Email: {Email}</p>
            <p className="info">Phone Number: {Mobile}</p>
            <p className="info">Bio: {Intro}</p>
            <button className="buttony" onClick={() => setEdit(!edit)}>
              Edit
            </button>
          </div>
        </div>
        <div className="editing">
          {edit && (
            <div>
              <h1 className="edit-heading">Edit your Details</h1>
              <div className="card">
                <form>
                  <label className="input-label">Username: </label>
                  <input
                    className="input-field"
                    onChange={(e) => setusername(e.target.value)}
                  ></input>
                  <label className="input-label">Password: </label>
                  <input
                    type="password"
                    className="input-field"
                    onChange={(e) => setpassword(e.target.value)}
                  ></input>
                  <label className="input-label">Email: </label>

                  <input
                    className="input-field"
                    onChange={(e) => setemail(e.target.value)}
                  ></input>

                  <label className="input-label">mobile: </label>

                  <input
                    className="input-field"
                    onChange={(e) => setmobile(e.target.value)}
                  ></input>

                  <label className="input-label">Bio: </label>

                  <input
                    className="input-field"
                    onChange={(e) => setintro(e.target.value)}
                  ></input>

                  <button className="submit-buttony" onClick={handleSubmit}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
