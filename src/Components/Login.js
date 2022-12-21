import React from "react";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Modal, Button, Tabs, Tab } from "react-bootstrap";
import Input from "./Input";

export default function Login(props) {
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
            <Modal.Header closeButton>Register/Login</Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey='login' fill className="d-flex flex-row">
                    <Tab eventKey='register' title='Register'>
                        <Input handleInput={handleRegister} input={"Register"} />
                    </Tab>
                    <Tab eventKey="login" title='Login'>
                        <Input handleInput={handleLogin} input={"Login"} />
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.setModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}