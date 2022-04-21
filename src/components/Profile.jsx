import { useState } from "react";
import Header from "./Header";

import "./Profile.css";

function Profile(props) {
  const [profileData, setProfileData] = useState(null);

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
            <h1 className="pic-text">Username</h1>
          </div>
          <div className="right">
            <p className="info">First name: </p>
            <p className="info">Last name: </p>
            <p className="info">Username :</p>
            <p className="info">Email:</p>
            <p className="info">Phone Number: </p>
            <p className="info">Bio: </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
