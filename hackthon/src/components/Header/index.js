import React from "react";

import { Input } from 'antd';
import { SearchOutlined, BellOutlined } from '@ant-design/icons';
import { 
    HeaderContainer,
    LogoContainer,
    InputContainer,
    ProfileContainer 
} from './styles';

export default function Header(){


    return(
        <HeaderContainer className='header'>
            <LogoContainer>
                <p>Technical Share</p>
            </LogoContainer>
            <InputContainer>
                <Input placeholder="Pesquisar" prefix={<SearchOutlined className="site-form-item-icon" />} />
            </InputContainer>
            <BellOutlined />
            <ProfileContainer>Oie</ProfileContainer>
        </HeaderContainer>
    )
}