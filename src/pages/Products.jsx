import React, { useEffect, useState } from 'react';

import Product from '../components/Product';

import CardColumns from 'react-bootstrap/CardColumns'
import { fetchProducts } from '../redux/actions/productAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export function Products({ getProducts, products }) {
    
    useEffect(() => {
        getProducts();        
        
    }, []);
    if(products.length === 0) {
        return null;
    } else {
        return(
            <div className="-rem5">
                <CardColumns>
                        {products.data.map(product => (
                            <Product product={product} key={product.id} addProductToCart={product.onAddToCart}/>
                        ))}     
                    
                </CardColumns>
            </div>
        )
    }
        
    

}

const mapStateToProps = (state) => ({
    products: state.products
});

const mapDispatchToProps = (dispatch) => ({
    getProducts: bindActionCreators(fetchProducts, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Products);