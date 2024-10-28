// import axios from "axios";
// import { useDispatch } from "components/CustomHooks";
// import { useSelector } from "react-redux";
// import { handleLogin } from "Redux/Actions/Common_actions/Common_action";

// let token = null;

// const axiosInstance = axios.create({
//   // baseURL: "http://10.10.24.1:5000/",
//   baseURL: process.env.REACT_APP_API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// axiosInstance.interceptors.response.use(
//   (response) => {
//     // if (response.data.error_code === 0) {
//     //   // toast.success(response.data.message);
//     // } else {
//     //   // toast.error(response.data.message);
//     // }
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     const dispatch = useDispatch();

//     if (error.response && error.response.status === 401 && error.response.data.msg === "Token has expired") {
//       originalRequest._retry = true;

     
//       const basicAuth = "Basic " + btoa(`${username}:${password}`);

//       await dispatch(handleLogin(basicAuth));
//       return axiosInstance(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const commomState = useSelector((state) => state.commomState);
//     console.log(commomState?.token,"commomState?.token")
//     if (commomState?.token) {
//       token = commomState?.token;
//     }

//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;


import axios from "axios";
import store from "StoreIndex"; // Assume this exports your Redux store
import { handleLogin } from "Redux/Actions/Common_actions/Common_action";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && error.response.data.msg === "Token has expired") {
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        const state = store.getState();
        const { usernamee, passwordd } = state?.commonState; // Ensure these are stored securely

        // let username = window.atob(usernamee)
        // let password = window.atob(passwordd)
        // let hashPassword = sha256(password) 
        // const basicAuth = "Basic " + btoa(`${username}:${hashPassword}`);

        let username = "matsuri"
        let password = "fc153ac36455604c6a6bcb3e22c0a4debfb746d59ad4a33a4b0d50f315206958d78da64e88957993e537e5ef235537a65ac0bc8fbaa725ae3e8e151617e82b81"
        const basicAuth = "Basic " + btoa(`${username}:${password}`);

        await store.dispatch(handleLogin(basicAuth));
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state?.commonState?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;