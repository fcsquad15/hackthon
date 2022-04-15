import React from "react";

import { Input } from "antd";
import { SearchOutlined, BellFilled } from "@ant-design/icons";
import {
  HeaderContainer,
  LogoContainer,
  InputContainer,
  ProfileContainer,
} from "./styles";

export default function Header() {
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
      <ProfileContainer>Oie</ProfileContainer>
    </HeaderContainer>
  );
}
