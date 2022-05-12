import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";

export default function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productId = id;
  const [qty, setQty] = useState(1);
  const [size, setSizes] = useState("def");
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div className="top">
            <div className="col-2">
              <Link className="backToHome" to="/">Orqaga Qaytish</Link>
            </div>
            <div className="product-page">
              <img
                className="large float"
                src={product.image}
                alt={product.name}
              ></img>
              <div className="product-info">
                <ul className="product-des">
                  <li>
                    <h1>
                      <b>{product.name}</b>
                    </h1>
                  </li>
                  <li>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    ></Rating>
                  </li>
                  <li>
                    <b>Price:</b> ${product.price}
                  </li>
                  <li>
                    <b>Description:</b>
                    <p>{product.description}</p>
                  </li>
                </ul>
              </div>
              <div className="product-pruchase">
                <div className="card card-body">
                  <ul className="purchase-card">
                    <li>
                      <div>
                        <div>
                          <b>Price:</b>{" "}
                        </div>
                        <div className="card-price"> {product.price} so'm</div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div>
                          <b>Status:</b>
                        </div>
                        <div>
                          {product.countInStock > 0 ? (
                            <span className="success"> Sotuvda mavjud</span>
                          ) : (
                            <span className="error"> Sotuvda mavjud emas</span>
                          )}
                        </div>
                      </div>
                    </li>
                    {product.countInStock > 0 && (
                      <>
                        <li className="quatity-part">
                          {/* quantity */}
                            <div>
                              <h4>Soni:</h4>
                              <div>
                                <select
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                                >
                                  {[...Array(product.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                            </div>

                          {/* Size */}
                            <div>
                              <h4>O'lchami:</h4>
                              <div>
                                <select
                                  value={size}
                                  onChange={(e) => setSizes(e.target.value)}
                                >
                                  <option value="def"></option>
                                  {product.sizes.split(",").map((x) => (
                                    <option key={x} value={[x]}>
                                      {x}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                        </li>
                      </>
                    )}
                  </ul>
                  <button type="button" className="button card-button"
                          onClick={(e) => {
                            
                            // Navigating
                            if (size !== "def" || size.length === 0) {
                              // Animation
                            let button = document.querySelector('.button')
                            if(!button.classList.contains('loading')) {

                              button.classList.add('loading');
                      
                              setTimeout(() => {
                                button.classList.remove('loading');
                                navigate(
                                  `/cart/${productId}?qty=${qty}&size=${size}`
                                );
                              }, 3500);
                      
                          }
                          e.preventDefault();
                            } else {
                              window.alert("Mahsulot o'lchami tanlanmadi!");
                            }
                            
                            
                          }}
                          >
                            <span>Savatga qo'shish</span>
                            <div className="cart">
                              <svg viewBox="0 0 36 26">
                                <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
                                <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
                              </svg>
                            </div>
                          </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};