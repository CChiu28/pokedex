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
      const poke = await fetch(`https://pokedex-yw3p.onrender.com/api/pokemonGeneration`);
      // const poke = await fetch(`http://localhost:8080/api/pokemonGeneration`);
      const data = await poke.json();
      await setListOfPokemon(data);
    })();
  },[])

  async function getData(search) {
		try {
			let poke = await fetch(`https://pokedex-yw3p.onrender.com/api/pokemon/${search}`, {
			// let poke = await fetch(`http://localhost:8080/api/pokemon/${search}`, {
				method: "POST",
				headers: {
					"Content-type":"application/json charset=UTF-8",
					'Accept': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			});
			return await poke.json();
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