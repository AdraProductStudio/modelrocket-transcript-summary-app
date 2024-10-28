import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleBearerToken, handleOnlineOffilne, handleScreenSize } from "Redux/Actions/Common_actions/Common_action";
import { useCustomNavigate, useSize } from "components/CustomHooks";
import Login from "views/common/Login";
import Cookies from 'js-cookie'
import Homepage from "views/Pages/Homepage";

const App = () => {
  const { isOnline, token ,usernamee ,passwordd} = useSelector((state) => state.commonState);
  const sizer = useSize();
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();

  useEffect(() => {
    dispatch(handleOnlineOffilne(navigator.onLine))
    dispatch(handleScreenSize(sizer))
    dispatch(handleBearerToken(Cookies.get("token")))
  }, [])

  useEffect(() => {
    if (!token || !usernamee || !passwordd) {
      navigate("/")
    }
  }, [token])

  window.addEventListener('online', () => {
    dispatch(handleOnlineOffilne(true))
  });

  window.addEventListener('offline', () => {
    dispatch(handleOnlineOffilne(false))
  });


  return isOnline ?
    <HelmetProvider>
      <ToastContainer theme='light' />
      <Routes>
        {/* login page  */}
        <Route index element={<Login />} />

        {/* options  */}
        <Route path="home">
          {/* home page  */}
          <Route index element={<Homepage />} />
        </Route>

        {/* not found  */}
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </HelmetProvider>
    :
    <p>No internet connection</p>
}
export default App;