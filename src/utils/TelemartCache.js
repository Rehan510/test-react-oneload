import React, { useEffect, useCallback, memo } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { setCategories, setUserDetail, setUpdateCartItems, setFavouriteMetaData } from '../reducers/telemart';
import { statusCode } from './helpers';
import config from '../config/config';
const TelemartCache = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const user = queryParams.get('user');
    const accountType = queryParams.get('userType');
    const kyc = queryParams.get('userKyc');
    const dispatch = useDispatch();

    console.log(window.location.pathname)



    if (!token) {
        window.location.href = config.redirectUrl;
    }



    if (accountType.toLowerCase() !== 'retailer' && accountType.toLowerCase() !== 'ofs_retailer') {
        window.parent.location.href = config.homeUrl;
    }




    useEffect(() => {
        localStorage.setItem('user', user);
        if (user) {
            const cartItems = localStorage.getItem(`cartItems${user}`);
            if (cartItems) {
                dispatch(setUpdateCartItems(JSON.parse(cartItems)));
            }
        }
    }, [user, dispatch]);






    localStorage.setItem('token', token);
    localStorage.setItem('kyc', kyc);















    const getUserDetail = useCallback(async () => {
        let resp = null;
        try {
            const data = await axios.get('/oneload-telemart-api/logged-in-user');
            const error = statusCode[get(data, 'data.error', true)];
            if (!error) {
                resp = get(data, 'data.data', null);
            }
            dispatch(setUserDetail(resp));
        } catch (error) {
            dispatch(setUserDetail(null));
        }
    }, [dispatch]);














    const getCategories = useCallback(async () => {
        let resp = null;
        let filteredData = [];
        try {
            resp = await axios.post('/oneload-telemart-api/categories', {});
            const error = get(resp, 'data.error', true);
            if (!error) {
                filteredData = get(resp, 'data.data', []).map((d) => {
                    return {
                        id: d.partnerCategoryId,
                        parent_id: d.parentId,
                        title: d.categoryTitle,
                        disabled: !get(d, 'activeInd', false),
                        category_id: d.categoryId
                    };
                });
            }
            dispatch(setCategories(filteredData));
        } catch (error) {
            dispatch(setCategories([]));
        }
    }, [dispatch]);














    const getUserFav = useCallback(async () => {
        let resp = null;
        try {
            const data = await axios.get('/oneload-telemart-api/favourite-meta');
            const error = statusCode[get(data, 'data.error', true)];

            if (!error) {
                resp = get(data, 'data.data', null);
            }
            dispatch(setFavouriteMetaData(resp));
        } catch (error) {
            dispatch(setFavouriteMetaData(resp));
        }
    }, [dispatch]);

    useEffect(() => {
        getUserDetail();
        getCategories();
        getUserFav();
    }, [getCategories, getUserDetail, getUserFav]);

    return <></>;
};

export default memo(TelemartCache);
