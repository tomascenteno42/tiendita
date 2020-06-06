import React, { useEffect } from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAuthenticatedUserAction } from '../redux/actions/authActions';

import Cart from '../pages/Cart';
import Products from '../pages/Products';
import Create from '../pages/Create';
import Producto from '../pages/Producto';
import UserLogin from '../pages/UserLogin';
import UserRegister from '../pages/UserRegister';
import Navbar from '../components/NavBar';

export function ProtectedRouter({ authenticatedUser, isAuthenticated, user }) {
    
    useEffect(() => {
        authenticatedUser();   
    }, []);
    return(
        <BrowserRouter>
            <Navbar />

            <Switch>
        {isAuthenticated ? (
            <>
                <Route exact path="/products">
                    <Products />
                </Route>
                <Route exact path="/products/create">
                    <Create />

                </Route>
                
                <Route exact path="/products/:productId" component={ Producto } />        
                
                <Route exact path="/cart/:id" component={ Cart } />
 
 
               
            </>
        ): (
            <>
                <Route exact path="/auth/register">
                    <UserRegister />
                </Route>

                <Route exact path="/auth/login">
                    <UserLogin />
                </Route>
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