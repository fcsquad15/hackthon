/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Get } from "../../services/Conection";

import "./styles.css";

// eslint-disable-next-line react/prop-types
export default function ModalMenthor({ setOpenModal }) {
  const navigate = useNavigate();
  function close() {
    setOpenModal(false);
  }

  // eslint-disable-next-line no-unused-vars
  const [area, setArea] = useState([]);

  async function loadingAreas() {
    try {
      const response = await Get("/habilidades");
      setArea(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    loadingAreas();
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <section className="Backdrop" onClick={() => close()}>
      <h2 className="TitleContainer">
        Em qual área você quer receber mentoria?
      </h2>
      <article className="ListArea">
        {area.map((iten) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <span
            className="ItenArea"
            key={iten.id}
            onClick={() => navigate(`/mentoria/${iten.id}`)}
          >
            {iten.habilidade}
          </span>
        ))}
      </article>
    </section>
  );
}
