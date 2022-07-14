/* eslint-disable react/prop-types */
import "./styles.css";

export default function Card({ avatar, name }) {
  return (
    <section className="CardPerson">
      <div className="PersonContent">
        <img src={avatar} alt="Profile Icon" className="PersonAvatar" />
        <span className="PersonName">{name}</span>
        <span className="PersonPosition">Ux Research</span>
        <span className="PersonLevel">Sênior</span>
      </div>
      <button type="button" className="PersonButton">
        Sobre
      </button>
    </section>
  );
}
