import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { useEffect } from 'react';
import { handleScreenSize } from 'Redux/Actions/Common_actions/Common_action';

//navigation hook
export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const customNavigate = (path, options = {}) => {
    navigate(path, options);
  };
  return customNavigate;
};


//uselocation hook
export const CustomUseLocationHook = () => {
  const location = useLocation()
  const splitPath = location.pathname.split('/')


  return splitPath
}


//use dispatch hook 
export const useDispatch = () => {
  const dispatch = useReduxDispatch();

  const customDispatch = (action) => {
    return dispatch(action);
  };

  return customDispatch;
};



//window size 
export const useSize = () => {
  const dispatch = useReduxDispatch();

  useEffect(() => {
    const windowSizeHandler = () => {
      dispatch(handleScreenSize(
        {
          innerHeight: window.innerHeight,
          innerWidth: window.innerWidth,
        }
      ))

    };
    window.addEventListener("resize", windowSizeHandler);

    return () => {
      window.removeEventListener("resize", windowSizeHandler);
    };
  }, []);

  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
  }
};