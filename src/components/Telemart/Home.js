import React, { useEffect, useState, useRef, useCallback } from 'react';
import Spinner from './Spinner';
import { Card, Badge } from 'react-bootstrap';
import loadMoreImg from '../../assets/images/loading.png';
import { useNavigate } from 'react-router-dom';
import { get } from 'lodash';
import { setSelectedProduct, setSelectedCategory } from '../../reducers/telemart';
import { useDispatch, useSelector } from 'react-redux';
import KycDialouge from './Dialog/KycDialouge';
import { getPercentage, getProductPrice } from '../../utils/helpers';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [favItems, setFavItems] = useState([]);
  const [totalShowingProducts, setTotalShowingProducts] = useState(8);
  const [favBanner, setFavBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const { cartItems, favouriteMetaData } = useSelector((state) => state.telemartSlice);
  const api = useRef(null);
  const handleProductDetail = (data) => {
    let product = data;
    const isProduct = cartItems.find((v) => v.productId === data.productId);
    if (isProduct) {
      product = isProduct;
    }
    const category = {
      id: get(data, 'category.partnerCategoryId', null),
      parent_id: get(data, 'category.parentId', null),
      title: get(data, 'category.categoryTitle', null),
      disabled: !get(data, 'category.activeInd', false),
      category_id: get(data, 'category.categoryId', null)
    };
    dispatch(setSelectedCategory(category));
    dispatch(setSelectedProduct(product));
    navigate(`/telemart/productDetail/${get(data, 'category.categoryId', null)}/${data.productId}`);
  };
  const handleShopNow = (banner) => {
    const category = {
      id: get(banner, 'category.partnerCategoryId', null),
      parent_id: get(banner, 'category.parentId', null),
      title: get(banner, 'category.categoryTitle', null),
      disabled: !get(banner, 'category.activeInd', false),
      category_id: get(banner, 'category.categoryId', null)
    };
    dispatch(setSelectedCategory(category));
    // dispatch(setSimilarProducts(mockProducts))
    navigate(`/telemart/productDetail/${get(banner, 'category.categoryId', null)}/${banner.productId}`);
  };

  const getSelectedProducts = useCallback(async () => {
    if (!favouriteMetaData) {
      return;
    }
    let resp = null;
    try {
      const data = await axios.post('/oneload-telemart-api/get-product', {
        productId: favouriteMetaData['favouriteProductId']
      });
      const error = get(data, 'data.error', true);
      if (!error) {
        resp = get(data, 'data.data', null);
      }
      setFavBanner(resp);
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
      setFavBanner(null);
    }
  }, [favouriteMetaData]);

  const getCategorieProducts = useCallback(async () => {
    if (!favouriteMetaData) {
      return;
    }
    setLoading(true);
    if (api.current) {
      api.current.abort();
    }
    const controller = new AbortController();
    api.current = controller;
    let resp = [];
    try {
      const data = await axios.post(
        '/oneload-telemart-api/get-products',
        {
          categoryId: favouriteMetaData['favouriteCategoryId']
        },
        { signal: controller.signal }
      );
      const error = get(data, 'data.error', true);
      if (!error) {
        resp = get(data, 'data.data', []);
      }
      setLoading(false);
      setFavItems(resp);
    } catch (error) {
      setLoading(false);
      setFavItems(resp);
    }
  }, [favouriteMetaData]);

  useEffect(() => {
    getCategorieProducts();
    getSelectedProducts();
  }, [getCategorieProducts, getSelectedProducts]);

  const handleMoreProduct = () => {
    setTotalShowingProducts(totalShowingProducts + 8);

  };
  return (
    <>
      <Spinner status={loading} />
      <KycDialouge isShowPopup={true} />
      <div className="BannerDiv container-fluid">
        {favBanner && (
          <div className="banner-wrapper">
            <img src={get(favouriteMetaData, 'bannerUrl', '')} className="BannerImage" alt="BannerImage" />
            {/* <h2 className="BannerHeading">
            Get the new Phone <br />
          </h2> */}
            <button
              className="BannerButton"
              onClick={() => {
                handleShopNow(favBanner);
              }}>
              Shop Now
            </button>
          </div>
        )}
        <section className="similar-products p-4 mt-3">
          <div className=" container-fluid">
            <p className="card-heading mb-3">{get(favItems, '[0].category.categoryTitle')} </p>
            <div className="row g-4">
              {favItems.slice(0, totalShowingProducts).map((pro, index) => {
                return (
                  <div
                    className="col-lg-3 col-md-6"
                    key={`crd${index}`}
                    onClick={() => {
                      handleProductDetail(pro);
                    }}>
                    <Card className="small-card-container">
                      <div className="image-section">
                        <Card.Img className="card-image" variant="top" src={pro.imageUrl} />
                      </div>
                      <Card.Body>
                        <Card.Text className="mb-2 card-text">{pro.brandName}</Card.Text>
                        <Card.Text className="mb-2 card-text">{pro.productTitle}</Card.Text>
                        <div className="price-discount">
                          <span className="after-discount-price">Rs. {getProductPrice(pro)}</span>

                          {get(pro, 'discountedPrice', 0) > 0 ? (
                            <s className="ms-3">Rs.{get(pro, 'productPrice', 0)} </s>
                          ) : null}
                        </div>
                        {get(pro, 'discountedPrice', 0) > 0 ? (
                          <Badge>{getPercentage(pro.productPrice, pro.discountedPrice)}</Badge>
                        ) : null}
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
            {favItems.length > totalShowingProducts && (
              <div className="show-more mt-3">
                <img className="loading-image" alt="Loadingimage" src={loadMoreImg} />
                <p className="more-btn" onClick={handleMoreProduct}>
                  Show more
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
export default Home;
