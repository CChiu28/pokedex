import React from "react";
import { Card } from "react-bootstrap";
import { formatText } from "../Utils";
import MovesPane from "./PokemonMoves/MovesPane";
import Stats from "./Stats";

export default function MainInfo(props) {
	// const { pokemon } = props.pokeData;
	const { id, name, abilities, stats, types, moves, sprites } = props.pokeData;

	return(
		<>
			<div className="d-flex m-1">
				<Card>
					<Card.Title className="display-6">{formatText(name)}</Card.Title>
					<Card.Body className="d-flex">
						<div className="border rounded me-2">
							<img src={sprites.front_default} />
							<img src={sprites.front_shiny} />
							<div className="d-flex justify-content-around align-items-center">
								Types: {types.map(type => <span className="m-1" key={type.slot}>{formatText(type.type.name)}</span>)}
							</div>
							<div className="d-flex justify-content-around align-items-center">
								Abilities: {abilities.map(ability => <span className="m-1"key={ability.slot}>{formatText(ability.ability.name)}</span>)}
							</div>
						</div>
						<Stats stats={stats}/>
					</Card.Body>
				</Card>
			</div>
			<MovesPane moves={moves} id={id} />
		</>
	);
}