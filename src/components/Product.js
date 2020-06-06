import React from 'react';

import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import { MDBIcon } from 'mdbreact';
import { bindActionCreators } from 'redux';
import { addProductToCart } from '../redux/actions/cartActions';
import { connect } from 'react-redux';


export const Product = ({ ownProps, addProduct, userId }) => {

    const _handleSubmit = () => {
        addProduct(userId, ownProps.product)
    }
    
    return (
        <Card >
            <Card.Body>
                <Card.Title className="d-flex">{ ownProps.product.name } <span className="text-right font-weight-bold ml-auto">{ ownProps.product.price }$</span> </Card.Title>

                <Card.Text className="d-flex mt-4">
                    <Link to={`/products/${ownProps.product.id}`}>+ info</Link>
                    <Card.Link className="ml-auto" onClick={_handleSubmit()}><MDBIcon icon="cart-plus" size="lg"/></Card.Link>
                </Card.Text>
            </Card.Body>
        </Card>
    )

}
const mapStateToProps = (state, ownProps) => ({
    userId: state.auth.user.id,
    ownProps
});

const mapDispatchToProps = (dispatch) => ({
    addProduct: bindActionCreators(addProductToCart, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Product);