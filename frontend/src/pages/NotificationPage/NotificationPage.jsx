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
      title: "Um novo Acesso Foi Registrado na sua Conta!",
      content:
        "Um acesso foi registrado, IP 192.16.8.6 | Taquara - RS Foi Você?",
    },
    {
      id: 2,
      title: "Novas Entregas Registradas",
      content:
        "Confira agora as novas entregas Registradas no Sistema!",
    },
    {
      id: 3,
      title: "Infelizmente, novos clientes inativos foram registrados!",
      content:
        "Confira quais clientes foram inativados essa semana!",
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
