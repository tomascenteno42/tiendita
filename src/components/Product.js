import React from 'react';

import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import { Col } from "react-bootstrap";

import { MDBIcon } from 'mdbreact';
import { bindActionCreators } from 'redux';
import { addProductToCart } from '../redux/actions/cartActions';
import { connect } from 'react-redux';


export const Product = ({ ownProps, addProductToCart }) => {

    const _handleSubmit = () => {
        addProductToCart(ownProps.product, ownProps.product.id);
    }
    
    return (
        <Col lg={3} className="mb-4">
            <Card >
                <Card.Body>
                    <Card.Title className="d-flex">{ ownProps.product.name } <span className="text-right font-weight-bold ml-auto">{ ownProps.product.price }$</span> </Card.Title>

                    <Card.Text className="d-flex mt-4">
                        <Link to={`/products/${ownProps.product.id}`}>+ info</Link>
                        <Card.Link className="ml-auto" onClick={_handleSubmit}><MDBIcon icon="cart-plus" size="lg"/></Card.Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )

}
const mapStateToProps = (state, ownProps) => ({
    userId: state.auth.user.id,
    ownProps
});

const mapDispatchToProps = (dispatch) => ({
    addProductToCart: bindActionCreators(addProductToCart, dispatch)
    
});
export default connect(mapStateToProps, mapDispatchToProps)(Product);