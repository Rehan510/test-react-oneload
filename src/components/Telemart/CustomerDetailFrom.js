import React, { useState } from 'react';
import { setSelectedScreen, setCustomerDetail } from '../../reducers/telemart';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
const Customerdetail = () => {
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.telemartSlice);
  const [name, setName] = useState(get(customer, 'name', ''));
  const [phoneNumber, setPhoneNumber] = useState(get(customer, 'phoneNumber', ''));
  const [cnic, setCnic] = useState(get(customer, 'cnic', ''));
  const [email, setEmail] = useState(get(customer, 'email', ''));
  const [errors, setErrors] = useState({});
  const numbers = '0123456789';

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Validate phone number
    const phoneNumberRegex = /^03\d{9}$/;
    if (!phoneNumber.match(phoneNumberRegex)) {
      newErrors.phoneNumber = 'Invalid phone number. It should start with 03 and have 11 digits.';
    }

    // Validate CNIC number
    const cnicRegex = /^\d{13}$/;
    if (!cnic.match(cnicRegex)) {
      newErrors.cnic = 'Invalid CNIC number. Enter 13 digits.';
    }
    setErrors(newErrors);

    if (!email) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!email.match(emailRegex)) {
        newErrors.email = 'Invalid email. Please enter a valid email address.';
      }
    }

    // Proceed to the next step if there are no errors
    if (Object.keys(newErrors).length === 0) {
      dispatch(setCustomerDetail({ name, cnic, email, phoneNumber }));
      dispatch(setSelectedScreen('customer-detail'));
    }
  };

  const setErrorMessage = (err, msg) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [err]: msg
    }));
  };

  const handleChangeName = (e) => {
    const enteredName = e.target.value;

    const nameRegex = /^[a-zA-Z\s]*$/;

    if (!nameRegex.test(enteredName) || enteredName.length < 3) {
      // Remove any non-alphabetic characters from the entered name

      const formattedName = enteredName.replace(/[^a-zA-Z\s]/g, '');

      setName(formattedName);

      setErrorMessage('name', 'Invalid input. Only alphabetic characters are allowed.');
    } else {
      setName(enteredName);

      setErrorMessage('name', '');
    }
  };

  const handleChangePhoneNumber = (e) => {
    if (numbers.includes(e.target.value.slice(-1))) {
      const enteredNumber = e.target.value;
      setPhoneNumber(enteredNumber);

      const phoneNumberRegex = /^03\d{9}$/;
      if (!enteredNumber.match(phoneNumberRegex)) {
        setErrorMessage('phoneNumber', 'Invalid phone number. It should start with 03 and have 11 digits.');
      } else {
        setErrorMessage('phoneNumber', '');
      }
    }
  };

  const handleChangeCNIC = (e) => {
    if (numbers.includes(e.target.value.slice(-1))) {
      setCnic(e.target.value);

      const cnicRegex = /^\d{13}$/;
      if (!e.target.value.match(cnicRegex)) {
        setErrorMessage('cnic', 'Invalid CNIC number. Enter 13 digits.');
      } else {
        setErrorMessage('cnic', '');
      }
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!e.target.value.match(emailRegex) && e.target.value.length > 0) {
      setErrorMessage('email', 'Invalid email. Please enter a valid email address');
    } else {
      setErrorMessage('email', '');
    }
  };

  return (
    <div>
      <form className="customerDetails-container offset-lg-0 mt-3">
        <p className="customer-details-heading">Please enter customer details</p>
        <div className="customer-input">
          <input
            type="text"
            value={name}
            maxLength={30}
            onChange={(e) => handleChangeName(e)}
            placeholder="Enter Name"
          />
        {errors.name && <p className="error text-danger">{errors.name}</p>}
        </div>
        <div className="customer-input">
          <input
            type="text"
            value={phoneNumber}
            maxLength={11}
            onChange={(e) => handleChangePhoneNumber(e)}
            className="no-spin-arrow"
            placeholder="Enter Phone Number"
          />
        {errors.phoneNumber && <p className="error text-danger">{errors.phoneNumber}</p>}
        </div>
        <div className="customer-input">
          <input
            type="text"
            maxLength={13}
            value={cnic}
            onChange={(e) => handleChangeCNIC(e)}
            className="no-spin-arrow"
            placeholder="Enter CNIC Number"
          />
        {errors.cnic && <p className="error text-danger">{errors.cnic}</p>}
        </div>

        <div className="customer-input">
          <input
            type="email"
            maxLength={30}
            value={email}
            onChange={handleChangeEmail}
            className=""
            placeholder="Enter Email Address"
          />
        {errors.email && <p className="error text-danger">{errors.email}</p>}
        </div>
        <div className="d-flex">
          <button
            type="button"
            className="btn me-3 custom-back-button"
            onClick={() => {
              dispatch(setSelectedScreen('cart-items'));
            }}>
            Back
          </button>

          <button type="submit" className=" custom-next-button" onClick={handleSubmit}>
            Next to Retailers Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default Customerdetail;
