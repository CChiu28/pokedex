import React from "react";
import { formatText } from "../Utils";

export default function Stats(props) {
	const stats = props.stats;

	function getStat(stat) {
		return(
			<div className="d-flex justify-content-between m-1" key={stat.stat.name}>
				<span>{formatText(stat.stat.name)}:&nbsp;</span>
				<span className="justify-content-end">{stat.base_stat}</span>
			</div>
		);
	}
	return(
		<div className="border rounded">
			{stats.map(stat => getStat(stat))}
		</div>
	)
}