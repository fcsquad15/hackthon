import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import Router from '../../Routes';

export default function Main() {

  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}
