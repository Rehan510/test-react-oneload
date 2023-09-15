import React, { useState } from 'react';
import { Card, Badge } from 'react-bootstrap';
import SortByDropDown from './SortByDropDown';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory, setSelectedProduct } from '../../reducers/telemart';
import { get, orderBy } from 'lodash';
import { getPercentage, getProductPrice } from '../../utils/helpers';
import { toast } from 'react-toastify';

const ProuductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [label, setLabel] = useState({ label: 'Sort', sort: null });
  const getLabel = {
    asc: ' Price Low to High',
    desc: 'Price High to Low'
  };
  const handleMenuClick = (e) => {
    setLabel({ label: get(getLabel, e.key, 'Sort'), sort: e.key });
  };
  const { cartItems, searchProducts } = useSelector((state) => state.telemartSlice);
  const toasterHandler = () => {
    toast.dismiss();
    toast.error('This product is not available', {
      position: 'top-right',
      theme: 'colored',
      autoClose: 200
    });
  };
  const handleProductDetail = (data) => {
    if (!data.productPrice && !data.discountedPrice) {
      return toasterHandler();
    }
    let product = data;
    const isProduct = cartItems.find((v) => v.productId === data.productId);
    if (isProduct) {
      product = isProduct;
    }
    dispatch(
      setSelectedCategory({
        category_id: get(data, 'category.categoryId', null),
        title: get(data, 'category.categoryTitle', null)
      })
    );
    dispatch(setSelectedProduct(product));
    navigate(`/telemart/productDetail/${get(data, 'category.categoryId', null)}/${data.productId}`);
  };
  return (
    <>
      <div className="cardDiv container-fluid">
        <div className="sort-div row">
          <div className="pt-2 col-example text-left col-md-9 "> {searchProducts.length} Results</div>

          <div className="search-sort col-md-3">
            <SortByDropDown label={label} handleMenuClick={handleMenuClick} />
          </div>
        </div>
        <section className="similar-products p-4 mt-3">
          {searchProducts.length > 0 ? (
            <div className="row g-4">
              {orderBy(
                searchProducts,
                [(item) => item.discountedPrice || item.productPrice],
                [get(label, 'sort', 'asc')]
              ).map((pro, index) => {
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

                          {pro?.productPrice && pro?.discountedPrice ? (
                            <s className="ms-3">Rs.{get(pro, 'productPrice', 0)} </s>
                          ) : null}
                        </div>
                        {pro?.productPrice && pro?.discountedPrice ? (
                          <Badge>{getPercentage(pro.productPrice, pro.discountedPrice)}</Badge>
                        ) : null}
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
          ) : (
            <h5 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'grey' }}>
              No data found
            </h5>
          )}
        </section>
      </div>
    </>
  );
};

export default ProuductList;
