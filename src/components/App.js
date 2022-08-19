import '../styles/App.scss';
import { useEffect, useState } from 'react';
import getDataApi from '../services/fetch';
function App() {
  const [dataCharacters, setdataCharacters] = useState([]);
  const [newObject, setNewObject] = useState({
    quote: '',
    character: '',
  });
  const [searchPhrase, setSearchPhrase] = useState('');
  const [searchdataCharacters, setSearchdataCharacters] = useState('');
  const [characters, setCharacters] = useState(new Set());

  const htmldataCharacters = characters.map((data, i) => {
    return <option key={i}>{data.character}</option>;
  });
  // const htmlCharacters = characters.map((data, i) => {
  //   setCharacters(...data.character);
  // });

  useEffect(() => {
    getDataApi().then((data) => setdataCharacters(data));
  }, []);

  const handleSearchPhrase = (ev) => setSearchPhrase(ev.currentTarget.value);
  const handleSearchCharacter = (ev) =>
    setSearchdataCharacters(ev.currentTarget.value);

  const handleClick = (ev) => {
    ev.preventDefault();
    setdataCharacters([...dataCharacters, newObject]);
    setNewObject({
      quote: '',
      character: '',
    });
  };

  const handleNewObject = (ev) =>
    setNewObject({ ...newObject, quote: ev.target.value });

  const handleNewCharacter = (ev) =>
    setNewObject({ ...newObject, character: ev.target.value });

  const html = dataCharacters
    .filter((char) => {
      if (searchdataCharacters.toLowerCase() !== 'all') {
        return char.character
          .toLowerCase()
          .includes(searchdataCharacters.toLowerCase());
      }
      return dataCharacters;
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
            value={searchdataCharacters}
          >
            {htmldataCharacters}
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
            onChange={handleNewObject}
            value={newObject.quote}
          ></input>
          <label htmlFor="addNewCharacter">Personaje</label>
          <input
            type="text"
            name="addNewCharacter"
            id="addNewCharacter"
            onChange={handleNewCharacter}
            value={newObject.character}
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
