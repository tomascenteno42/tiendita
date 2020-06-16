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
                <div className="d-flex">
                    <Button variant="dark" className="ml-auto" onClick={_handleShow}>Checkout</Button>
                </div>
                <Row className="mx-5">
                    <Col lg={12} className="my-4 pr-0 ">
                            <Row className="mr-0">
                                {products.map((product) => (
                                    <Col lg={4} key={product.id}> 
                                        <Card className="mb-4"  key={product.id}>
                                            <Card.Body>
                                                <div className="d-flex align-items-center">
                                                    <Card.Title className="m-0">{ product.name } </Card.Title>
                                                    <span className="ml-auto font-weight-bold">{ product.price }$</span>
                                                </div>
                                                <div className="d-flex align-items-center mt-3">
                                                    <Link to={`/products/${product.id}`}>+ info</Link>
                                                    <Button name="plusButton" className="ml-auto" size="sm" variant="dark" onClick={ (e) => _handleSubmit(e, product.id)}>+</Button>
                                                    <span>{product.quantity}</span>
                                                    <Button name="minusButton" size="sm" variant="dark"  onClick={(e) => _handleSubmit(e, product.id)}>-</Button>
                                                </div>
                                            </Card.Body>
                                        </Card> 
                                    </Col>
                                ))}
                            </Row>
                    </Col>
                </Row>
                <Modal show={show} onHide={_handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Checkout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {products.map((product) => {
                            return <p key={product.id}>{product.name}: {product.price * product.quantity} $</p>
                        })}    
                        {(total !== null) ? (
                            <p>total: {total} $</p>
                        ) : (
                            <div>0</div>
                        ) }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={_handleClose}>
                            Later
                        </Button>
                        <Button variant="success" onClick={_handleClose}>
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