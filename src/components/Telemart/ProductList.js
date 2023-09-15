import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Card, Badge } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import SortByDropDown from './SortByDropDown';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProduct, setSimilarProducts } from '../../reducers/telemart';
import { get, orderBy } from 'lodash';
import { Pagination } from 'antd';
import axios from 'axios';
import Spinner from './Spinner';
import { getPercentage, getProductPrice } from '../../utils/helpers';
import { toast } from 'react-toastify';

const ProuductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { categoryId } = useParams();
  const [label, setLabel] = useState({ label: 'Sort', sort: null });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const getLabel = {
    asc: ' Price Low to High',
    desc: 'Price High to Low'
  };
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = useRef(null);
  const getCategorieProducts = useCallback(async () => {
    setLoading(true);
    if (api.current) {
      api.current.abort();
    }
    const controller = new AbortController();
    api.current = controller;
    let resp = [];
    setProducts([]);
    try {
      const data = await axios.post(
        '/oneload-telemart-api/get-products',
        {
          categoryId: categoryId,
          pageNumber: currentPage - 1,
          pageSize: pageSize
        },
        { signal: controller.signal }
      );
      const error = get(data, 'data.error', true);
      if (!error) {
        resp = get(data, 'data.data', []);
      }
      setProducts(resp);
      dispatch(setSimilarProducts(resp));
      setLoading(false);
      setTotalPage(get(data, 'data.totalElements', 1));
    } catch (error) {
      setLoading(false);
      setProducts([]);
      setTotalPage(0);
      dispatch(setSimilarProducts([]));
    }
  }, [categoryId, currentPage, pageSize, dispatch]);

  useEffect(() => {
    getCategorieProducts();
  }, [getCategorieProducts]);

  const onPaginationHandler = (page) => {
    setCurrentPage(page);
  };
  const handleMenuClick = (e) => {
    setLabel({ label: get(getLabel, e.key, 'Sort'), sort: e.key });
  };

  const { selectedCategory, cartItems } = useSelector((state) => state.telemartSlice);
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
    dispatch(setSelectedProduct(product));
    navigate(`/telemart/productDetail/${get(data, 'category.categoryId', null)}/${data.productId}`);
  };
  // const handleAddToCart = (item) => {
  //   dispatch(setCartItems(item));
  // };

  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
  };

  return (
    <>
      <div className="cardDiv container-fluid">
        <Spinner status={loading} />

        <div className="sort-div row">
          <div className="text-left col-md-9 col-sm-7">
            {' '}
            <Breadcrumb>
              <Breadcrumb.Item
                onClick={() => {
                  navigate('/telemart/home');
                }}>
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item active style={{ color: '#D80303' }}>
                {get(selectedCategory, 'title', null)}
              </Breadcrumb.Item>
            </Breadcrumb>{' '}
          </div>

          <div className="custom-drop col-md-3 col-sm-5">
            <SortByDropDown label={label} handleMenuClick={handleMenuClick} />
          </div>
        </div>
        <section className="similar-products p-4 mt-1">
          {products.length > 0 ? (
            <div className="row g-4">
              {orderBy(
                products,
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
                          {pro?.discountedPrice && pro?.productPrice ? (
                            <s className="ms-3">Rs.{get(pro, 'productPrice', 0)} </s>
                          ) : null}
                        </div>
                        {pro?.discountedPrice && pro?.productPrice ? (
                          <Badge>{getPercentage(pro.productPrice, pro.discountedPrice)}</Badge>
                        ) : null}
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
          ) : (
            !loading && (
              <h5 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,color:"grey"}}>No Data Found</h5>
            )
          )}
        </section>
        <div className="page-pagination">
          <Pagination
            onChange={onPaginationHandler}
            current={currentPage}
            total={totalPage}
            pageSize={pageSize}
            showSizeChanger={true}
            onShowSizeChange={onShowSizeChange}
            showQuickJumper={false}
            responsive={true}
            pageSizeOptions={[5, 10, 20, 50]}
          />
        </div>
      </div>
    </>
  );
};

export default ProuductList;
