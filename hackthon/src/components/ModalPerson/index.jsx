/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import "./styles.css";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Close from "../../assets/x.svg";
import useUser from "../../hooks/useUser";
import { Get, Post } from "../../services/Conection";

export default function ModalPersonDetail() {
  const { setOpenDetailPerson, currentPerson, setOpen, setErrorMessage } =
    useUser();

  function close() {
    setOpenDetailPerson(false);
  }
  const [person, setPerson] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const [form, setForm] = useState({
    horario: "",
  });

  function handleFormValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function loadInfos() {
    try {
      const response = await Get(`/mentor/${currentPerson}`);
      setPerson(response.data.mentor);
      setAbilities(response.data.habilidade);
      setAgenda(response.data.horarios);
    } catch (error) {
      setOpen(true);
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    loadInfos();
  }, []);

  // eslint-disable-next-line consistent-return
  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.horario) {
      setOpen(true);
      setErrorMessage("É necessário marcar um horário");
      return;
    }

    try {
      const { data, ok } = await Post("/mentorias/marcar", {
        usuario_id: 1,
        agenda_id: form.horario,
      });

      if (!ok) {
        setOpen(true);
        setErrorMessage(data);
        return;
      }

      setForm({
        horario: "",
      });
      setOpen(true);
      setErrorMessage("Mentoria Marcada com sucesso");
      setOpenDetailPerson(false);
    } catch (error) {
      setOpen(true);
      setErrorMessage(error.message);
    }
  }

  return (
    <section className="BackdropDetail">
      <section className="ModalDetail">
        <button type="button" onClick={() => close()} className="CloseButton">
          <img src={Close} alt="X" />
        </button>
        {person && (
          <article className="PersonDetail">
            <img
              src={person.avatar}
              alt="Profile Icon"
              className="DetailAvatar"
            />
            <span className="DetailName FontDetail">{person.nome}</span>
            <span className="DetailPosition FontDetail">Ux Research</span>
            <span className="DetailLevel FontDetail">Sênior</span>
          </article>
        )}
        <article className="PersonSchedule">
          <div className="AbilitiesContainer">
            <h2 className="PersonScheduleTitle FontDetail">Habilidades</h2>
            <article className="PersonAbilities">
              {abilities === "0" ? (
                abilities.map((ability) => (
                  <div className="ModalIten FontDetail" key={ability.id}>
                    <span>{ability.habilidade}</span>
                  </div>
                ))
              ) : (
                <div className="ModalIten FontDetail">
                  <span>Nenhuma habilidade cadastrada</span>
                </div>
              )}
            </article>
          </div>
          <div className="ScheduleContainer">
            <h2 className="PersonScheduleTitle FontDetail">
              Selecione um dos horários
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="PersonHorary">
                {agenda.length === "0" ? (
                  agenda.map((horario) => (
                    <div className="ModalIten FontDetail" key={horario.id}>
                      <label id="horario" className="HourIten">
                        <div className="AlignCenter">
                          <input
                            type="radio"
                            name="horario"
                            value={horario.id}
                            onChange={handleFormValue}
                          />
                          <span>
                            {format(new Date(horario.dia), "eeeeee dd/MM", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                        <span>{horario.hora}</span>
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="ModalIten FontDetail AlignCenter">
                    <span>Nenhum horário disponível</span>
                  </div>
                )}
              </div>
              <button type="submit" className="ScheduleBtn">
                Agendar mentoria
              </button>
            </form>
          </div>
        </article>
      </section>
    </section>
  );
}
