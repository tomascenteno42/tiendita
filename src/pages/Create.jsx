import React, { Component, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { newProduct, fetchProducts } from '../redux/actions/productAction';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Products from './Products';



function Create(props) {
    const [name, setName] = useState();
    const [price, setPrice] = useState();

    const dispatch = useDispatch();


    const handleChange = (event) => {
        if(event.target.name === 'name') {
            setName(event.target.value);
        } else {
            setPrice(event.target.value);
        }  
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        dispatch(newProduct({ name, price }))
            .then(() => {
                alert(`${name} uploaded succesfully`);
            }).catch(() => {
                alert("There is an error with your data");
            })
    }
    
    return(
        <>
        <div className="d-flex" style={{height: `calc(100vh - 57px)`}}>
            <Form onSubmit={handleSubmit} className="mx-auto my-auto " style={{width: '30%'}} >
                <Form.Group controlId="formGroupName">
                        <Form.Label>Product name: </Form.Label>
                        <Form.Control type="text" placeholder="Ej: Botines nike F-150" onChange={handleChange} value={name} name="name" />
                        <small id="productHelpBlock" className="form-text text-muted">
                            Make sure to include usefull information.
                        </small>
                </Form.Group>

                <Form.Group controlId="formGroupPrice">
                        <Form.Label>Price: </Form.Label>
                        <Form.Control type="number" className="currency" onChange={handleChange} value={price} name="price" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        </>
    )

};

const mapStateToProps = (state) => ({
    products: state.products
})

export default connect(mapStateToProps)(Create);