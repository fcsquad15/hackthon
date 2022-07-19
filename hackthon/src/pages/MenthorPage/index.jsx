/* eslint-disable operator-linebreak */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/CardPerson";
import ModalDetailPerson from "../../components/ModalPerson";
import useUser from "../../hooks/useUser";

import { Get } from "../../services/Conection";

import "./styles.css";

export default function MenthorPage() {
  const { openDetailPerson } = useUser();
  const [menthors, setMenthors] = useState();
  const { areaId } = useParams();
  const { setOpen, setErrorMessage } = useUser();

  async function loadMenthor() {
    try {
      const response = await Get(
        // eslint-disable-next-line comma-dangle
        `/mentorias/filtroArea?area=${areaId}`
      );
      setMenthors(response.data);
    } catch (error) {
      setOpen(true);
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    loadMenthor();
  }, []);

  return (
    <section className="MenthorPage">
      <article className="TitleMenthor">
        <h1>Mentorias</h1>
      </article>
      <h2 className="TitleList">Escolha o seu mentor</h2>
      <article className="ListMenthor">
        {menthors &&
          menthors.map((menthor) => (
            <Card
              key={menthor.id}
              avatar={menthor.avatar}
              name={menthor.nome}
              id={menthor.id}
            />
          ))}
      </article>
      {openDetailPerson && <ModalDetailPerson />}
    </section>
  );
}
