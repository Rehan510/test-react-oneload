import React from 'react';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
const Customerdetail = () => {
  const { isSelfBuyer, customer, userDetail } = useSelector((state) => state.telemartSlice);

  return (
    <div className="menuDetails ">
      <div className="leftDetails">
        {!isSelfBuyer && (
          <>
            <strong>Customer Details</strong>
            <div className="des-detail">
              <p className="rates">
                Name <span>{get(customer, 'name', null)}</span>
              </p>
              <p className="rates">
                Phone Number <span>{get(customer, 'phoneNumber', null)}</span>{' '}
              </p>
              <p className="rates">
                CNIC Number <span>{get(customer, 'cnic', null)}</span>
              </p>
              <p className="rates">
                Email Address <span>{get(customer, 'email', null)}</span>{' '}
              </p>
              <hr className="new1" />
            </div>
          </>
        )}
        <strong>Retailers Details</strong>
        <div className="des-detail">
          <p className="rates">
            Name <span>{get(userDetail, 'fullName', null)}</span>
          </p>
          <p className="rates">
            Business Name {userDetail?.businessName ? <span>{userDetail.businessName}</span> : <span>N/A</span>}
          </p>
          <p className="rates">
            Business Address <span>{get(userDetail, 'address', null)}</span>{' '}
          </p>
          <p className="rates">
            Phone Number<span>{get(userDetail, 'cellPhone', null)}</span>{' '}
          </p>
          <p className="rates">
            CNIC <span>{get(userDetail, 'cnicNumber', null)}</span>
          </p>
        </div>

        <div className="d-flex" style={{ marginTop: isSelfBuyer ? '13rem' : '' }}></div>
      </div>
    </div>
  );
};

export default Customerdetail;
