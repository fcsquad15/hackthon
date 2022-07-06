import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import Badge from "@mui/material/Badge";
import { toast } from "react-toastify";
import IconSearch from "../../assets/search.svg";

import { Get, Post } from "../../services/Conection";

import "./style.css";

export default function Header() {
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState([]);
  const [notificationNotRead, setNotificationNotRead] = useState([]);

  async function loadUser() {
    try {
      const response = await Get("/usuarios/1");
      setUser(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function loadNotification() {
    try {
      const response = await Get("/notificacoes/1");
      setNotification(response.data);
      const notRead = response.data.filter((iten) => !iten.lida);
      setNotificationNotRead(notRead);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function readAllNotification() {
    try {
      await Post("/notificacoes/", {
        id: 1,
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleNotification() {
    if (showNotification) {
      readAllNotification();
      setShowNotification(false);
    } else {
      setShowNotification(true);
    }
  }

  useEffect(() => {
    loadUser();
    loadNotification();
  }, [showNotification]);

  return (
    <section className="Header">
      <div className="Logo">
        Technical Share
      </div>
      <div className="SearchContainer">
        <img className="IconSearch" src={IconSearch} alt="Search" />
        <input placeholder="Pesquisa" className="HeaderSearch" />
      </div>
      <div className="ContentHeader">
        <button type="button" className="ForumHeader" onClick={() => navigate("/forum")}>
          Fórum
        </button>
        <div className="NotificationBadge">
          <Badge badgeContent={notificationNotRead.length} color="error" onClick={() => handleNotification()}>
            <NotificationImportantIcon color="action" sx={{ height: "6rem", width: "6rem", cursor: "pointer" }} />
          </Badge>
        </div>
        <img src={user.avatar} alt="profile" className="ProfileContainer" />
      </div>
      {showNotification
        && (
          <section className="NotificationContainer">
            {notification.map((iten) => (
              <div key={iten.id} className={iten.lida ? "Read Notification" : "Notification"}>
                <span>Oba!</span>
                <span>{iten.mensagem}</span>
              </div>
            ))}
          </section>
        )}
    </section>
  );
}
