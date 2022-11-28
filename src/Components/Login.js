import React, { useState } from "react";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Modal, Button, Form, FloatingLabel, Tabs, Tab } from "react-bootstrap";

export default function Login(props) {
    const [input,setInput] = useState({
        email: '',
        password: ''
    });
    const auth = getAuth();

    async function handleLogin(e) {
        e.preventDefault();
        // console.log(e);
        const info = await signInWithEmailAndPassword(auth,e.target[0].value,e.target[1].value);
    }

    function handleRegister(e) {
        createUserWithEmailAndPassword(auth,e.target[0].value,e.target[1].value).then(user => console.log(user));
    }

    return(
        <Modal show={props.show} onHide={props.setModal}>
            <Modal.Header closeButton>Login</Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey='login' fill>
                    <Tab eventKey='register' title='Register'>
                        <Form onSubmit={handleRegister}>
                            <Form.Group>
                                <FloatingLabel label="Email address">
                                    <Form.Control type="email" placeholder="name@example.com" required />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group>
                                <FloatingLabel label="Password">
                                    <Form.Control type="password" placeholder="Password" required />
                                </FloatingLabel>
                            </Form.Group>
                            <Button variant="primary" type="submit">Register</Button>
                        </Form>
                    </Tab>
                    <Tab eventKey="login" title='Login'>
                        <Form onSubmit={handleLogin}>
                            <Form.Group>
                                <FloatingLabel label="Email address">
                                    <Form.Control type="email" placeholder="name@example.com" required />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group>
                                <FloatingLabel label="Password">
                                    <Form.Control type="password" placeholder="Password" required />
                                </FloatingLabel>
                            </Form.Group>
                            <Button variant="primary" type="submit">Login</Button>
                        </Form>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.setModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}