import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button, Badge, Card } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Image } from 'antd';

import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { get, cloneDeep } from 'lodash';
import { setCartItems, setUpdateCartItems, setSelectedProduct, setSelectedScreen } from '../../reducers/telemart';
import { getProductPrice, getPercentage } from '../../utils/helpers';
import Spinner from './Spinner';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedProduct, selectedCategory, cartItems } = useSelector((state) => state.telemartSlice);
  const [quantity, setQuantity] = useState(1);
  const [isShowDescription, setIsShowDescription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([]);
  let { productId, categoryId } = useParams();
  const api = useRef(null);

  const getSelectedProducts = useCallback(async () => {
    setLoading(true);
    if (api.current) {
      api.current.abort();
    }
    const controller = new AbortController();
    api.current = controller;
    let resp = null;
    try {
      const data = await axios.post(
        '/oneload-telemart-api/get-product',
        {
          productId: productId
          // sortingOption: 'productPrice',
          // sortingDirection: 'desc'
        },
        { signal: controller.signal }
      );

      const error = get(data, 'data.error', true);
      if (!error) {
        resp = get(data, 'data.data', null);
      }
      dispatch(setSelectedProduct(resp));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(setSelectedProduct(resp));
    }
  }, [productId, dispatch]);

  const getCategorieProducts = useCallback(async () => {
    let resp = [];
    if (!categoryId) {
      return;
    }
    try {
      const data = await axios.post('/oneload-telemart-api/get-products', {
        categoryId: categoryId
      });
      const error = get(data, 'data.error', true);
      if (!error) {
        resp = get(data, 'data.data', []);
      }
      setSimilarProducts(resp);
    } catch (error) {
      setSimilarProducts(resp);
    }
  }, [categoryId]);

  useEffect(() => {
    getSelectedProducts();
    getCategorieProducts();
  }, [getSelectedProducts, getCategorieProducts]);

  const toasterHandler = () => {
    toast.dismiss();
    toast.success('Item added to cart', {
      position: 'top-right',
      theme: 'colored',
      autoClose: 200
    });
  };

  const handleQuantity = (isAdd) => {
    if (isAdd) {
      setQuantity(quantity + 1);
    }
    if (!isAdd && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleAddToCart = () => {
    const isProduct = cartItems.find((v) => v.productId === selectedProduct.productId);
    if (isProduct) {
      let data = cloneDeep(cartItems);
      const findProductIndex = data.findIndex((v) => v.productId === selectedProduct.productId);
      data[findProductIndex].quantity = data[findProductIndex].quantity + quantity;
      dispatch(setUpdateCartItems(data));
      toasterHandler();
      return;
    }

    toasterHandler();
    dispatch(setCartItems({ ...selectedProduct, quantity: quantity }));
  };

  const handleProductDetail = (data) => {
    if (!data.productPrice && !data.discountedPrice) {
      toast.dismiss();
      toast.success('This product is not available', {
        position: 'top-right',
        theme: 'colored',
        autoClose: 200
      });
      return
    }
    let productQuantity = 1
    let product = data;
    const isProduct = cartItems.find((v) => v.productId === data.productId);
    if (isProduct) {
      product = isProduct;
      productQuantity = get(product, 'quantity', 1)

    }
    setQuantity(productQuantity)
    dispatch(setSelectedProduct(product));
    window.scrollTo(0, 0);

    navigate(`/telemart/productDetail/${selectedCategory.category_id}/${data.productId}`);
  };
  const handleBuyNow = (data) => {
    const isProduct = cartItems.find((v) => v.productId === data.productId);
    if (!isProduct) {
      handleAddToCart();
    }

    dispatch(setSelectedScreen('cart-items'));
    navigate('/telemart/cart');
  };
  const handleSelectedCategory = (id) => {
    if (id) {
      navigate(`/telemart/products/${id}`);
    }
  };
  const handleDescription = () => {
    setIsShowDescription(!isShowDescription);
  };
  return (
    <div className="container-fluid">
      <Spinner status={loading} />
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => {
            navigate('/telemart/home');
          }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => {
            handleSelectedCategory(get(selectedCategory, 'category_id', null));
          }}>
          {get(selectedCategory, 'title', null)}
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#" active style={{ color: '#D80303' }}>
          {get(selectedProduct, 'productTitle', null)}
        </Breadcrumb.Item>
      </Breadcrumb>
      <section className="product-details">
        <div className="row">
          <div className="col-lg-4">
            <div className="product-images">
              <div className="image-preview">
                <Image width={400} src={get(selectedProduct, 'imageUrl', null)} alt="TabImage" />
              </div>
              <div className="thumbnails-wrapper">
                <Image.PreviewGroup>
                  {get(selectedProduct, 'productImages', [])?.map((img, index) => {
                    return (
                      <>
                        <Image key={`primg${index}`} width={200} src={img.imageUrl} />
                      </>
                    );
                  })}
                </Image.PreviewGroup>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="product-info ps-lg-4">
              <h1> {get(selectedProduct, 'productTitle', null)}</h1>
              <div className="product-price">
                <span className="price">Rs. {getProductPrice(selectedProduct)}</span>
                <span className="cut-price">
                  {selectedProduct?.discountedPrice && selectedProduct?.productPrice
                    ? `Rs ${get(selectedProduct, 'productPrice', 0)}`
                    : null}
                </span>
                {selectedProduct?.productPrice && selectedProduct?.discountedPrice ? (
                  <span className="off-price">
                    {getPercentage(selectedProduct.productPrice, selectedProduct.discountedPrice)}
                  </span>
                ) : null}
              </div>
              <ul className="more-info">
                <li>
                  <strong>Delivery Time</strong>
                  {selectedProduct?.deliveryTime ? <span>{selectedProduct.deliveryTime}</span> : <span>N/A</span>}
                </li>
                <li>
                  <strong>Availability</strong>
                  <span> {selectedProduct?.availability ? 'In Stock' : 'Out of Stock'}</span>
                </li>
                <li>
                  <strong>Brand</strong>
                  <span> {get(selectedProduct, 'brandName', null)}</span>
                </li>
                {/* <li className="size-select">
                  <strong>Size</strong>
                  <Select defaultValue="lucy" size="large" options={options} />
                </li> */}
                <li>
                  <strong>Quantity</strong>
                  <div className="add-item">
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        handleQuantity(false);
                      }}>
                      -
                    </span>{' '}
                    <span>{quantity}</span>{' '}
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        handleQuantity(true);
                      }}>
                      +
                    </span>
                  </div>{' '}
                </li>
              </ul>
              <div className="button-group">
                <Button disabled={!selectedProduct?.availability} className="add-to-cart" onClick={() => handleAddToCart(selectedProduct)}>
                  Add to Cart
                </Button>
                <Button
                  className="buy-now"
                  disabled={!selectedProduct?.availability}
                  onClick={() => {
                    handleBuyNow(selectedProduct);
                  }}>
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* description */}

        {selectedProduct?.description && (
          <div className="card mt-2">
            <div className="card-header">
              <h3 className="card-title">Description</h3>
              <h3
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  handleDescription();
                }}>
                {isShowDescription ? <MinusCircleOutlined /> : <PlusCircleOutlined />}
              </h3>
            </div>
            {isShowDescription && (
              <div className="card-heading p-4">
                <div
                  className="description-details"
                  dangerouslySetInnerHTML={{ __html: selectedProduct.description }}
                />
              </div>
            )}
          </div>
        )}
      </section>

      {/* similar products */}
      <section className="similar-products p-2 mt-3">
        <div className="container-fluid">
          <p className="product-heading mb-3">Similar Products</p>
          <div className="row">
            {similarProducts
              ?.filter((filterSelectedProduct) => filterSelectedProduct.productId !== selectedProduct.productId)
              .map((sData, i) => {
                return (
                  <div className="col-lg-3 col-md-6 mt-2" key={`crd${i}`}>
                    <Card className="small-card-container" onClick={() => handleProductDetail(sData)}>
                      <div className="image-section">
                        <Card.Img className="card-image" variant="top" src={sData.imageUrl} alt="CartImg" />
                      </div>
                      <Card.Body>
                        <Card.Text className="mb-2 card-text">{sData.productTitle}</Card.Text>
                        <div className="price-discount">
                          <span className="after-discount-price">Rs. {getProductPrice(sData)}</span>
                          {sData.productPrice && sData.discountedPrice ? (
                            <span className="ms-2 exact-price">Rs.{get(sData, 'productPrice', 0)} </span>
                          ) : null}
                        </div>
                        {sData.productPrice && sData.discountedPrice ? (
                          <Badge>{getPercentage(sData.productPrice, sData.discountedPrice)}</Badge>
                        ) : null}
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
