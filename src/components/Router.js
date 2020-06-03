import React from 'react';

import Cart from '../pages/Cart';

import Products from '../pages/Products.jsx';
import Producto from '../pages/Producto';
import Create from '../pages/Create.jsx';
import NavBar from './NavBar';
import UserRegister from '../pages/UserRegister';
import UserLogin from '../pages/UserLogin';

import {
    BrowserRouter,
    Switch,
    Route,
  } from "react-router-dom";

class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        }
    }
    addProductToCart = (product) => {
        let newCart = this.state.cart;
        const encontrado = newCart.filter(x => x.product.id === product.id)[0];

        if(encontrado){
            const index = newCart.indexOf(encontrado);
            newCart[index].quantity += 1;
            this.setState({cart: newCart});
            
        } else {
            newCart = [{quantity: 1, product}, ...newCart]
            this.setState({cart: newCart});
        }
    }


    eraseProductFromCart = (product) => {
        var newCart = this.state.cart;
        const found = newCart.filter(filter => filter.product.id === product.id )[0];
        if(found){
            const index = newCart.indexOf(found);

            if(newCart[index].quantity === 1){
                return;
            }else{
                newCart[index].quantity -= 1;
                this.setState({cart:newCart});
            }
        }
    }
    render(){
        return (
            <BrowserRouter>
                <NavBar />
                
                <Switch>
                    <Route exact path="/auth/register">
                        <UserRegister />
                    </Route>

                    <Route exact path="/auth/login">
                        <UserLogin />
                    </Route>
                    <Route exact path="/cart">
                        <Cart items={this.state.cart} onAdd={this.addProductToCart} onErase={this.eraseProductFromCart}/>
                    </Route>

                    <Route exact path="/products">
                        <Products onAddToCart={this.addProductToCart} />
                    </Route>
                    <Route exact path="/products/create">
                        <Create />

                    </Route>
                    <Route exact path="/products/:productId" component={Producto}  onAddToCart={this.addProductToCart}/>        
                </Switch>                
            </BrowserRouter>
        )
    }
}
export default Router;