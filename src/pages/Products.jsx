import React, { useEffect } from 'react';

import Product from '../components/Product';

import { fetchProducts } from '../redux/actions/productAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CardColumns from 'react-bootstrap/CardColumns'
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

export function Products({ getProducts, products }) {
    
    useEffect(() => {    
        getProducts();        
    }, []);

    if(products.length === 0) {
        return null;
    } else {
        return(
            <div className="bg-warning">
                <Row className="mx-4">
                    <Col lg={12} className="mt-4">
                        <Row>
                        {products.data.map(product => (
                            <Product product={product} key={product.id} />
                        ))}     
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    products: state.products
});

const mapDispatchToProps = (dispatch) => ({
    getProducts: bindActionCreators(fetchProducts, dispatch)

});

export default connect(mapStateToProps, mapDispatchToProps)(Products);