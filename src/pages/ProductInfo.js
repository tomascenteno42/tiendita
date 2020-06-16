import React, { useEffect } from 'react';

import Card from 'react-bootstrap/card';
import { MDBIcon } from 'mdbreact'

import { fetchProductById } from '../redux/actions/productAction';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export function ProductInfo({ getProduct, product, product_id } ) {
            
        useEffect(() => {
            getProduct(product_id);
        }, [getProduct, product_id]);

        return (
            <div className="d-flex align-items-center justify-content-center h-100">
                <Card >       
                    <Card.Body> 
                        <Card.Title>{ product.name }</Card.Title>
                        <Card.Subtitle>{ product.price } $</Card.Subtitle>
                     </Card.Body>
                     <Card.Body>
                        <Card.Text > Producto re zarpado en cheto </Card.Text>
                        <Card.Link><MDBIcon icon="cart-plus"  /></Card.Link>
                    </Card.Body>
                </Card>
            </div>
        )
}
const mapStateToProps = (state, ownProps) => ({
    product: state.product.data,
    product_id: ownProps.match.params.productId
})
const mapDispatchToProps = (dispatch) => ({
    getProduct: bindActionCreators(fetchProductById, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);