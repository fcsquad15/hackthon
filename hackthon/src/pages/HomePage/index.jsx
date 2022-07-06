import { useState } from "react";
import { useNavigate } from "react-router-dom"

import girl from "../../assets/girl.svg";
import girl2 from "../../assets/girl2.svg";

import ModalMenthor from "../../components/ModalMenthor";

import "./styles.css";

export default function HomePage() {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false);

  function ReceiveOpenModalStateToClose(a) {
    setOpenModal(a);
  }

  return (
    <>
      {openModal && (
        <ModalMenthor
          ReceiveOpenModalStateToClose={ReceiveOpenModalStateToClose}
        />
      )}
      <section className="GreenSection">
        <div className="TextGreen">
          <h1 className="GreenTitle" >Technical Share</h1>
          <h2 className="GreenText">
            Conectando pessoas              interessadas pela tecnologia
          </h2>
        </div>

        <img src={girl} alt="Tech Share" className="GirlGreen" />
        <img src={girl2} alt="Technical Share" className="BottomGirl" />
      </section>
      <section className="BtnSection ">
        <button type="button"
          className="MenthorBtn BtnHome"
          onClick={() => setOpenModal(true)}>
          Marcar Mentoria
        </button>
        <button type="button"
          className="ForumBtn BtnHome"
          onClick={() => navigate("/forum")}>
          Tirar Dúvida
        </button>
      </section>
    </>
  );
}
