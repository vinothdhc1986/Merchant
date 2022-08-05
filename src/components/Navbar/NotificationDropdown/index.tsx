import React from "react";
import { dummyNotificationData } from "./notificationDropdown.constants";
import "./styles.scss";

const NotificationDropdown = (): JSX.Element => {
  return (
    <div className="notificationBox">
      <ul className="notification-list">
        {dummyNotificationData.map((notification, index) => (
          <li className="alert alert-light" key={index}>
            <a href="#">
              <div className="friend_list_profile">
                <span>
                  <img src={notification.image} alt="" />
                </span>
              </div>
              <div className="friend_list_des">
                <h6>
                  {notification.title}
                </h6>
                <p>{notification.dateTime}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationDropdown;
