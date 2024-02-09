import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Image, Button, Dropdown, Form } from 'react-bootstrap';
import logo from '../img/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../autenticar/AuthProvider';
import '../css/colores.css';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function NavbarUsuario() {
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const history = useNavigate();

    const cerrarSesion = () => {
        logout();
        history('/login');

    };

    return (
        <Navbar className='navbar-dark-text' style={{ fontSize: '15px', color: 'black' }} bg="light" expand="lg" >
            <Container>
                {/* Logo a la izquierda */}
                <Navbar.Brand className='espacioImg'>
                    <Image src={logo} className='rounded-circle' alt="" width="70" height="70" style={{ margin: '-12px' }} />
                </Navbar.Brand>

                {/* Espacio entre elementos */}
                <Nav className="ms-auto me-4">
                    &nbsp;
                </Nav>

                {/* Navegaciones */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto ">
                        <Nav.Link as={Link} to="/" >INICIO</Nav.Link>
                        <Dropdown as={Nav.Item}>
                            <Dropdown.Toggle as={Nav.Link} id="uniformes-dropdown">
                                UNIFORMES
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/productos">FILIPINAS</Dropdown.Item>
                                <Dropdown.Item as={Link} to="#zapatos">CALZADO</Dropdown.Item>
                                <Dropdown.Item as={Link} to="#chalecos">CHALECOS</Dropdown.Item>
                                <Dropdown.Item as={Link} to="#batas">BATAS</Dropdown.Item>
                                <Dropdown.Item as={Link} to="#otros">SACOS</Dropdown.Item>
                                <Dropdown.Item as={Link} to="#otros">PANTALONES</Dropdown.Item>
                                <Dropdown.Item as={Link} to="#otros">SUÉTERES</Dropdown.Item>
                                <Dropdown.Item as={Link} to="#otros">SCRUBS</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                        <Nav.Link as={Link} to="/accesorioss">ACCESORIOS</Nav.Link>
                        {/* <Nav.Link as={Link} to="/prueba">prueba</Nav.Link> */}
                        <Nav.Link as={Link} to="/reservarA">RESERVAR</Nav.Link>
                        <Dropdown as={Nav.Item}>
                            <Dropdown.Toggle as={Nav.Link} id="buscar-dropdown">
                                BUSCAR
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/busquedasimple">Busqueda Simple</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/busquedaAvanzada">Busqueda Avanzada</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/contacto">Contacto</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/ayuda">Ayuda</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/inicioAdmin">Dashboard</Dropdown.Item>
                                
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                    <Nav.Link as={Link} to="/carritoDeCompras" className='fs-5 me-3'> <i className='fa fa-shopping-cart ' style={{ fontSize: '25px' }} ></i></Nav.Link>

                    <Dropdown>
                        {isAuthenticated !== null ? (
                            isAuthenticated ? (
                                <>
                                    <Dropdown.Toggle as={Button} variant="light" id="dropdown-basic">
                                        <i className=''>Bienvenido, {user.nombre} </i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="#perfil"><i className='fa fa-user'></i> PERFIL </Dropdown.Item>
                                        <Dropdown.Item as={Link} to="#compras"><i className="fa fa-shopping-bag"></i> COMPRAS</Dropdown.Item>
                                        <Dropdown.Item className='text-danger' onClick={cerrarSesion}><FontAwesomeIcon icon={faRightFromBracket} /> CERRAR SESIÓN</Dropdown.Item>
                                    </Dropdown.Menu>
                                </>
                            ) : (
                                <>
                                    <Nav className="me-auto">
                                        <Nav.Link as={Link} to="/registroUsuario"> REGISTRO</Nav.Link>
                                        <div className='botonLogin'>
                                            <Link className='color' to="/login">
                                                <button className='btn rounded-pill' id="login-button" >
                                                    INICIAR SESIÓN
                                                </button>
                                            </Link>
                                        </div>
                                    </Nav>
                                </>
                            )
                        ) : null}
                    </Dropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarUsuario;
