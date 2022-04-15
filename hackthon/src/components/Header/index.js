import React from "react";

import { Get, Post } from "../../services/Conection";

import { Input } from "antd";
import { SearchOutlined, BellFilled } from "@ant-design/icons";
import {
  HeaderContainer,
  LogoContainer,
  InputContainer,
  ProfileContainer,
  BellContainer,
  NotificationContainer,
  Notification
} from "./styles";
import './st.css';

export default function Header() {

  const [user, setUser] = React.useState([]);
  const [showNotification, setShowNotification] = React.useState(false);
  const [notification, setNotification] = React.useState([]);

  async function loadUser() {
    try {
      const response = await Get('/usuarios/1');
      setUser(response.data)
    } catch (error) {

    }
  }
  async function loadNotification() {
    try {
      const response = await Get('/notificacoes/1');
      setNotification(response.data)
    } catch (error) {

    }
  }

  async function handleNotification() {
    if (showNotification) {
      async function readAllNotification() {
        try {
          const response = await Post('/notificacoes/', {
            id: 1
          });
        } catch (error) {

        }
      }
      readAllNotification()
      setShowNotification(false)
    } else {
      setShowNotification(true)
    }
  }

  React.useEffect(() => {
    loadUser();
    loadNotification();
  }, [showNotification])
  return (
    <HeaderContainer className="header">
      <LogoContainer>
        <p>Technical Share</p>
      </LogoContainer>
      <InputContainer>
        <Input
          style={{ width: "80%" }}
          placeholder="Pesquisar"
          prefix={<SearchOutlined className="site-form-item-icon" />}
        />
        <p>Fórum</p>
      </InputContainer>
      <BellContainer onClick={() => handleNotification()}>
        <BellFilled style={{ fontSize: "1.6rem", color: "#464444" }} />
      </BellContainer>
      {showNotification && <NotificationContainer>
        {notification.map((iten) => (
          <Notification key={iten.id} className={iten.lida && "read"}>
            {iten.mensagem}
          </Notification>
        ))}
      </NotificationContainer>}
      <ProfileContainer><img src={user.avatar} alt="profile" /></ProfileContainer>
    </HeaderContainer>
  );
}
