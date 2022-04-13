import React from 'react';

import GlobalStyle from '../../GlobalStyled'
import { MainContainer } from './styles'

import { BrowserRouter } from 'react-router-dom';
import Router from '../../Routes';

export default function Main() {

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </MainContainer>
    </>
  );
}
