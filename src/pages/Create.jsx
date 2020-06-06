import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { newProduct } from '../redux/actions/productAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';



function Create({ newProduct }) {

    const history = useHistory();

    const [product, setProduct] = useState({
        name: '',
        price: ''
    });

    const handleChange = (event) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        newProduct(product)
            .then(() => {
                alert(`${product.name} uploaded succesfully`);
                history.push("/products");
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
                        <Form.Control type="text" placeholder="Ej: Botines nike F-150" onChange={handleChange} value={product.name} name="name" />
                        <small id="productHelpBlock" className="form-text text-muted">
                            Make sure to include usefull information.
                        </small>
                </Form.Group>

                <Form.Group controlId="formGroupPrice">
                        <Form.Label>Price: </Form.Label>
                        <Form.Control type="number" className="currency" onChange={handleChange} value={product.price} name="price" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        </>
    )

};

const mapDispatchToProps = (dispatch) => ({
    newProduct: bindActionCreators(newProduct, dispatch)
})

export default connect(null, mapDispatchToProps)(Create);