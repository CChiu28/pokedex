import React from "react";

export default function Stats(props) {
	const stats = props.stats;

	function getStat(stat) {
		return(
			<div className="d-flex justify-content-between m-1" key={stat.stat.name}>
				<span>{stat.stat.name}:&nbsp;</span>
				<span className="justify-content-end">{stat.base_stat}</span>
			</div>
		);
	}
	return(
		<div>
			{stats.map(stat => getStat(stat))}
		</div>
	)
}