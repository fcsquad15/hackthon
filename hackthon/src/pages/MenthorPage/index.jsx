/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/CardPerson";
import ModalDetailPerson from "../../components/ModalPerson";
import useUser from "../../hooks/useUser";

import { Get } from "../../services/Conection";
import { getItem } from "../../utils/Storage";

import "./styles.css";

export default function MenthorPage() {
  const { openDetailPerson } = useUser();
  const [menthors, setMenthors] = useState();
  const { areaId } = useParams();
  const { setOpen, setToastMessage, setSeverity } = useUser();
  const token = getItem("token");

  async function loadMenthor() {
    try {
      const response = await Get(`/mentorias/filtroArea?area=${areaId}`, token);
      setMenthors(response.data);
    } catch (error) {
      setOpen(true);
      setToastMessage(error.message);
      setSeverity("error");
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
