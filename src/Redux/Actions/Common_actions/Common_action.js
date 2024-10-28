import axios from 'axios';
import {
    updateModalShow,
    updateCanvasShow,
    updateIsonline,
    updateCurrentNavMenuIndex,
    updateScreenCurrentDimension,
    updateLoginCredentials,
    updateEyeFunction,

    clearLoginError,
    loginRequest,
    loginResponse,
    loginFailure,
    updateToken,
    logout
} from 'Redux/Slices/Common_Slice/Common_slice';



export const handleUpdateModalShow = (dispatch) => {
    dispatch(updateModalShow())
}

export const handleUpdateCanvasShow = (dispatch) => {
    dispatch(updateCanvasShow())
}

export const handleOnlineOffilne = (isOnline) => dispatch => {
    dispatch(updateIsonline(isOnline))
}

export const handleCurrentMenuInd = (menus, myCurrPath) => dispatch => {
    if (myCurrPath) {
        const currInd = menus.filter((v) => myCurrPath === v.route_name ? v : null)
        dispatch(updateCurrentNavMenuIndex(currInd[0]?.in))
    } else {
        dispatch(updateCurrentNavMenuIndex(0))
    }
}

export const handleScreenSize = (currentSize) => (dispatch) => {
    dispatch(updateScreenCurrentDimension(currentSize))
}

export const handleLoginCredentials = (data) => (dispatch) => {
    dispatch(updateLoginCredentials(data))
}

export const handleEyeFunction = () => dispatch => {
    dispatch(updateEyeFunction())
}

export const handleClearErrors = dispatch => {
    dispatch(clearLoginError())
}

export const handleLogin = (basicAuth) => async (dispatch) => {
    try {
        dispatch(loginRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/gettoken`,
            {
                headers: {
                    Authorization: basicAuth,
                },
            }
        );

        if (data.error_code === 200) {
            dispatch(loginResponse(data?.data?.token))
        } else {
            dispatch(loginFailure(data?.message))
        }
    } catch (err) {
        dispatch(loginFailure(err))
    }
}

export const handleBearerToken = (token) => dispatch => {
    dispatch(updateToken(token))
}

export const handleLogout = () => dispatch =>{
    dispatch(logout())
}