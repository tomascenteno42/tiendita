import React from 'react';

import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import { MDBIcon } from 'mdbreact';


export const Product = (props) => {
    
    return (
        <Card>
            <Card.Body>
                <Card.Title className="d-flex">{ props.product.name } <span className="text-right font-weight-bold ml-auto">{ props.product.price }$</span> </Card.Title>

                <Card.Text className="d-flex mt-4">
                    <Link to={`/products/${props.product.id}`}>+ info</Link>
                    <Card.Link className="ml-auto" onClick={ props.addProductToCart }><MDBIcon icon="cart-plus" size="lg"/></Card.Link>
                </Card.Text>
            </Card.Body>
        </Card>
    )

}
export default Product;