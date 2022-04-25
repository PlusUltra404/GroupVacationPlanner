import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

import {
  Form,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import GroupRender from "./GroupRender";
import "../styles/Groups.css";
import { listenBySelector } from "@fullcalendar/react";

export const GroupEntry = (props) => {
  return (
    <div className="GroupEntry">
      <p>
        {"Name: " +
          props.title +
          " | " +
          "profile: " +
          props.profile +
          " | " +
          "count: " +
          props.count}
      </p>
    </div>
  );
};

export const Groups = (props) => {
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();
  const [bool, setbool] = useState(false);

  const [dummy, setDummy] = useState([]);

  /*  const dummy = [
    {
      created_by: "asearle",
      id: 1,
      membercount: null,
      profile: "Track team vacation ",
      title: "Japan Getaway",
    },
    {
      created_by: "chaitanya amdnru",
      id: 2,
      membercount: null,
      profile: "Bachelorette party ",
      title: "Anash Bash",
    },
  ];*/

  //  var list = [];
  if (bool == false) {
    setbool(true);
    props.apiservice.get_groups().then((result) => {
      var list = result.data;
      console.log(result.data);
      setDummy(list);
      /* for (let i = 0; i < result.data.length; i++) {
        const title = result["data"][0]["title"];
        const profile = result["data"][0]["profile"];
        const count = result["data"][0]["membercount"];
        //  list.push({title,profile,count});
        list.push(
          <GroupEntry
            title={result["data"][0]["title"]}
            profile={result["data"][0]["profile"]}
            count={result["data"][0]["membercount"]}
          />
        );
        console.log(list);
      }*/
    });
  }

  /*useEffect(() => {
    props.apiservice.get_groups().then((result) => {
      console.log(result.data);
      for(let i=0; i <result.data.length; i++){
        const title = result['data'][0]['title'];
        const profile = result['data'][0]['profile'];
        const count = result['data'][0]['membercount']
      //  list.push({title,profile,count});
        list.push(
          <GroupEntry
          title = {result['data'][0]['title']} 
          profile = {result['data'][0]['profile']}
          count = {result['data'][0]['membercount']} />

        );
        console.log(list);
      }

    });
 
  }, []); */

  const handleSubmit = (event) => {
    props.apiservice.creategroup(props.username, name, profile).then(() => {
      navigate({
        pathname: "/home",
      });
    });
    // Prevent page reload
    event.preventDefault();
  };

  return (
    <div>
      <Header />
      <div className="groups-container">
        <div className="group-create">
          <h1 className="heading">Create New Group</h1>
          <div className="card">
            <Form>
              <FormGroup
                className="card-inside"
                controlId="groupname"
                size="lg"
              >
                <FormLabel className="input-label">Group Name:</FormLabel>

                <FormControl
                  autoFocus
                  type="text"
                  className="username-input-filed"
                  name="groupname"
                  value={name}
                  placeholder="Group Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              <Form.Group
                className="card-inside"
                size="lg"
                controlId="description"
              >
                <Form.Label className="input-label">Description:</Form.Label>
                <Form.Control
                  type="text"
                  className="username-input-filed"
                  value={profile}
                  placeholder="Description"
                  onChange={(e) => setProfile(e.target.value)}
                />
              </Form.Group>
              <Button
                className="login-button"
                onClick={handleSubmit}
                variant="primary"
                block
                size="lg"
                type="submit"
                // disabled={!validateForm()}
              >
                Create
              </Button>
            </Form>
          </div>
        </div>
        <div className="groups-info">
          <h1 className="heading">Groups you want to join</h1>
          <div className="info-card">
            <div>
              {dummy.map((item) => (
                <GroupRender Data={item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Groups;
