import React, { useState, useEffect } from "react";
import { Card, Col } from "react-bootstrap";
import { formatText } from "../Utils";

export default function TeamPokemon({ poke, deletePoke }) {
    const [pokemon,setPokemon] = useState(null);

    useEffect(() => {
        if (poke) {
            setPokemon(poke);
        }
    },[poke])

    function deletePokemon() {
        if (pokemon) {
            deletePoke(pokemon);
            // setHasPokemon(false);
            setPokemon(null);
        }
    }

    return(
        <>
            <Col>
                <Card className="w-auto m-2" onClick={deletePokemon}>
                    <Card.Img src={pokemon ? pokemon.sprites.front_default : require("../resources/pokemon-egg.png")} />
                    <Card.Title className="text-center">{pokemon ? formatText(pokemon.name) : ''}</Card.Title>
                </Card>
            </Col>
        </>
    )
}