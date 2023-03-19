import './styles/App.css';
import React, {Component, createContext, useEffect, useState} from "react";
import Search from './Components/search';
import MainInfo from './Components/MainInfo';
import PokemonListDropdown from './Components/PokemonListDropdown';

function App() {
  const [pokeData,setPokeData] = useState();
  const [listOfPokemon,setListOfPokemon] = useState();
  const pokemonList = createContext();
  const warning = <p className='m-auto py-1'>The backend is currently hosted on Render. It may require a small amount of time for it to spin up and retrieve data properly.</p>;
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
        <div className='d-flex flex-column'>
          {warning}
          <Search onSubmitted={this.onSubmit}/>
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