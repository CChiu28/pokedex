import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import VersionsList from "./VersionsList";

export default function MovesPane(props) {
	const moves = props.moves;
	const moveInfo = props.moveInfo;
	const [movesInfo,setMoveInfo] = useState(null);

	useEffect(() => {
		console.log(props)
		setMoveInfo(moveInfo);
	},[props.moves])

	// switch (gen) {
	// 	case "Gen I":
	// 		return [0,151];
	// 	case "Gen II":
	// 		return [151,251];
	// 	case "Gen III":
	// 		return [251,386];
	// 	case "Gen IV":
	// 		return [386,493];
	// 	case "Gen V":
	// 		return [493,649];
	// 	case "Gen VI":
	// 		return [649,721];
	// 	case "Gen VII":
	// 		return [721,809];
	// 	case "Gen VIII":
	// 		return [809,905];
	// 	default:
	// 		return [0,0];
	// }
	
	return(
		<div className="border rounded p-1 m-1">
			<Tabs defaultActiveKey="gen1" justify>
				<Tab eventKey="gen1" title="Gen I">
					<VersionsList moves={moves} moveInfo={movesInfo} tab="generation-i"/>
				</Tab>
				<Tab eventKey="gen2" title="Gen II">
					<VersionsList moves={moves} moveInfo={movesInfo} tab="generation-ii"/>
				</Tab>
				<Tab eventKey="gen3" title="Gen III">
					<VersionsList moves={moves} moveInfo={movesInfo} tab="generation-iii"/>
				</Tab>
				<Tab eventKey="gen4" title="Gen IV">
					<VersionsList moves={moves} moveInfo={movesInfo} tab="generation-iv"/>
				</Tab>
				<Tab eventKey="gen5" title="Gen V">
					<VersionsList moves={moves} moveInfo={movesInfo} tab="generation-v"/>
				</Tab>
				<Tab eventKey="gen6" title="Gen VI">
					<VersionsList moves={moves} moveInfo={movesInfo} tab="generation-vi"/>
				</Tab>
				<Tab eventKey="gen7" title="Gen VII">
					<VersionsList moves={moves} moveInfo={movesInfo} tab="generation-vii"/>
				</Tab>
			</Tabs>
		</div>
	)
}