import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function Search(props) {

	const [input,setInput] = useState('');

	async function getData(search) {
		try {
			let poke = await fetch(`http://localhost:8080/api/pokemon/${search}`, {
				method: "POST",
				headers: {
					"Content-type":"application/json charset=UTF-8",
					'Accept': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			});
			return await poke.json();
		} catch (err) {
			console.log('bad',err);
		}
	}

	function handleChange(e) {
		setInput(e.target.value);
	}

	async function handleClick(e) {
		e.preventDefault();
		console.log(input)
		let response = await getData(input.toLowerCase());
		console.log(response);
		props.onSubmitted(response);
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