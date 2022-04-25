import "../styles/GroupRender.css";

const GroupRender = (props) => {
  const { Data } = props;
  const { id, created_by, profile, title } = Data;

  return (
    <div className="each-group">
      <h1 className="name">{title}</h1>
      <p className="desc">created by : {created_by}</p>
      <p className="desc">{profile}</p>
      <button className="buttony">Join Group</button>
    </div>
  );
};

export default GroupRender;
