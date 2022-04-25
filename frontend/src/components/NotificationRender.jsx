import "../styles/NotificationRender.css";

const NotificationRender = (props) => {
  const { Data } = props;
  const { id, title, content, date, group_id } = Data;
  return (
    <div className="each">
      <h1 className="heading">{title}</h1>
      <p className="content">{content}</p>
      <p className="content">Date: {date}</p>
    </div>
  );
};

export default NotificationRender;
