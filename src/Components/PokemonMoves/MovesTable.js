import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import MovesList from "./MovesList";
import Pokedex from "pokedex-promise-v2";
import { formatText, getFetch } from "../../Utils";

export default function MovesTable(props) {
    const version = props.ver;
    const moveData = props.moves;
    const pokeDex = new Pokedex();
    const [moves,setMoves] = useState([]);
    const [lvl,setLvl] = useState([]);

    useEffect(() => {
        const list = getMovesForVersion(version);
        sortData(list);
        getLvlFromMoves(list);
        const stringifyList = JSON.stringify(list);
        const url = 'https://pokedex-backend-production-b5e4.up.railway.app/api/pokemon/moves';
        getFetch(url,'POST',stringifyList)
            .then(data => setMoves(data))
            .catch(err => console.log(`bad moves fetch: ${err}`));
    },[props.moves])

    function getMovesForVersion(version) {
        const data = moveData.filter(move => {
            return move.version_group_details.find(ele => ele.version_group.name === version.name)
        })
        const moves = getMovesByLevel(data,version.name);
        return moves;
	}

	function getMovesByLevel(moves,name) {
		const data = moves.filter(move => {
			return move.version_group_details.find(ele =>
				{ return(ele.version_group.name === name && ele.move_learn_method.name === 'level-up')}
			)
		})
		return data;
	}
    function sortData(list) {
        list.sort((a,b) => {
            let lvla, lvlb;
            a.version_group_details.forEach((ele) => {
                if (ele.version_group.name===version.name&&ele.move_learn_method.name ==='level-up')
                    lvla = ele.level_learned_at;
            })
            b.version_group_details.forEach((ele) => {
                if (ele.version_group.name===version.name&&ele.move_learn_method.name ==='level-up')
                    lvlb = ele.level_learned_at;
            })
            if (lvla<=lvlb)
                return -1;
        })
        // console.log(list)
    }

    function getLvlFromMoves(list) {
        const lvls = list.map((move) => {
            let lvlat;
            move.version_group_details.forEach((ele) => {
                if (ele.version_group.name===version.name&&ele.move_learn_method.name ==='level-up')
                    lvlat = ele.level_learned_at;
            })
            return lvlat;
        })
        setLvl(lvls);
    }

    return(
        <Table bordered hover responsive>
            <thead>
                <tr>
                    <th>{formatText(version.name)}</th>
                    <th>Move</th>
                    <th>Type</th>
                    <th>Power</th>
                    <th>PP</th>
                    <th>Accuracy</th>
                    <th>Effect %</th>
                    <th>description</th>
                </tr>
            </thead>
            <MovesList version={version.name} lvl={lvl} moves={moves} />
        </Table>
    )
}