/* eslint-disable operator-linebreak */
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../components/CardPerson";

import { Get } from "../../services/Conection";

import "./styles.css";

export default function MenthorPage() {
  const [menthors, setMenthors] = useState();
  // const { habilidadeId } = useParams();

  async function loadMenthor() {
    try {
      const response = await Get(
        // eslint-disable-next-line comma-dangle
        "/mentorias"
        // `/mentorias/filtroHab?habilidade=${habilidadeId}`
      );
      console.log(response.data);
      setMenthors(response.data);
    } catch (error) {
      toast.error(error.message);
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
            />
          ))}
      </article>
    </section>
  );
}
