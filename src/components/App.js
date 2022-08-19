import '../styles/App.scss';
import { useState } from 'react';
import dataCharacters from '../data/data.json';
// import { v4 as uuid } from 'uuid';

function App() {
  const [characters, setCharacters] = useState(dataCharacters);
  const [newPhrase, setNewPhrase] = useState({
    quote: '',
    character: '',
  });
  const [searchPhrase, setSearchPhrase] = useState('');
  const [searchCharacters, setSearchCharacters] = useState('');

  const handleSearchPhrase = (ev) => setSearchPhrase(ev.currentTarget.value);
  const handleSearchCharacter = (ev) =>
    setSearchCharacters(ev.currentTarget.value);

  const handleClick = (ev) => {
    ev.preventDefault();
    setCharacters([...characters, newPhrase]);
  };

  const handleNewPhrase = (ev) =>
    setNewPhrase({ ...newPhrase, quote: ev.target.value });

  const handleNewCharacter = (ev) =>
    setNewPhrase({ ...newPhrase, character: ev.target.value });

  const html = characters
    .filter((char) => {
      if (searchCharacters.toLowerCase() !== 'all') {
        return char.character
          .toLowerCase()
          .includes(searchCharacters.toLowerCase());
      }
      return characters;
    })
    .filter((char) =>
      char.quote.toLowerCase().includes(searchPhrase.toLowerCase())
    )
    .map((char, i) => {
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
          <input
            type="text"
            name="searchPhrase"
            id="searchPhrase"
            onChange={handleSearchPhrase}
            value={searchPhrase}
          ></input>
          <label htmlFor="selectCharacter">Filtrar por personaje</label>
          <select
            name="character"
            id="character"
            onChange={handleSearchCharacter}
            value={searchCharacters}
          >
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
      <main>
        <ul>{html}</ul>
      </main>
      <footer>
        <form>
          <legend>Añadir una nueva frase</legend>
          <label htmlFor="addNewPhrase">Frase</label>
          <input
            type="text"
            name="addNewPhrase"
            id="addNewPhrase"
            onChange={handleNewPhrase}
            value={newPhrase.phrase}
          ></input>
          <label htmlFor="addNewCharacter">Personaje</label>
          <input
            type="text"
            name="addNewCharacter"
            id="addNewCharacter"
            onChange={handleNewCharacter}
            value={newPhrase.character}
          ></input>
          <button type="button" onClick={handleClick}>
            Añadir una nueva frase
          </button>
        </form>
      </footer>
    </>
  );
}

export default App;
