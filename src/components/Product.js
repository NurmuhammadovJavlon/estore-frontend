import React from 'react'
import Rating from './Rating';
import { Link } from 'react-router-dom'

export default function Product(props) {
    const { product } = props;
    return (
        <div key={product._id} className="col-sm-3">
        <div className="product-container">
          <div className= {product.sale ===true? "tag-sale" : 'nostyle'}>
          </div>
          <div className="product-image">
            <span className="hover-link"></span>
            <Link to={`/product/${product._id}`} className="product-link">view details</Link>
            <img className="img-responsive" src={product.image} alt="" />
          </div>
          <div className="product-description">
            <div className="product-label">
              <div className="product-name">
                <h1>{product.name}</h1>
                <p className="price">{product.price} so'm</p>
                <p>{product.description}</p>
              </div>
            </div>
            <div className="product-option">
              <div className="product-size">
                <h3>Sizes</h3>
                <p>{product.sizes}</p>
              </div>
              <div className="product-ratings">
                <h3>Ratings</h3>
                <Rating 
                rating={product.rating} 
                numReviews={product.numReviews}
                ></Rating>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}