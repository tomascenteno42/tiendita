import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


export const Cart = (props) => {

    return (
        <div style={{marginLeft: '5rem'}}>
            {props.items.map(({ quantity, product}) => (
                <Card style={{ width: '18rem' }}  className="w-auto m-auto" key={product.id}>
                    <Card.Body>
                        <Card.Title>{ product.name } <p className="text-right font-weight-bold">{ product.price }$</p></Card.Title>
                        <div>
                        <Link to={`/products/${product.id} ` }>+ info</Link>
                        
                        <button type="submit" style={{backgroundColor: 'black', width: 30, color: 'white', textAlign:'center'}} onClick={()=>props.onAdd(product)}>+</button>
                        <span>{quantity}</span>
                        <button type="submit" style={{backgroundColor: 'black', width: 30, color: 'white', textAlign:'center'}} onClick={()=>props.onErase(product)} >-</button> 
                        </div>
                        
                    </Card.Body>
                </Card>
            ))}
        </div>
    )

}

export default Cart;