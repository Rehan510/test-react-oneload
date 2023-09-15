import { createSlice } from '@reduxjs/toolkit';

export const telemartSlice = createSlice({
  name: 'example',
  initialState: {
    name: 'yess i am working fine',
    selectedScreen: 'cart-items',
    selectedCategory: null,
    selectedProduct: null,
    selectedProductAttributes:[],
    cartItems: [],
    isSelfBuyer: false,
    customer: null,
    categories: [],
    similarProducts: [],
    userDetail: null,
    billDetail: null,
    isProductsSearch: false,
    searchProducts: [],
    chargesDetail: null,
    transactionDetail: null,
    favouriteMetaData: null,
    searchProductCurrentPage: 1,
    searchProductPageSize: 20,
    searchProductLabel: {
      label: 'Best Match',
      key: 'best_match',
      fetchTypeName: 'best match'
    },
    searchProductTotal: 1,
    searchedProduct: null,

  },
  reducers: {
    test: (state) => {
      return { ...state, name: 'Ok' };
    },
    setSelectedScreen: (state, action) => {
      return { ...state, selectedScreen: action.payload };
    },
    setSelectedCategory: (state, action) => {
      return { ...state, selectedCategory: action.payload };
    },
    setSelectedProduct: (state, action) => {
      return { ...state, selectedProduct: action.payload };
    },
    setCartItems: (state, action) => {
      const userId = localStorage.getItem('user');
      const newCartItems = [...state.cartItems, action.payload];
      localStorage.setItem(`cartItems${userId}`, JSON.stringify(newCartItems));
      return { ...state, cartItems: newCartItems };
    },
    setUpdateCartItems: (state, actions) => {
      const userId = localStorage.getItem('user');
      const updatedCartItems = actions.payload;
      localStorage.setItem(`cartItems${userId}`, JSON.stringify(updatedCartItems));
      return { ...state, cartItems: updatedCartItems };
    },
    setIsSelfBuyer: (state, actions) => {
      return { ...state, isSelfBuyer: actions.payload };
    },
    setCustomerDetail: (state, actions) => {
      return { ...state, customer: actions.payload };
    },
    setCategories: (state, actions) => {
      return { ...state, categories: actions.payload };
    },
    setSimilarProducts: (state, actions) => {
      return { ...state, similarProducts: actions.payload };
    },
    setUserDetail: (state, actions) => {
      return { ...state, userDetail: actions.payload };
    },
    setBillDetail: (state, actions) => {
      return { ...state, billDetail: actions.payload };
    },
    setIsProductsSearch: (state, actions) => {
      return { ...state, isProductsSearch: actions.payload };
    },
    setSearchProducts: (state, actions) => {
      return { ...state, searchProducts: actions.payload };
    },
    setChargesDetail: (state, actions) => {
      return { ...state, chargesDetail: actions.payload };
    },
    setTransationDetail: (state, actions) => {
      return { ...state, transactionDetail: actions.payload };
    },
    setFavouriteMetaData: (state, actions) => {
      return { ...state, favouriteMetaData: actions.payload };
    },
    setSearchProductPageSize: (state, actions) => {
      return { ...state, searchProductPageSize: actions.payload };
    },
    setSearchProductCurrentPage: (state, actions) => {
      return { ...state, searchProductCurrentPage: actions.payload };
    },
    setSearchProductLabel: (state, actions) => {
      return { ...state, searchProductLabel: actions.payload };
    },
    setSearchProductTotal: (state, actions) => {
      return { ...state, searchProductTotal: actions.payload };
    },
    setSearchedProduct: (state, actions) => {
      return { ...state, searchedProduct: actions.payload };
    },
    setSelectedProductAttributtes: (state, actions) => {
      return { ...state, selectedProductAttributes: actions.payload };

    }
  }
});

export const {
  test,
  setSelectedScreen,
  setSelectedCategory,
  setSelectedProduct,
  setCartItems,
  setUpdateCartItems,
  setIsSelfBuyer,
  setCustomerDetail,
  setCategories,
  setSimilarProducts,
  setUserDetail,
  setBillDetail,
  setIsProductsSearch,
  setSearchProducts,
  setChargesDetail,
  setTransationDetail,
  setFavouriteMetaData,
  setSearchProductPageSize,
  setSearchProductCurrentPage,
  setSearchProductLabel,
  setSearchProductTotal,
  setSearchedProduct,
  setSelectedProductAttributtes
} = telemartSlice.actions;
export default telemartSlice.reducer;
