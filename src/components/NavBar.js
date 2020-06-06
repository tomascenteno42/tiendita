import React from 'react';

import { Navbar as Navegation, Nav } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../redux/actions/authActions';

export function NavBar({ isAuthenticated, logout }) {

    return (
            <Navegation bg="dark" variant="dark">
                <Navegation.Brand>Tiendita</Navegation.Brand>
                <Nav className="d-flex flex-grow-1">
                    <Nav.Item className="ml-3">
                        <Link to="/" style={{color: 'white'}}>Inicio</Link>
                    </ Nav.Item>
                    {isAuthenticated ? (
                        <>
                            <Nav.Item className="ml-3">
                                <Link to="/products" style={{color: 'white', marginLeft: '10px'}}>Products</Link>
                            </ Nav.Item>
                            <Nav.Item className="ml-auto">
                                <Link to="/" style={{color: 'white', marginLeft: '10px'}} onClick={logout}>Log out</Link>
                            </ Nav.Item>

                            <Nav.Item className="ml-3">
                                <Link to="/products/create" style={{color: 'white', marginLeft: '10px'}}>Add product</Link>
                            </ Nav.Item>

                            <Nav.Item className="ml-3 mr-2">
                                <Link to="/cart" style={{color: 'white' }}>Cart</Link>
                            </ Nav.Item>
                        </>
                    ) : (
                        <>                                                  
                            <Nav.Item className="ml-auto">
                                <Link to="/auth/register" style={{color: 'white', marginLeft: '10px'}}>Register</Link>
                            </ Nav.Item>
                        
                            <Nav.Item className="ml-3">
                                <Link to="/auth/login" style={{color: 'white', marginLeft: '10px'}}>Login</Link>
                            </ Nav.Item>
                        </>
                    )}  
                </Nav>
            </Navegation>
    )
}
const mapStateToPros = (state) => ({
    isAuthenticated: state.auth.isAuthenticated()
});

const mapDispatchToProps = (dispatch) => ({
    logout: bindActionCreators(logout, dispatch)
});

export default connect(mapStateToPros, mapDispatchToProps)(NavBar);