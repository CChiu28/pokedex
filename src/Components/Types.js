import React, { useState } from "react";
import { Button, Collapse, Table } from "react-bootstrap";
import { formatText } from "../Utils";

export default function Types({ weakness }) {
    const TYPES = ['normal','water','fire','electric','grass','rock','ground','ice','poison','psychic','bug','ghost','fighting','flying','dragon','steel','dark','fairy'];
    const [open,setOpen] = useState(false);

    return(
        <>
            <Button onClick={() => setOpen(!open)}>See weaknesses</Button>
            <Collapse in={open}>
                <div>
                    <Table bordered striped='columns' size='sm' responsive>
                        <thead>
                            <tr>
                                {TYPES.map(type => <th key={type}>{formatText(type)}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {TYPES.map((type,i) => {
                                    if (weakness[type]) {
                                        return <th key={i}>{weakness[type]}</th>
                                    } else return<th key={i}></th>
                                })}
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Collapse>
        </>
    )
}