import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import "./NotificationItem.css";

function NotificationItem({ notification }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleDelete = () => {
    alert(`Notificação com o título "${notification.title}" excluída!`);
  };

  return (
    <div className="notification-item">
      <div className="notification-item-header">
        <h3>{notification.title}</h3>
        <MdDeleteOutline className="delete-icon" onClick={handleDelete} />
      </div>
      <div className={`div-content ${isExpanded ? "expanded" : ""} `}>
        <p className={`notification-content ${isExpanded ? "expanded" : ""} `}>
          {notification.content}
        </p>
      </div>
      <button className="toggle-btn" onClick={toggleExpand}>
        {isExpanded ? "Ver menos" : "Ver mais"}
        <IoIosArrowDown
          className={`icon-arrow ${isExpanded ? "rotated" : ""}`}
        />
      </button>
    </div>
  );
}

export default NotificationItem;
