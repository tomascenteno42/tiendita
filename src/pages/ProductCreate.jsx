import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { newProduct } from '../redux/actions/productAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';



function ProductCreate({ newProduct }) {

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
    
        <div className="d-flex align-items-center justify-content-center" style={{height: "80%"}}>
            <Form onSubmit={handleSubmit} style={{width: '30%'}} >
                <Form.Group controlId="formGroupName">
                        <Form.Label>Product name: </Form.Label>
                        <Form.Control type="text" placeholder="Ej: Botines nike F-150" onChange={handleChange} value={product.name} name="name" />
                        <small id="productHelpBlock" className="form-text text-muted">
                            Make sure to include usefull information.
                        </small>
                </Form.Group>

                <Form.Group controlId="formGroupPrice">
                        <Form.Label>Price: </Form.Label>
                        <Form.Control type="number" className="currency" placeholder="$$$" onChange={handleChange} value={product.price} name="price" />
                </Form.Group>
                <Button variant="dark" type="submit" className="m-0">Submit</Button>
            </Form>
        </div>
    )

};

const mapDispatchToProps = (dispatch) => ({
    newProduct: bindActionCreators(newProduct, dispatch)
})

export default connect(null, mapDispatchToProps)(ProductCreate);