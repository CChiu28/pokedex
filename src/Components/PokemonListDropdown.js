import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PokemonList from './PokemonList';

export default function PokemonListDropdown({pokemon, getPokemon}) {
    const gens = ['Gen I','Gen II','Gen III','Gen IV','Gen V', 'Gen VI', 'Gen VII', 'Gen VIII'];

    return(
        <>
            <Row>
                {/* <Col className="d-flex justify-content-center">
                    <PokemonList pokemon={pokemon} getPokemon={getPokemon} gen="Gen I"/>
                </Col>
                <Col className="d-flex justify-content-center">    
                    <PokemonList pokemon={pokemon} getPokemon={getPokemon} gen="Gen II"/>
                </Col>
                <Col className="d-flex justify-content-center">
                    <PokemonList pokemon={pokemon} getPokemon={getPokemon} gen="Gen III"/>
                </Col>
                <Col className="d-flex justify-content-center">
                    <PokemonList pokemon={pokemon} getPokemon={getPokemon} gen="Gen IV"/>
                </Col>
                <Col className="d-flex justify-content-center">
                    <PokemonList pokemon={pokemon} getPokemon={getPokemon} gen="Gen V"/>
                </Col>
                <Col className="d-flex justify-content-center">
                    <PokemonList pokemon={pokemon} getPokemon={getPokemon} gen="Gen VI"/>
                </Col>
                <Col className="d-flex justify-content-center">
                    <PokemonList pokemon={pokemon} getPokemon={getPokemon} gen="Gen VII"/>
                </Col>
                <Col className="d-flex justify-content-center">
                    <PokemonList pokemon={pokemon} getPokemon={getPokemon} gen="Gen VIII"/>
                </Col> */}
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