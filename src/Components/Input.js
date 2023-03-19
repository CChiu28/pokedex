import React from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";

export default function Input({handleInput, input}) {

    return(
        <Form onSubmit={handleInput}>
            <Form.Group>
                <FloatingLabel label="Email address" className="m-2">
                    <Form.Control type="email" placeholder="name@example.com" required />
                </FloatingLabel>
                <FloatingLabel label="Password" className="m-2">
                    <Form.Control type="password" placeholder="Password" required />
                </FloatingLabel>
            </Form.Group>
            <Button variant="primary" className="m-2" type="submit">{input}</Button>
        </Form>
    )
}