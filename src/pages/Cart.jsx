import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Modal, Toast } from "react-bootstrap";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCartProducts, deleteProductFromCart } from '../redux/actions/cartActions';
import { updateProduct } from '../redux/actions/cartActions';

export const Cart = ({ userId, fetchCart, products, updateProduct, deleteProduct }) => {
    const [total, setTotal] = useState();
   
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const _toggleModal = () => setShowModal(!showModal);
    const _toggleToast = () => setShowToast(!showToast);

    const _handleShow = () => {
        _toggleModal();
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
    const _handleDelete = async (e, product_id) => {
        deleteProduct(product_id).then(() => {
            // window.location.reload(false);
            
        });
        _toggleToast();
        
    }
    
    if(!products) {
        return null;
    } else {   
        return(
            <>
                <div className="d-flex" >
                    <Button variant="dark" className="ml-auto" onClick={_handleShow}>Checkout</Button>
                </div>
                <Row className="mx-5" style={{ position: 'relative', minHeight: '100px' }}>
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
                                                    <div className="d-flex flex-column mr-auto">
                                                        <Link to={`/products/${product.id}`}>+ info</Link>
                                                        <Button variant="danger" name="deleteButton" size ="sm" className="m-0 mt-1" onClick={(e) => _handleDelete(e, product.id)}>Remove</Button>
                                                    </div>
                                                    <h4>{product.quantity}</h4>

                                                    <div className="d-flex flex-column">
                                                        <Button name="plusButton" className="ml-1 mr-1 mt-0 mb-0" size="sm" variant="dark" onClick={ (e) => _handleSubmit(e, product.id)}>+</Button>
                                                        <Button name="minusButton" className="mt-1 mb-0 mr-1 ml-1" size="sm" variant="dark"  onClick={(e) => _handleSubmit(e, product.id)}>-</Button>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card> 
                                    </Col>
                                ))}
                            </Row>
                    </Col>
                </Row>
                <Modal show={showModal} onHide={_toggleModal}>

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
                        <Button variant="dark" onClick={_toggleModal}>

                            Later
                        </Button>
                        <Button variant="success" onClick={_toggleModal}>
                            Proceed to ckeckout
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Toast show={showToast} delay={3000} autohide onClose={_toggleToast} style={{ position: 'absolute', top: 0, right: 0 }}>
                <Toast.Header style={{backgroundColor: "black"}}>
                    <strong className="mr-auto">Tiendita</strong>
                    <small>Now</small>
                </Toast.Header>
                <Toast.Body>Your product has been erased!</Toast.Body>
                </Toast>
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
    updateProduct: bindActionCreators(updateProduct, dispatch),
    deleteProduct: bindActionCreators(deleteProductFromCart, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart) ;