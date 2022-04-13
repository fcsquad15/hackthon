import React from 'react';

import GlobalStyle from '../../GlobalStyled'

import { BrowserRouter } from 'react-router-dom';
import Router from '../../Routes';

export default function Main() {

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}
