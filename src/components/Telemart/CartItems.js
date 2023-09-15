import React from 'react';
import { Button, Card } from 'react-bootstrap';
import DeleteIcon from '../../assets/images/delete_icon.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUpdateCartItems } from '../../reducers/telemart';
import { getProductPrice } from '../../utils/helpers';
import { cloneDeep } from 'lodash';
const Cartitems = ({ handleShowPopup }) => {
  const { cartItems } = useSelector((state) => state.telemartSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleQuantity = (isAdd, item) => {
    let quantity = item.quantity;
    let data = cloneDeep(cartItems);
    const findProductIndex = data.findIndex((v) => v.productId === item.productId);

    if (isAdd) {
      data[findProductIndex].quantity = quantity + 1;
      dispatch(setUpdateCartItems(data));
    }
    if (!isAdd && quantity > 1) {
      data[findProductIndex].quantity = quantity - 1;
      dispatch(setUpdateCartItems(data));
    }
    dispatch(setUpdateCartItems(data));
  };
  const handleRemoveItem = (item) => {
    const removeProducts = cartItems.filter((v) => v.productId !== item.productId);

    dispatch(setUpdateCartItems(removeProducts));
  };

  return (
    <div>
      <div className="header-name mt-2">
        <strong>Cart</strong>
        <span>({cartItems.length} items)</span>
      </div>
      <>
        {cartItems.map((res, i) => (
          <Card className="card" key={i}>
            <div className="img-wrap ms-2">
              <Card.Img variant="top" className="item-image" src={res.imageUrl} alt="CartImage" />
            </div>
            <Card.Body>
              <Card.Text className="cart-price mb-1">RS {getProductPrice(res)}</Card.Text>
              <Card.Text className="cart-name mb-3">{res.productTitle}</Card.Text>
              {/* <Card.Text className="mb-1 item-sizing">Color: Green</Card.Text> */}
              {/* <Card.Text className="item-sizing">{res.productTitle}</Card.Text> */}
              <div className="item-added-remove">
                <Card.Text className="add-item">
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      handleQuantity(false, res);
                    }}>
                    -
                  </span>{' '}
                  <span>{res.quantity}</span>{' '}
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      handleQuantity(true, res);
                    }}>
                    +
                  </span>
                </Card.Text>
                <Card.Text className="delete-item cursor-pointer">
                  <img
                    src={DeleteIcon}
                    alt="DelIcon"
                    onClick={() => {
                      handleRemoveItem(res);
                    }}
                  />
                  <span
                    onClick={() => {
                      handleRemoveItem(res);
                    }}>
                    Remove
                  </span>
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        ))}
      </>
    </div>
  );
};

export default Cartitems;
