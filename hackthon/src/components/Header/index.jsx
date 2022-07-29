/* eslint-disable consistent-return */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import Badge from "@mui/material/Badge";
import IconSearch from "../../assets/search.svg";

import useUser from "../../hooks/useUser";
import { Get, Post } from "../../services/Conection";
import { getItem } from "../../utils/Storage";
import "./style.css";

export default function Header() {
  const navigate = useNavigate();
  const token = getItem("token");

  const [user, setUser] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState([]);
  const [notificationNotRead, setNotificationNotRead] = useState([]);
  const { setOpen, setErrorMessage } = useUser();

  async function loadUser() {
    try {
      const { data, ok } = await Get("/usuario", token);
      if (!ok) {
        return alert(data);
      }
      setUser(data);
    } catch (error) {
      setOpen(true);
      setErrorMessage(error.message);
    }
  }

  async function loadNotification() {
    try {
      const { data, ok } = await Get("/notificacoes", token);
      if (!ok) {
        return alert(data);
      }
      setNotification(data);
      const notRead = data.filter((iten) => !iten.lida);
      setNotificationNotRead(notRead);
    } catch (error) {
      setOpen(true);
      setErrorMessage(error.message);
    }
  }

  async function readAllNotification() {
    try {
      await Post(
        "/notificacoes/",
        {
          id: 1,
        },
        // eslint-disable-next-line comma-dangle
        token
      );
    } catch (error) {
      setOpen(true);
      setErrorMessage(error.message);
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
    if (token) {
      loadUser();
      loadNotification();
    }
  }, [showNotification]);

  return (
    <section className="Header">
      {token && (
        <>
          <button
            className="Logo"
            type="button"
            onClick={() => navigate("/home")}
          >
            Technical Share
          </button>
          <div className="SearchContainer">
            <img className="IconSearch" src={IconSearch} alt="Search" />
            <input placeholder="Pesquisa" className="HeaderSearch" />
          </div>
          <div className="ContentHeader">
            <button
              type="button"
              className="ForumHeader"
              onClick={() => navigate("/forum")}
            >
              Fórum
            </button>
            <div className="NotificationBadge">
              <Badge
                badgeContent={notificationNotRead.length}
                color="error"
                onClick={() => handleNotification()}
              >
                <NotificationImportantIcon
                  color="action"
                  sx={{ height: "6rem", width: "6rem", cursor: "pointer" }}
                />
              </Badge>
            </div>
            <img src={user.avatar} alt="profile" className="ProfileContainer" />
          </div>
          {showNotification && (
            <section className="NotificationContainer">
              {notification.map((iten) => (
                <div
                  key={iten.id}
                  className={iten.lida ? "Read Notification" : "Notification"}
                >
                  <span>Oba!</span>
                  <span>{iten.mensagem}</span>
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </section>
  );
}
