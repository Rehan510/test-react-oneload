import axios from 'axios';
// import { refreshToken } from '../utils/helpers';
import config from '../config/config';
export default {
  initalise: () => {
    axios.defaults.baseURL = config.apiUrl;
    // axios.defaults.withCredentials = true
    // Request Interceptor. All Request pass from here
    axios.interceptors.request.use(
      (axiosConfig) => {
        let authToken = localStorage.getItem('token');
        let userName = localStorage.getItem('user');
        // axiosConfig.headers['userCredentials'] = 'MDMxNDQwMDczMDA6ZXBAMTQ2OTA=';
        if (authToken) {
          // axiosConfig.headers['userCredentials'] = authToken;
          axiosConfig.headers['userCredentials'] = authToken;
          axiosConfig.headers['userName'] = userName;
          axiosConfig.headers['channelId'] = 'Oneload';
          axiosConfig.headers['subChannelId'] = 'Oneload';
          axiosConfig.headers['Content-Type'] = 'application/json';
        }
        axiosConfig.headers['Content-Type'] = 'application/json';
        return axiosConfig;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    /*
                    Response Interceptor
                    Responsibilities:
                    1- If api sends new token then change the store auth token with new token
                    2- If api sends 401 token then send user to login page
                */

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      function (error) {
        console.log(error);

        // if (get(error, 'response.status', '') === 401) {
        //   localStorage.removeItem('auth_token');

        //   const path = window.location.pathname;
        //   if (path !== '/PagesRegister' && path !== '/LandingPage' && path !== '/' && path !== '/ImpersonateLogin') {
        //     localStorage.setItem('redirect_url', JSON.stringify(window.location));
        //   }
        //   if (path !== '/PagesRegister') {
        //     window.location.href = '/PagesRegister';
        //   }
        // } else {
        //   return Promise.reject(error);
        // }
      }
    );
  }
};
