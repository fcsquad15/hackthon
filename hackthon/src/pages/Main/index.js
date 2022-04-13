import React from 'react';

import GlobalStyle from '../../GlobalStyled'
import { MainContainer } from './styles'

import Header from '../../components/Header'

import { BrowserRouter } from 'react-router-dom';
import Router from '../../Routes';

export default function Main() {

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <div className='Lblanc' />
        <Header  />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <div className='Rblanc' />
      </MainContainer>
    </>
  );
}
