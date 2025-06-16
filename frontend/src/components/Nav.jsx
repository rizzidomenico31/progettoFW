import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "./UserContext.jsx";
import {MDBBtn} from "mdb-react-ui-kit";
const API_URL = import.meta.env.VITE_API_URL;


function MyNavBar() {
    const navigate = useNavigate();
    const {user , setUser} = useContext(UserContext);


    const  handelLogOut = async () => {
        try {
            const res = await fetch(`${API_URL}/auth/logout`, {
                method: 'GET',
                credentials: 'include',
            });


           if (res.ok) setUser(null);
        } catch (error) {
            console.error( 'Logout error:', error);
        }
    }
    return (
        <Navbar expand="lg" className="lg-body-tertiary fixed-top navbar-light bg-light">
            <Container>
                <Navbar.Brand href="#home">PUGLIATOUR</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                        <Nav.Link href="/allTours">Tour</Nav.Link>
                        {user ? (
                        <NavDropdown title="Account" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Profilo</NavDropdown.Item>
                            <NavDropdown.Item href="/reset">
                                Reset Password
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Storico Ordini</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Assistenza
                            </NavDropdown.Item>
                        </NavDropdown>

                        ):(<></>) }
                    </Nav>


                </Navbar.Collapse>
                { user ? (
                    <>
                        <Nav className="mx-4">
                        {user.email}
                        </Nav>
                        <Nav className="ms-auto">
                            <Button onClick={handelLogOut} variant="outline-dark" className="mr-1 hover-dark">
                                Logout
                            </Button>
                        </Nav>
                    </>
                    ) : (
                        <>
                <Nav className="mx-4">
                    <MDBBtn onClick={() => navigate("/login")} variant="outline-dark" color="dark"  rounded>
                        Login
                    </MDBBtn>
                </Nav>
                <Nav className="ms-auto">
                    <MDBBtn onClick={() => navigate("/register")}  className="mr-1" rounded color="danger">  {/*danger = colore rosso*/}
                        Register
                    </MDBBtn>
                </Nav>
                 </>
                )}
            </Container>
        </Navbar>
    );
}

export default MyNavBar;