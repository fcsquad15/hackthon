import styled from "styled-components";

export const ModalMenthorContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #000;
  opacity: 0.8;
  z-index: 99;
  text-align: center;
`;

export const TitleContainer = styled.div`
  width: 100%;
  margin-top: 10vh;

  p:first-child {
    font-weight: 600;
    cursor: default;
  }

  p {
    font-size: 2rem;
    color: #fff;
    cursor: pointer;
  }
`;
