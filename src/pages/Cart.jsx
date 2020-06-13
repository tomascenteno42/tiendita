import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCartProducts } from '../redux/actions/cartActions';
import { updateProduct } from '../redux/actions/cartActions';

export const Cart = ({ userId, fetchCart, products, updateProduct, isFetching }) => {

    useEffect(() => {
        fetchCart(userId);
    }, []);

    const _handleSubmit = ( product_id ) => {
        const product = products.filter(x => x.id === product_id)[0];
        product.quantity +=1;
        updateProduct(userId, product.id, product.quantity);
    }
    if(isFetching) {
        return <div>Loading...</div>
    } else {
        if(products.length === 0) {
            return <div>There are no products in your cart!</div>;
        } else {
            return(
                <>
                    <div className=" bg-warning h-100">
                        <Row className="mr-0 h-100">
                            <Col lg={9} className="ml-5 mt-5 pr-0 ">
                                <Col lg={12}>
                                    <Row>
                                        {products.map((product) => (
                                            <>
                                                {(products[0] === product || products[1] === product) ? (
                                                    <Col lg={6}> 
                                                        <Card className="mb-4"  key={product.id}>
                                                            <Card.Body>
                                                                <Card.Title>{ product.name } <p className="text-right font-weight-bold">{ product.price }$</p></Card.Title>
                                                                <div>
                                                                    <Link to={`/products/${product.id}`}>+ info</Link>
                                                                    <Button variant="dark" onClick={ (e) => _handleSubmit( product.id)}>+</Button>
                                                                    <span>{product.quantity}</span>
                                                                    <Button variant="dark" onClick={(e) => _handleSubmit( product.id)}>-</Button>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                ) : (
                                                    <Col  lg={{span: 4}} > 
                                                        <Card className="mb-4"  key={product.id}>
                                                            <Card.Body>
                                                                <Card.Title>{ product.name } <p className="text-right font-weight-bold">{ product.price }$</p></Card.Title>
                                                                <div>
                                                                    <Link to={`/products/${product.id}`}>+ info</Link>
                                                                    <Button variant="dark" onClick={(e) => _handleSubmit( product.id)}>+</Button>
                                                                    <span>{product.quantity}</span>
                                                                    <Button variant="dark" onClick={(e) => _handleSubmit( product.id)}>-</Button>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                )}
    
                                            </>
                                        ))}
                                    </Row>
                                </Col>
                            </Col>
                            <Col className="mr-5 mt-5" >
                                <Card>
                                    
                                    <Card.Body>
                                        <Card.Title>
                                            <p>Checkout</p>
                                        </Card.Title>
                                        
                                        <span>Total: </span>
                                        <Button>Checkout</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    
                </>
            )
        }
    }
    }
    

const mapStateToProps = (state) => ({
    userId: state.auth.user.id,
    products: state.cart.data,
    isFetching: state.cart.isFetching
});

const mapDispatchToProps = (dispatch) => ({
    fetchCart: bindActionCreators(fetchCartProducts, dispatch),
    updateProduct: bindActionCreators(updateProduct, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart) ;