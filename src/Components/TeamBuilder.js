import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Button, Container } from "react-bootstrap";
import Team from "./Team";

export default function TeamBuilder(props) {
    const [pokemon,setPokemon] = useState(null);
    const [teams,setTeams] = useState([]);
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        (async () => {
            const poke = await fetch(`https://pokedex-yw3p.onrender.com/api/pokemonGeneration`);
            // const poke = await fetch(`http://localhost:8080/api/pokemonGeneration`);
            const data = await poke.json();
            await setPokemon(data);
        })();
        onAuthStateChanged(auth, (user) => {
            user ? setUser(user) : setUser(null);
        })
    },[])

    useEffect(() => {
        if (user&&pokemon) {
            // const url = `http://localhost:8080/api/getTeams/${user.uid}`;
            const url = `https://pokedex-yw3p.onrender.com/api/getTeams/${user.uid}`;
            getTeams(url);
        } else setTeams([]);
    },[user,pokemon])

    function DeleteFromDatabase(index) {
        // const url = `http://localhost:8080/api/deleteTeam/${user.uid}/${index}`;
        const url = `https://pokedex-yw3p.onrender.com/api/deleteTeam/${user.uid}/${index}`;
        getTeams(url);
    }

    function addNewTeam() {
        console.log(teams.length)
        setTeams([...teams,<Team key={Math.random()} index={teams.length} pokemon={pokemon} DeleteFromDatabase={DeleteFromDatabase}/>]);
    }

    async function getTeams(url) {
        const teamDB = [];
        const res = await fetch(url);
        const data = await res.json();
        data.pokemon.forEach((team,i) => {
            teamDB.push(<Team key={Math.random()} uniqueId={data.id.timestamp} index={teams.length+i} pokemon={pokemon} pokemonDB={team} DeleteFromDatabase={DeleteFromDatabase} />);
        }
        );
        setTeams([...teams,...teamDB]);
    }

    return(
        <Container>
            <div className="d-flex justify-content-center">The backend is currently hosted on Render. It may require a small amount of time for it to spin up and retrieve data properly.</div>
            <Button variant="primary" onClick={addNewTeam}>New Team</Button>
            {pokemon && teams}
        </Container>
    )
}