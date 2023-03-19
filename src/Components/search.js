import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function Search(props) {

	const [input,setInput] = useState('');

	function handleChange(e) {
		setInput(e.target.value);
	}

	async function handleClick(e) {
		e.preventDefault();
		console.log(input)
		props.onSubmitted(input);
	}

	return (
		<div>
			<Form className='d-flex'>
				<Form.Control className="m-2" type="search" id="pokeInput" onChange={handleChange} value={input}/>
				<Button className="m-2" variant="primary" type="submit" onClick={handleClick}>Submit</Button>
			</Form>
		</div>
	)
}