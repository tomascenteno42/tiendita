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

export const Cart = ({ userId, fetchCart, products, updateProduct }) => {
    const [productTotal, setProductTotal] = useState();
    const [total, setTotal] = useState(0);


    useEffect(() => {
        fetchCart(userId);
    }, []);

    const _handleSubmit = (e, product_id ) => {
        const product = products.filter(x => x.id === product_id)[0];
        if (e.target.name === "plusButton") {
            product.quantity+=1;
        } else {
            product.quantity-=1;
        }
        updateProduct(product.id, product.quantity);
    }
    const _handleTotal = (product) => {
        // products.forEach(product => {
        //     setTotal(total+=product.quantity * product.price)
        // });
        console.log(total);
    }
    if(!products) {
        return null;
    } else {   
        return(
            <>
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
                                                            <Button name="plusButton" variant="dark" onClick={ (e) => _handleSubmit(e, product.id)}>+</Button>
                                                            <span>{product.quantity}</span>
                                                            <Button name="minusButton" variant="dark" onClick={(e) => _handleSubmit(e, product.id)}>-</Button>
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
                                                            <Button name="plusButton" variant="dark" onClick={(e) => _handleSubmit(e, product.id)}>+</Button>
                                                            <span>{product.quantity}</span>
                                                            <Button name="minusButton" variant="dark" onClick={(e) => _handleSubmit(e, product.id)}>-</Button>
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
                    <Col lg={2} className="m-5" >
                        <Card>
                            
                            <Card.Body>
                                <Card.Title>
                                    <p>Checkout</p>
                                </Card.Title>

                                
                                <p>Total:</p>

                                <Button onClick={(e) => _handleTotal()}>Checkout</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>
        )
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