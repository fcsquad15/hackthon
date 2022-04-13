import { createGlobalStyle } from 'styled-components';

import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`
  body {
    width: 100vw;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;
 
export default GlobalStyle;