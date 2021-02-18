import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'


function ProductScreen({ match }) {
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))


    }, [dispatch, match])

    return (
        <div>
            <Link to='/product/1/' className='btn btn-light my-3'>Go Back</Link>
            {loading?
                <Loader/>
                : error
                ?<h2>{error}</h2>
                :(
                    <Row>
                <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid/>
                </Col>

                <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Description: ${product.description}
                            </ListGroup.Item>
                        </ListGroup>
                </Col>
                    <Col md={3}>    
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>price:</Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>


                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status</Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroupItem>
                                    <Button className='btn-block' disabled={product.countInStock == 0}type='button'>ADD TO CART</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
            </Row>
                )
            
        
        }
            
            
        </div>
    )
}
export default ProductScreen
