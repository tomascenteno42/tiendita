import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCartProducts } from '../redux/actions/cartActions';

export const Cart = ({ userId, fetchCart, products }) => {
    useEffect(() => {
        fetchCart(userId);
    }, []);

    if(products.length === 0) {
        return null;
    } else {
        return(
            <div style={{marginLeft: '5rem'}}>
                {products.map((product) => (
                    <Card style={{ width: '18rem' }}  className="w-auto m-auto" key={product.id}>
                        <Card.Body>
                            <Card.Title>{ product.name } <p className="text-right font-weight-bold">{ product.price }$</p></Card.Title>
                            <div>
                                <Link to={`/products/${product.id}`}>+ info</Link>
                                <button type="submit" style={{backgroundColor: 'black', width: 30, color: 'white', textAlign:'center'}} >+</button>
                                <span>{product.quantity}</span>
                                <button type="submit" style={{backgroundColor: 'black', width: 30, color: 'white', textAlign:'center'}}  >-</button> 
                            </div>
                            
                        </Card.Body>
                    </Card>
                    ))}
            </div>
        )
    }

}
const mapStateToProps = (state) => ({
    userId: state.auth.user.id,
    products: state.cart.data
});

const mapDispatchToProps = (dispatch) => ({
    fetchCart: bindActionCreators(fetchCartProducts, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart) ;