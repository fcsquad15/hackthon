import React from "react";

import { ModalMenthorContainer, TitleContainer } from "./styles";

export default function ModalMenthor({ ReceiveOpenModalStateToClose }) {
  const sendPropsToCloseModal = () => ReceiveOpenModalStateToClose(false);

  return (
    <ModalMenthorContainer onClick={sendPropsToCloseModal}>
      <TitleContainer>
        <p>Em qual área você quer receber mentoria?</p>
        <br />
        <p>ux research</p>
        <p>ux writing</p>
        <p>marketing</p>
        <p>ui design</p>
        <p>gestão</p>
        <p>agile</p>
        <p>design system</p>
        <p>ux strategy</p>
      </TitleContainer>
    </ModalMenthorContainer>
  );
}
