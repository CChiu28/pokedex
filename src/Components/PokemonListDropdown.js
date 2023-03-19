import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PokemonList from './PokemonList';

export default function PokemonListDropdown({pokemon, getPokemon}) {
    const gens = ['Gen I','Gen II','Gen III','Gen IV','Gen V', 'Gen VI', 'Gen VII', 'Gen VIII'];

    return(
        <>
            <Row>
                {gens.map((gen,index) => {
                    return(
                        <Col className="d-flex justify-content-center" key={index}>
                            <PokemonList pokemon={pokemon} getPokemon={getPokemon} gen={gen}/>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}