import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // setup state
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [ability, setAbility] = useState("");

  const fetchPokemon = async() => {
    try {      
      const response = await axios.get("/api/pokemon");
      setPokemon(response.data.pokemon);
    } catch(error) {
      setError("error retrieving tickets: " + error);
    }
  }
  const createPokemon = async() => {
    try {
      //let image_link = "../src/images/" + name + ".png"
      let image_link = "https://upload.wikimedia.org/wikipedia/commons/6/6a/PNG_Test.png"
      console.log(image_link)
      await axios.post("/api/pokemon", {name: name.charAt(0).toUpperCase() + name.slice(1), nickname: nickname, ability:ability, image:image_link});
    } catch(error) {
      setError("error adding a pokemon: " + error);
    }
  }
  
  const deleteOnePokemon = async(pokemon) => {
    try {
      await axios.delete("/api/pokemon/" + pokemon.id);
    } catch(error) {
      setError("error deleting a pokemon" + error);
    }
  }

  // fetch ticket data
  useEffect(() => {
    fetchPokemon();
  },[]);
  

  const addPokemon = async(e) => {
    e.preventDefault();
    await createPokemon();
    fetchPokemon();
    setName("");
    setNickname("");
    setAbility("");
  }

  const deletePokemon = async(pokemon) => {
    await deleteOnePokemon(pokemon);
    fetchPokemon();
  }

  // render results
  return (
    <div className="App">
      {error}
      <h1>Add a Pokemon to your Team</h1>
      <hr/>
      <form onSubmit={addPokemon}>
        <div>
          <select value={name} onChange={e => setName(e.target.value)}>
            <option value="default">Choose your pokemon!</option>
            <option value="bulbasaur">Bulbasaur</option>
            <option value="squirtle">Squirtle</option>
            <option value="charmander">Charmander</option>
            <option value="pikachu">Pikachu</option>
            <option value="mew">Mew</option>
            <option value="vulpix">Vulpix</option>
            <option value="ekans">Ekans</option>
            <option value="cubone">Cubone</option>
            <option value="butterfree">Butterfree</option>
            <option value="psyduck">Psyduck</option>
            <option value="growlithe">Growlithe</option>
            <option value="tauros">Tauros</option>
            <option value="mewtwo">Mewtwo</option>
            <option value="moltres">Moltres</option>
            <option value="articuno">Articuno</option>
            <option value="zapdos">Zapdos</option>
          </select>
        </div>
        <div>
          <label>
            Nickname:
            <input type="text" value={nickname} onChange={e=>setNickname(e.target.value)}/>
          </label>
        </div>
        <div>
          <label>
            Ability:
            <input type="text" value={ability} onChange={e=>setAbility(e.target.value)}/>
          </label>
        </div>
        <input type="submit" value="Submit"/>
      </form>
      <h1>Your Pokemon Team</h1>
      <hr/>
      <div id='container'>
      {pokemon.map( pokemon => (
      
      <div id='pokemon-team'>
        <div key={pokemon.id} className="pokemon">
          <div className="pokemon">
            <img src={pokemon.image} alt='View of a pokemon'/>
            <p>Name: {pokemon.name}</p>
            <p><i>Nickname: {pokemon.nickname}</i></p>
            <p><i>Ability: {pokemon.ability}</i></p>
          </div>
          <button onClick={e => deletePokemon(pokemon)}>Delete</button>
        </div>
      </div>
      
      ))}
    </div>
    <footer> View the full code on <a href="https://github.com/BYU-CS-260/lab2-javascript-gknappattack">my Github</a> </footer>
    </div>
  );
}

export default App;
