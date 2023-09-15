import moment from 'moment';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const OtpInput = ({ changeCompHandler, otpErrorMessage, verifyOtpHandler, countState }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const nonEmptyCount = otp.filter((item) => item).length;

  const otpInputs = useRef([]);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          if (!otpErrorMessage) {
            changeCompHandler('resend-otp');
          }
          return 60;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const formattedTimer = moment.utc(timer * 1000).format('mm:ss');

  const numbers = '0123456789';

  const handleOtpChange = (e, index) => {
    if (numbers.includes(e.target.value.slice(-1))) {
      const { value } = e.target;
      const otpCopy = [...otp];
      otpCopy[index] = value;
      setOtp(otpCopy);

      if (value !== '' && index < otpInputs.current.length - 1) {
        otpInputs.current[index + 1].focus();
      }
    } else {
      toast.dismiss();
      toast.error('Enter only Numerics Number');
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      e.preventDefault();
      if (index > 0) {
        otpInputs.current[index - 1].focus();
      }
    }
  };

  const isWrongOtp = true;

  return (
    <div className="opt-wrapper">
      <p className="opt-description">Enter OTP to confirm the Loan Request</p>
      <div className="otp-container">
        {otp.map((value, index) => (
          <input
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleOtpChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(ref) => (otpInputs.current[index] = ref)}
            className={otpErrorMessage ? 'otp-input wrong-otp' : 'otp-input'}
            key={index}
          />
        ))}
        {isWrongOtp && <p className="error-message">{otpErrorMessage}</p>}
      </div>
      {countState !== 4 && (
        <>
          <div className="resend-code">
            <p>
              Resend Code in <b className="ps-4">{formattedTimer}</b>
            </p>
          </div>
          <Button className="continue-button" disabled={nonEmptyCount < 4} onClick={() => verifyOtpHandler(otp)}>
            Continue
          </Button>
        </>
      )}
    </div>
  );
};

export default React.memo(OtpInput);
