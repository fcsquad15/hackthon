import React from "react";

import { Get } from "../../services/Conection";

import { Input } from "antd";
import { SearchOutlined, BellFilled } from "@ant-design/icons";
import {
  HeaderContainer,
  LogoContainer,
  InputContainer,
  ProfileContainer,
} from "./styles";

export default function Header() {

  const [user, setUser] = React.useState([]);

  async function loadUser() {
    try {
      const response = await Get('/usuarios/1');
      console.log(response.data)
      setUser(response.data)
    } catch (error) {

    }
  }

  React.useEffect(() => {
    loadUser();
  }, [])
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

      <BellFilled style={{ fontSize: "1.6rem", color: "#464444" }} />
      <ProfileContainer><img src={user.avatar} alt="profile" /></ProfileContainer>
    </HeaderContainer>
  );
}
