/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import "./styles.css";

import { useEffect, useState } from "react";
import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";

import Close from "../../assets/x.svg";
import useUser from "../../hooks/useUser";
import { Get } from "../../services/Conection";

export default function ModalPersonDetail() {
  //   const navigate = useNavigate();
  const { setOpenDetailPerson, currentPerson } = useUser();

  function close() {
    setOpenDetailPerson(false);
  }
  const [person, setPerson] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const [form, setForm] = useState({
    horario: "",
  });
  const { setOpen, setErrorMessage } = useUser();

  function handleFormValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function loadDetails() {
    try {
      const response = await Get(`/usuarios/${currentPerson}`);
      setPerson(response.data);

      const responseAbilities = await Get(
        `/usuarios/habilidades/${currentPerson}`
      );
      setAbilities(responseAbilities.data);

      const responseAgenda = await Get(`/mentor/dias?mentor=${currentPerson}`);
      setAgenda(responseAgenda.data);
    } catch (error) {
      setOpen(true);
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    loadDetails();
  }, []);

  // eslint-disable-next-line consistent-return
  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.horario) {
      return;
    }

    try {
      //   const { data, ok } = await createDebtService(
      //     {
      //       client_id: currentClient.id,
      //       description: form.description,
      //       due_date: form.dueDate,
      //       value: form.value * 100,
      //       statusDebt_id: form.status === "Pendente" ? 1 : 2,
      //     },
      //     token
      //   );

      //   if (!ok) {
      //     return toast.error(data);
      //   }

      setForm({
        horario: "",
      });
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
              {abilities.map((ability) => (
                <div className="ModalIten FontDetail" key={ability.id}>
                  <span>{ability.habilidade}</span>
                </div>
              ))}
            </article>
          </div>
          <div className="ScheduleContainer">
            <h2 className="PersonScheduleTitle FontDetail">
              Selecione um dos horários
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="PersonHorary">
                {agenda.map((horario) => (
                  <div className="ModalIten FontDetail" key={horario.id}>
                    <label id="horario">
                      <input
                        type="radio"
                        name="horario"
                        value={horario.id}
                        onChange={handleFormValue}
                      />
                      <span>{format(horario.dia, "dd/MM")}</span>
                      <span>{horario.hora}</span>
                    </label>
                  </div>
                ))}
              </div>
              <button type="submit">Agendar mentoria</button>
            </form>
          </div>
        </article>
      </section>
    </section>
  );
}

// {person.map((iten) => (
//   // eslint-disable-next-line jsx-a11y/click-events-have-key-events
//   <span className="ItenArea" key={iten.id}>
//     {iten.name}
//   </span>
// ))}
