import './styles/App.css';
import React, {Component, createContext, useEffect, useState} from "react";
import Search from './Components/search';
import MainInfo from './Components/MainInfo';
import PokemonListDropdown from './Components/PokemonListDropdown';
import { getFetch } from './Utils';

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
      const url = 'https://pokedex-backend-production-b5e4.up.railway.app/api/pokemonGeneration';
      const poke = await getFetch(url);
      console.log(poke)
      await setListOfPokemon(poke);
    })();
  },[])

  async function getData(search) {
		try {
      const url = `https://pokedex-backend-production-b5e4.up.railway.app/api/pokemon/${search}`;
      return await getFetch(url, 'POST');
		} catch (err) {
			console.log('bad',err);
		}
	}

  async function onSubmit(data) {
    const response = await getData(data.toLowerCase());
    console.log(response)
    setPokeData(response);
  }

  return (
    // <pokemonList.Provider value={listOfPokemon}>
      <div className="container">
        <div className='d-flex flex-column'>
          {warning}
          <Search onSubmitted={onSubmit}/>
        </div>
        <div>
          {listOfPokemon && <PokemonListDropdown pokemon={listOfPokemon} getPokemon={onSubmit} />}
          {pokeData && <MainInfo pokeData={pokeData} />}
        </div>
        <div>
        </div>
      </div>
    // </pokemonList.Provider>
  );
}

export default App;