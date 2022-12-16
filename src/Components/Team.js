import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState, useRef, useEffect } from "react";
import { Button, Col, Row, ToastContainer, Toast } from "react-bootstrap";
import { getTypeStrengthAndWeakness } from "../Utils";
import PokemonList from "./PokemonList";
import TeamPokemon from "./TeamPokemon";
import Types from "./Types";

export default function Team({ pokemon, pokemonDB, index, uniqueId, DeleteFromDatabase }) {
    const auth = getAuth();
    const userId = useRef('');
    const teamOfPokemon = useRef([]);
    const types = useRef({});
    const [team,setTeam] = useState([]);
    const gens = ['Gen I','Gen II','Gen III','Gen IV','Gen V','Gen VI','Gen VII','Gen VIII'];
    const [showFullToast,setFullToast] = useState(false);
    const [showSavedToast,setSavedToast] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                userId.current = user.uid;
                if (pokemonDB) {
                    pokemonDB.forEach(poke => getTeamWeakness(poke))
                    teamOfPokemon.current = pokemonDB;
                    setTeam(teamOfPokemon.current);
                }
            } else userId.current = '';
        })
    },[])

    async function getPokemon(poke) {
        if (teamOfPokemon.current.length<6||teamOfPokemon.current.includes(null)) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${poke.toLowerCase()}`)
                .then(res => res.json())
                .then(data => {
                    const pokemon = {
                        name: data.name,
                        types: data.types,
                        sprites: data.sprites
                    }
                    if (teamOfPokemon.current.includes(null)) {
                        const index = teamOfPokemon.current.indexOf(null);
                        teamOfPokemon.current[index] = pokemon;
                    } else teamOfPokemon.current.push(pokemon);
                    getTeamWeakness(pokemon);
                    setTeam([...teamOfPokemon.current]);
                })
                .catch(err => console.err(`bad pokeapi fetch: ${err}`));
        } else {
            console.log("Full team");
            setFullToast(!showFullToast);
        }
    }

    function getTeamWeakness(poke) {
        let weak = {};
        poke.types.forEach(el => {
            getPokemonWeakness(weak,el);
        })
        Object.entries(weak).forEach(([k,v]) => {
            if (v>1) {
                types.current[k] ? types.current[k] += 1 : types.current[k] = 1;
            }
        })
    }

    function getPokemonWeakness(weak,el) {
        const weakness = getTypeStrengthAndWeakness(el.type.name)
        Object.entries(weakness).forEach(([key,val]) => {
            switch (key) {
                case 'vulnerable':
                    val.forEach(i => weak[i] ? weak[i]*=2 : weak[i]=2);
                    break;
                case 'resist':
                    val.forEach(i => weak[i] ? weak[i]*=0.5 : weak[i]=0.5);
                    break;
                case 'zero':
                    val.forEach(i => weak[i] = 0);
                    break;
                default:
                    break;
            }
        })
    }

    function saveToDatabase() {
        if (auth.currentUser) {
            const obj = {
                id: userId.current,
                index: index,
                uniqueId: uniqueId ? uniqueId : null,
                pokemon: team
            }
            fetch('https://pokedex-yw3p.onrender.com/api/registerTeam', {
                method: 'POST',
                headers: {
                    "Content-type":"application/json",
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(obj)
            })
            .then(setSavedToast(!showSavedToast))
            .catch(err => console.err(`bad register: ${err}`));
        } else console.log('not signed in')
    }

    function deletePoke(name) {
        const index = teamOfPokemon.current.indexOf(name);
        teamOfPokemon.current[index] = null;
        name.types.forEach(type => {
            const weak = {}
            getPokemonWeakness(weak,type);
            Object.entries(weak).forEach(([k,v]) => {
                if (v>1)
                    types.current[k] ? types.current[k] -= 1 : types.current[k] = ''
            })
        })
        setTeam([...teamOfPokemon.current]);
    }

    function deleteDB() {
        DeleteFromDatabase(index);
    }

    return(
        <div className="border rounded p-1 m-3">
            <ToastContainer>
                <Toast className="d-flex p-2 justify-content-center" bg="info" onClose={() => setFullToast(!showFullToast)} show={showFullToast} delay={1500} autohide>
                    <p className="m-auto">This team is full!</p>
                </Toast>
                <Toast className="d-flex p-2 justify-content-center" bg="info" onClose={() => setSavedToast(!showSavedToast)} show={showSavedToast} delay={1500} autohide>
                    <p className="m-auto">Team saved!</p>
                </Toast>
            </ToastContainer>
            <Row>
                {gens.map((gen,index) => 
                    <Col className="d-flex justify-content-center" key={index}>
                        <PokemonList pokemon={pokemon} getPokemon={getPokemon} gen={gen} />
                    </Col>
                )}
            </Row>
            <Row>
                <TeamPokemon poke={team[0] ? team[0] : null} deletePoke={deletePoke}/>
                <TeamPokemon poke={team[1] ? team[1] : null} deletePoke={deletePoke}/>
                <TeamPokemon poke={team[2] ? team[2] : null} deletePoke={deletePoke}/>
                <TeamPokemon poke={team[3] ? team[3] : null} deletePoke={deletePoke}/>
                <TeamPokemon poke={team[4] ? team[4] : null} deletePoke={deletePoke}/>
                <TeamPokemon poke={team[5] ? team[5] : null} deletePoke={deletePoke}/>
            </Row>
            <Types weakness={types.current}/>
            <Row>
                {auth.currentUser 
                    ? <div className="m-1">
                        <Button variant="primary" onClick={saveToDatabase}>Save</Button>
                        <Button variant="primary" onClick={deleteDB}>Delete</Button>
                    </div>
                    : <span className="m-1">Sign in to save your teams!</span>}
            </Row>
        </div>
    )
}