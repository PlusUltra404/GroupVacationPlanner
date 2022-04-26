import "../styles/GroupRender.css";






const GroupRender = (props) => {
  const { Data } = props;
  const { id, created_by, profile, title } = Data;

  const handleSubmit = (event) => {
    props.apiservice.join_chat(props.username, props.password, props.id).then(() => {
    });
    props.apiservice.joingroup(props.username, title )
    // Prevent page reload
    event.preventDefault();
  };

  return (
    <div className="each-group">
      <h1 className="name">{title}</h1>
      <p className="desc">created by : {created_by}</p>
      <p className="desc">{profile}</p>
      <button className="buttony" onClick={handleSubmit } type="submit">Join Group</button>
    </div>
  );
};

export default GroupRender;
