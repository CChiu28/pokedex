import './styles/App.css';
import React, {Component, createContext, useEffect, useState} from "react";
import Search from './Components/search';
import MainInfo from './Components/MainInfo';
import PokemonListDropdown from './Components/PokemonListDropdown';

function App() {
  const [pokeData,setPokeData] = useState();
  const [listOfPokemon,setListOfPokemon] = useState();
  const pokemonList = createContext();
  const list = {
    results: [],
  }

  useEffect(() => {
    (async () => {
      // const poke = await fetch(`http://pokedex.us-east-2.elasticbeanstalk.com/api/pokemonGeneration`);
      const poke = await fetch(`http://localhost:8080/api/pokemonGeneration`);
      const data = await poke.json();
      await setListOfPokemon(data);
    })();
  },[])

  function onSubmit(data) {
    setPokeData(data);
  }

  return (
    <pokemonList.Provider value={listOfPokemon}>
      <div className="container">
        <div>
          <Search onSubmitted={onSubmit}/>
        </div>
        <div>
          {listOfPokemon && <PokemonListDropdown pokemon={listOfPokemon} getPokemon={onSubmit} />}
          {pokeData && <MainInfo pokeData={pokeData} />}
        </div>
        <div>
        </div>
      </div>
    </pokemonList.Provider>
  );
}

export default App;