/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from "react-router-dom";

// import useUser from "../../hooks/useUser";

import { useState } from "react";
import { Post } from "../../services/Conection";

import "./styles.css";

import { setItem } from "../../utils/Storage";

export default function HomePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  function handleFormValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // eslint-disable-next-line consistent-return
  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.email || !form.senha) {
      return alert("Campo não informado");
    }
    console.log(form);
    try {
      const { data, ok } = await Post("/", {
        email: form.email,
        senha: form.senha,
      });

      if (!ok) {
        return alert(data.mensagem);
      }

      setItem("token", data.token);

      return navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <section className="LoginPage">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            placeholder="Digite o seu e-mail aqui"
            value={form.email}
            type="text"
            onChange={handleFormValue}
            name="email"
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            name="senha"
            id="password"
            placeholder="Digite a sua senha aqui"
            value={form.senha}
            type="password"
            onChange={handleFormValue}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </section>
  );
}
