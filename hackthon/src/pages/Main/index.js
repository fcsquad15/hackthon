import Card from '../../components/Cards'
import { people } from '../../data/data'
import './styles.css';

function Main() {
  return (
    <div className="div-people">
      {
        people.map((person) => (
          <div key={person.id}>
            < Card
              id={person.id}
              avatar={person.avatar}
              name={person.name}
            />
          </div>
        ))
      }
    </div>
  );
}

export default Main;
