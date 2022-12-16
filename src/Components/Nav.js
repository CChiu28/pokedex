import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Login from "./Login";

export default function NavBar(props) {
    const auth = getAuth();
    const [userHeader,setUser] = useState('');
    const [openModal,setOpenModal] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user)
                setUser(user.email)
            else setUser('');
        })
    },[])

    const handleClose = () => setOpenModal(false);

    function logOut() {
        signOut(auth);
    }

    return(
        <Navbar bg='light'>
            <Container>
                <Navbar.Brand>Pokedex</Navbar.Brand>
                <Navbar.Text>{userHeader}</Navbar.Text>
                <Nav>
                    <Link className="m-1 align-self-center" to='/'>Search</Link>
                    <Link className="m-1 align-self-center" to='/teambuilder'>Team Builder</Link>
                    <Nav.Item className="m-1">
                    {userHeader!=='' ? <Button variant="primary" onClick={logOut}>Logout</Button>
                        : <Nav.Link onClick={() => setOpenModal(true)}>Login</Nav.Link>}
                    </Nav.Item>
                </Nav>
                <Login show={openModal} setModal={handleClose} getLogin={props.getLogin} />
            </Container>
        </Navbar>
    );
}