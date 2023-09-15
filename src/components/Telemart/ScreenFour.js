import React from 'react';
import { Select } from 'antd';
import { Button, Badge, Card } from 'react-bootstrap';
import CardImg from '../../assets/images/smallCard.png';
import TabImage from '../../assets/images/tabImg.png';
import AddToCart from '../../assets/images/addToCart.png';

const ScreenFour = () => {
  const options = [
    {
      value: 'jack',
      label: 'Small'
    },
    {
      value: 'lucy',
      label: 'Large'
    }
  ];

  const smallData = [
    {
      cradImage: CardImg,
      cardHeading: 'Lenovo LP40 Wireless Bluetooth Earbuds',
      cardDiscountPrice: 'Rs. 5000',
      cardActualPrice: 'Rs. 7000',
      cardOff: '95 % OFF'
    },
    {
      cradImage: CardImg,
      cardHeading: 'Lenovo LP40 Wireless Bluetooth Earbuds',
      cardDiscountPrice: 'Rs. 5000',
      cardActualPrice: 'Rs. 7000',
      cardOff: '95 % OFF'
    },
    {
      cradImage: CardImg,
      cardHeading: 'Lenovo LP40 Wireless Bluetooth Earbuds',
      cardDiscountPrice: 'Rs. 5000',
      cardActualPrice: 'Rs. 7000',
      cardOff: '95 % OFF'
    },
    {
      cradImage: CardImg,
      cardHeading: 'Lenovo LP40 Wireless Bluetooth Earbuds',
      cardDiscountPrice: 'Rs. 5000',
      cardActualPrice: 'Rs. 7000',
      cardOff: '95 % OFF'
    }
  ];

  return (
    <div className="container-fluid">
      <section className="product-details">
        <div className="row">
          <div className="col-lg-5">
            <div className="product-images">
              <div className="image-preview">
                <img src={TabImage} alt="TabImage" />
              </div>
              <div className="thumbnails-wrapper">
                <div className="row">
                  <div className="col">
                    <div className="thumbnail">
                      <img src={TabImage} alt="TabImage" />
                    </div>
                  </div>
                  <div className="col">
                    <div className="thumbnail">
                      <img src={TabImage} alt="TabImage" />
                    </div>
                  </div>
                  <div className="col">
                    <div className="thumbnail">
                      <img src={TabImage} alt="TabImage" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="product-info ps-lg-4">
              <h1>8.5 Inch LCD TAB Writing Tablet</h1>
              <div className="product-price">
                <span className="price">Rs. 5000</span>
                <span className="cut-price">Rs. 7000</span>
                <span className="off-price">95 % OFF</span>
              </div>
              <ul className="more-info">
                <li>
                  <strong>Delivery Time</strong>
                  <span>2 to 4 Days</span>
                </li>
                <li>
                  <strong>Availability</strong>
                  <span>In Stock</span>
                </li>
                <li>
                  <strong>Brand</strong>
                  <span>Lenovo</span>
                </li>
                <li>
                  <strong>Size</strong>
                  <Select defaultValue="lucy" size="large" options={options} />
                </li>
                <li>
                  <strong>Quantity</strong>
                  <div className="add-item">
                    <span className="cursor-pointer">-</span> <span>1</span> <span className="cursor-pointer">+</span>
                  </div>{' '}
                </li>
              </ul>
              <div className="button-group">
                <Button className="add-to-cart">Add to Cart</Button>
                <Button className="buy-now ms-5">Buy Now</Button>
              </div>
            </div>
          </div>
        </div>

        {/* description */}
        <div className="card-descriptions">
          <div className="container-fluid">
            <div className="description-title p-4">
              <strong className="card-title">Description</strong>
            </div>
            <div className="card-heading p-4">
              <div className=" description-details">
                <div className="left-details">
                  <strong>General Features</strong>
                  <p>
                    Release Date <span>2023-07-05</span>{' '}
                  </p>
                  <p>
                    SIM Support <span>Dual Sim</span>
                  </p>
                  <p>
                    Operating System <span>Propriietary OS</span>
                  </p>
                  <strong>Display</strong>
                  <p>
                    Screen Size <span> 1.4 inches</span>
                  </p>
                  <strong>Battery</strong>
                  <p>
                    Type<span>1200 mAh</span>
                  </p>
                </div>

                <div className="center-line"></div>

                <div className="right-details ">
                  <strong> Memory</strong>
                  <p>
                    Internal Memory <span> Standard</span>
                  </p>
                  <p>
                    RAM <span> Standard</span>
                  </p>
                  <p>
                    Card Slot <span> Yes</span>{' '}
                  </p>
                  <strong> Connectivity</strong>
                  <p>
                    Bluetooth <span> Yes</span>
                  </p>
                  <p>
                    Radio <span> Yes</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* similar products */}
      <section className="similar-products p-4">
        <div className="container-fluid">
          <p className="product-heading mb-3">Similar Products</p>
          <div className="row">
            {smallData.map(() => {
              return (
                <div className="col-lg-3 col-md-6 mt-2">
                  <Card className="small-card-container">
                    <div className="image-section">
                      <Card.Img className="card-image" variant="top" src={CardImg} />
                    </div>
                    <Card.Body>
                      <Card.Text className="mb-2 card-text">Lenovo LP40 Wireless Bluetooth Earbuds</Card.Text>
                      <div className="price-discount">
                        <span className="after-discount-price">Rs. 5000</span>
                        <span className="ms-2 exact-price">Rs. 7000</span>
                      </div>
                      <Badge bg="white" className="p-0 discount-percentage" text="dark">
                        95 % OFF
                      </Badge>
                    </Card.Body>
                    <Button className="add-cart-button ">
                      <div className="button-icon">
                        <img src={AddToCart} alt="AddToCartImage" />
                        <span>ADD TO CART</span>
                      </div>
                    </Button>
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

export default ScreenFour;
