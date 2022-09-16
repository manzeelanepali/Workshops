import React from "react";

const Notifications = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="notification">{message}</div>;
};

export default Notifications;
