
import React from 'react';
// import Logo from '../../../assets/icons/images/oneload-logo.jpg' ;
// import Logo from '../../assets/' ;
import '../../assets/termloan/css/styles.min.css'
const SuspendingLoading = () => {
    return (
        <div className="app-loader">
            <div className="d-flex align-items-center flex-column px-4">
                <img alt="" src={null} width="80px" />
            </div>
            <div className="text-muted font-size-xl text-center pt-3">Loading...</div>
        </div>
    );
};

export default SuspendingLoading;
