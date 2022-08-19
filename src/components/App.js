import '../styles/App.scss';
import { useState } from 'react';
import dataCharacters from '../data/data.json';
// import { v4 as uuid } from 'uuid';

function App() {
  const [characters, selectCharacters] = useState(dataCharacters);
  const html = characters.map((char, i) => {
    return (
      <li key={i}>
        <p>{char.quote}</p>
        <p>-{char.character}</p>
      </li>
    );
  });
  return (
    <>
      <header>
        <h1>Frases de Friends</h1>
        <form>
          <label htmlFor="searchPhrase">Filtrar por frase</label>
          <input type="text" name="searchPhrase" id="searchPhrase"></input>
          <label htmlFor="selectCharacter">Filtrar por personaje</label>
          <select name="character" id="character">
            <option value="all">Todos</option>
            <option value="ross">Ross</option>
            <option value="monica">Monica</option>
            <option value="joey">Joey</option>
            <option value="phoebe">Phoebe</option>
            <option value="chandler">Chandler</option>
            <option value="rachel">Rachel</option>
          </select>
        </form>
      </header>
      <body>
        <ul>{html}</ul>
      </body>
      <footer>
        <form>
          <legend>Añadir una nueva frase</legend>
          <label htmlFor="addNewPhrase">Frase</label>
          <input type="text" name="addNewPhrase" id="addNewPhrase"></input>
          <label htmlFor="addNewCharacter">Personaje</label>
          <input
            type="text"
            name="addNewCharacter"
            id="addNewCharacter"
          ></input>
        </form>
      </footer>
    </>
  );
}

export default App;
