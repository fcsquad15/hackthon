import { createGlobalStyle } from 'styled-components';

import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`
  body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    outline: none;
    font-family: 'Montserrat', sans-serif;
  }
`;
 
export default GlobalStyle;