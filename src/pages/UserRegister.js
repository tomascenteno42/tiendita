import React, { useState } from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { registerAction } from "../redux/actions/authActions";

import { useHistory } from "react-router-dom";

export const UserRegister = ({ register }) => {

    let history = useHistory();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
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
        register(formData)
            .then(() => {
                console.log("TODO OKEY")
            }).catch((error) => {
                console.log(error)
            });
        history.push("/products");
    }


    return(
        <div className="d-flex" style={{height: `calc(100vh - 57px)`}}>
            <Form onSubmit={handleSubmit} className="mx-auto my-auto " style={{width: '30%'}} >
                    
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" name="username" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
            
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
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
    isAuthenticated: state.auth.isAuthenticated()

})

const mapDispatchToProps = (dispatch) => {
    return {
        register: bindActionCreators(registerAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
