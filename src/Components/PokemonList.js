import React, { useCallback, useEffect, useState } from "react";
import '../styles/PokemonList.css'
import { Dropdown, DropdownButton } from "react-bootstrap";
import { formatText } from "../Utils";

export default function PokemonList({ pokemon, gen, getPokemon }) {
    // const gen = props.gen;
    const [list,setList] = useState([]);

    useEffect(() => {
        const pokemonList = pokemon.results;
        const offset = getOffsetLimitByGeneration(gen);
        setList(pokemonList.slice(offset[0],offset[1]));
    },[])

    function getOffsetLimitByGeneration(gen) {
        switch (gen) {
            case "Gen I":
                return [0,151];
            case "Gen II":
                return [151,251];
            case "Gen III":
                return [251,386];
            case "Gen IV":
                return [386,493];
            case "Gen V":
                return [493,649];
            case "Gen VI":
                return [649,721];
            case "Gen VII":
                return [721,809];
            case "Gen VIII":
                return [809,905];
            default:
                return [0,0];
        }
    }

    const handleClick = useCallback(e => {
        getPokemon(e.target.textContent);
    },[])

    return(
        <>
            <DropdownButton id="dropdown" title={gen}>
                {list.map(poke => {
                    return (
                        <Dropdown.Item key={poke.name} onClick={handleClick}>{formatText(poke.name)}</Dropdown.Item>
                    )
                })}
            </DropdownButton>
        </>
    );
}