import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginAction } from "../redux/actions/authActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";



export const UserLogin = ({ login, auth }) => {

    const authenticated = auth.token !== null && auth.user;

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    // useEffect(() => {

    // }, [])

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })    
        
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        login(formData);
    }

    return(
        <div className="d-flex" style={{height: `calc(100vh - 57px)`}}>
            <Form onSubmit={handleSubmit} className="mx-auto my-auto " style={{width: '30%'}} >
                
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" value={formData.username} name="username" onChange={handleChange} />
                </Form.Group>
            
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={formData.password} name="password" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    login: bindActionCreators(loginAction, dispatch),

})
export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
