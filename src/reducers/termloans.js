import { createSlice } from '@reduxjs/toolkit';

const states = {
    test: 'rehan ',
    selectedTab: 'dashboard',
    userDetail: null,
    userOptStatus: null,
    loanInfo: null
};
export const termAndLoanService = createSlice({
    name: 'term-loans',
    initialState: states,
    reducers: {
        setSelectedTab: (state, action) => {
            return { ...state, selectedTab: action.payload };
        },
        setUserDetail: (state, actions) => {
            return { ...state, userDetail: actions.payload };
        },

        setLoanInfo: (state, actions) => {
            return { ...state, loanInfo: actions.payload };
        },
        setApplyLoanData: (state, actions) => {
            return { ...state, applyLoanData: actions.payload };
        }
    }
});

export const { setSelectedTab, setUserDetail, setLoanInfo, setApplyLoanData } = termAndLoanService.actions;
export default termAndLoanService.reducer;
