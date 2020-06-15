import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Modal } from "react-bootstrap"

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCartProducts } from '../redux/actions/cartActions';
import { updateProduct } from '../redux/actions/cartActions';

export const Cart = ({ userId, fetchCart, products, updateProduct }) => {
    const [total, setTotal] = useState();
   
    const [show, setShow] = useState(false);

    const _handleClose = () => setShow(false);
    const _handleShow = () => {
        setShow(true);
        let tot =0;
        products.map((product)=> {
            return tot += product.price * product.quantity;
        })
        setTotal(tot);
    }
    const _handleTotal = () => {
        
    }
    useEffect(() => {
        fetchCart(userId);
        
    }, [fetchCart, userId]);

    const _handleSubmit = (e, product_id ) => {
        const product = products.filter(x => x.id === product_id)[0];
        if (e.target.name === "plusButton") {
            product.quantity+=1;
        } else {
            product.quantity-=1;
        }
        
        updateProduct(product.id, product.quantity);
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
                            <Button onClick={_handleShow}>Checkout</Button>
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
                </Row>
                <Modal show={show} onHide={_handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Checkout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {products.map((product) => {
                            return <p>{product.name}: {product.price * product.quantity} $</p>
                        })}    
                        {(total !== null) ? (
                            <p>total: {total} $</p>
                        ) : (
                            <div>0</div>
                        ) }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={_handleClose}>
                            Later
                        </Button>
                        <Button variant="primary" onClick={_handleClose}>
                            Proceed to ckeckout
                        </Button>
                    </Modal.Footer>
                </Modal>
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