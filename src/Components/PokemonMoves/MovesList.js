import React from "react";
import { formatText } from "../../Utils";

export default function MovesList({moves, version, lvl}) {

    function getMoveDesc(move) {
        // console.log(move)
        const { flavor_text_entries } = move;
        const desc = flavor_text_entries.find(ele => ele.version_group.name===version&&ele.language.name==='en');
        return desc ? desc.flavor_text : "";
    }

    return(
        <tbody>
            {(lvl!==null&&moves!==null) && moves.map((move,index) => {
                return(
                    <tr key={move.name}>
                        <td>{lvl[index]}</td>
                        <td>{formatText(move.name)}</td>
                        <td>{formatText(move.type.name)}</td>
                        <td>{move.power===0 ? '--' : move.power}</td>
                        <td>{move.pp}</td>
                        <td>{move.accuracy===0 ? 100 : move.accuracy}</td>
                        <td>{move.effect_chance===0 ? '--' : move.effect_chance}</td>
                        <td>{getMoveDesc(move)}</td>
                    </tr>
                )
            })}
        </tbody>
    );
}