import React, { useState } from "react";
import StyledFirebaseAuth from "./StyledFirebaseAuth.tsx";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseui from "firebaseui";
import { Modal, Button, Form, FloatingLabel, Tabs, Tab } from "react-bootstrap";

export default function Login(props) {
    const [input,setInput] = useState({
        email: '',
        password: ''
    });
    const auth = getAuth();

    // const uiConfig = {
    //     signInFlow: 'popup',
    //     signInOptions: [
    //         firebase.auth.EmailAuthProvider.PROVIDER_ID
    //     ],
    //     callbacks: {
    //         signInSuccessWithAuthResult: () => false,
    //     }
    // }

    async function handleLogin(e) {
        e.preventDefault();
        // console.log(e);
        const info = await signInWithEmailAndPassword(auth,e.target[0].value,e.target[1].value);
        // console.log(info.user.accessToken)
        // props.getLogin({
        //     email: e.target[0].value,
        //     password: e.target[1].value,
        //     jwt: info.user.accessToken
        // });
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
                {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.setModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}