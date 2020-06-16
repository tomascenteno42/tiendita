import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loginAction } from "../redux/actions/authActions";




export const UserLogin = ({ login, isAuthenticated }) => {

    const history = useHistory();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })    
        
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        login(formData);
        history.push("/products");
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
                <Button variant="dark" className="m-0" type="submit">Submit</Button>
            </Form>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated()

});

const mapDispatchToProps = (dispatch) => ({
    login: bindActionCreators(loginAction, dispatch),

})
export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
