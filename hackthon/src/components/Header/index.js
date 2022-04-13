import React from "react";

import { HeaderContainer, LogoContainer } from './styles';
import logo from '../../images/logo.svg';

export default function Header(){
    return(
        <HeaderContainer className='header'>
            <LogoContainer>
                <img src={logo} alt='Technical Share' />
            </LogoContainer>
        </HeaderContainer>
    )
}