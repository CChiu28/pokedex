import React from "react";

export default function MovesList(props) {
    const moves = props.moves;
    const version = props.version;
    const lvl = props.lvl

    function getMoveDesc(move) {
        const { effect_entries, flavor_text_entries } = move;
        const desc = flavor_text_entries.find(ele =>
            ele.version_group.name===version ? ele : effect_entries[0]
        )
        return desc.flavor_text;
    }

    return(
        <tbody>
            {(lvl!==null&&moves!==null) && moves.map((move,index) => {
                return(
                    <tr key={move.name}>
                        <td>{lvl[index]}</td>
                        <td>{move.name}</td>
                        <td>{move.type.name}</td>
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