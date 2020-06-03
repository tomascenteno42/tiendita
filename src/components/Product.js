import React, { Component, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { MDBIcon } from 'mdbreact';
import {Link} from 'react-router-dom';
export const Product = (props) => {
    
    return (
        <Card>
            <Card.Body>
                <Card.Title>{ props.product.name } <p className="text-right font-weight-bold">{ props.product.price }$</p></Card.Title>
                <Link to={`/products/${props.product.id}`}>+ info</Link>
                <Card.Link onClick={ props.addProductToCart }><MDBIcon icon="cart-plus"  /></Card.Link>
            </Card.Body>
        </Card>
    )

}
export default Product;