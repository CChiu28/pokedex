import React, { useEffect, useState, useRef } from "react";
import MovesTable from "./MovesTable";
import Pokedex from "pokedex-promise-v2";

export default function VersionsList(props) {
	const pokeDex = new Pokedex();
	const moves = props.moves;
	const moveData = props.moveInfo;
	const genRef = useRef([]);
	const [versions,setVersion] = useState();


	useEffect(() => {
		async function getData() {
			genRef.current = await pokeDex.getGenerationByName(props.tab);
			const ver = getVersionsFromGeneration(genRef.current);
			setVersion(ver);
		}
		getData();
	},[])

	function getVersionsFromGeneration(version) {
		const { version_groups } = version;
		return version_groups;
	}
	
	function displayVersions(version) {
		return (version.map((ver) =>
			<MovesTable key={ver.name} ver={ver} moves={moves} moveInfo={moveData}/>
		)
		)
	}

	return(
		<>
			{(versions) && displayVersions(versions)}
		</>
	)
}