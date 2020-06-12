import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCartProducts } from '../redux/actions/cartActions';
import { updateProduct } from '../redux/actions/cartActions';

export const Cart = ({ userId, fetchCart, products, updateProduct }) => {

    useEffect(() => {
        fetchCart(userId);
    }, []);

    const _handleSubmit = (e,product_id, cantidad) => {
        console.log(quantity);
        // updateProduct(userId, product_id, quantity);
    }

    if(products.length === 0) {
        return null;
    } else {
        return(
            <div style={{marginLeft: '5rem'}}>
                {products.map((product) => (
                    <Card style={{ width: '18rem' }}  className="w-auto m-auto" key={product.id}>
                        <Card.Body>
                            <Card.Title>{ product.name } <p className="text-right font-weight-bold">{ product.price }$</p></Card.Title>
                            <div>
                                <Link to={`/products/${product.id}`}>+ info</Link>
                                <Button variant="dark" onClick={(e) => _handleSubmit(e, product.id, product.quantity)}>+</Button>
                                <span>{product.quantity}</span>
                                <Button variant="dark">Dark</Button>
                            </div>
                            
                        </Card.Body>
                    </Card>
                    ))}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userId: state.auth.user.id,
    products: state.cart.data
});

const mapDispatchToProps = (dispatch) => ({
    fetchCart: bindActionCreators(fetchCartProducts, dispatch),
    updateProduct: bindActionCreators(updateProduct, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart) ;