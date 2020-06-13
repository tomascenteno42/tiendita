import React, { useEffect } from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAuthenticatedUserAction } from '../redux/actions/authActions';

import Cart from '../pages/Cart.jsx';
import Products from '../pages/Products';
import Create from '../pages/ProductCreate';
import ProductInfo from '../pages/ProductInfo';
import UserLogin from '../pages/UserLogin';
import UserRegister from '../pages/UserRegister';
import Navbar from '../components/NavBar';

export function ProtectedRouter({ authenticatedUser, isAuthenticated }) {
    
    useEffect(() => {
        authenticatedUser();   
    }, []);
    return(
        <BrowserRouter>
            <Navbar />

            <Switch>
        {isAuthenticated ? (
            <>
                <Route exact path="/products" component={ Products } />

                <Route exact path="/products/create" component={ Create } />
                
                <Route exact path="/products/:productId" component={ ProductInfo } />        
                
                <Route exact path="/cart" component={ Cart } />
            </>
        ): (
            <>
                <Route exact path="/auth/register" component={ UserRegister } />

                <Route exact path="/auth/login" component={ UserLogin } />
            </>  
        )}
            </Switch>                
         </BrowserRouter>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated(),
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
    authenticatedUser: bindActionCreators(getAuthenticatedUserAction, dispatch)

});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRouter);