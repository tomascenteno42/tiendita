import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/card';
import logo from '../assets/pancho-bacon.jpg';
import { MDBIcon } from 'mdbreact'
class Producto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            product: null
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/api/v1/products/${this.props.match.params.productId}`).then(response => {

            const product = response.data;
            this.setState({loading: false, product});

        })
    }    
    render() {
        if(this.state.loading){
            return <div><span>La pagina esta cargando</span></div>
        }else {
            return (
                <Card style={{ width: '50%' }}>
                    
                    <Card.Body>
                    <Card.Title>{ this.state.product.name }</Card.Title>
                    <Card.Img variant="top" src={logo} className="w-auto" />
                        <Card.Text>
                        Producto re zarpado en cheto
                        
                        </Card.Text>
                        <Card.Link onClick={() => this.props.onAddToCart(this.props.producto)}><MDBIcon icon="cart-plus"  /></Card.Link>
                    </Card.Body>
                    
                    {/* <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body> */}
                    </Card>
            )
        }
        
    }
}
export default Producto;