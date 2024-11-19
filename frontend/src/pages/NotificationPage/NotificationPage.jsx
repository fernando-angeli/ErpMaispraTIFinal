import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import NotificationItem from "../../components/NotificationItem/NotificationItem";
import "./NotificationPage.css"; 
import { AiOutlineRollback } from "react-icons/ai";

function NotificationPage() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "Título da notificação",
      content:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsumis simply dummy text of the printing and typesetting industry. Lorem Ipsum",
    },
    {
      id: 2,
      title: "Título da notificação",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown",
    },
    {
      id: 3,
      title: "Título da notificação",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essential",
    },
  ];

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="notification-page">
      <header className="notification-header">
        <div className="left">
          <h1>Notificações</h1>
        </div>
        <div className="right" onClick={handleBackClick}>
          <span>Voltar</span>
          <AiOutlineRollback className="icon-back" />
        </div>
      </header>
      <div className="notification-list">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}

export default NotificationPage;
