import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const commonSlice = createSlice({
    name: 'common slice',
    initialState: {
        modalShow: false,
        canvasShow: false,
        isOnline: true,
        currentNavMenuIndex: 0,
        innerWidth: 0,
        innerHeight: 0,
        buttonSpinner: false,

        //login states
        usernamee: '',
        passwordd: '',
        eyeOpen: false,
        validated: false,

        //token
        token: Cookies.get('token')
    },
    reducers: {
        updateModalShow(state, actions) {
            return {
                ...state,
                modalShow: !state.modalShow
            }
        },
        updateCanvasShow(state, actions) {
            return {
                ...state,
                canvasShow: !state.canvasShow
            }
        },
        updateIsonline(state, actions) {
            return {
                ...state,
                isOnline: actions.payload
            }
        },
        updateCurrentNavMenuIndex(state, actions) {
            return {
                ...state,
                currentNavMenuIndex: actions.payload
            }
        },
        updateScreenCurrentDimension(state, actions) {
            return {
                ...state,
                innerWidth: actions.payload?.innerWidth,
                innerHeight: actions.payload?.innerHeight
            }
        },


        //login states
        updateLoginCredentials(state, actions) {
            const type = Object.keys(actions.payload)[0]; 
            switch (type) {
                case "username":
                    return {
                        ...state,
                        validated: false,
                        usernamee: window.btoa(actions.payload?.username)
                    }
                case "password":
                    return {
                        ...state,
                        validated: false,
                        passwordd: window.btoa(actions.payload?.password)
                    }
                default:
                    return
            }
        },
        updateEyeFunction(state, actions) {
            return {
                ...state,
                eyeOpen: !state.eyeOpen
            }
        },


        //api 
        loginRequest(state, actions) {
            return {
                ...state,
                buttonSpinner: true 
            }
        },
        loginResponse(state, actions) {
            Cookies.set("token", actions.payload) 
            return {
                ...state,
                buttonSpinner: false,
                eyeOpen: !state.eyeOpen,
                token: actions.payload
            }
        },
        loginFailure(state, actions) {
            return {
                ...state,
                loginErr:actions.payload,
                buttonSpinner: false,
                token:null
            }
        },  


        //bearer token 
        updateToken(state,actions){
            return {
                ...state,
                token : actions.payload
            }
        },
        
        //clearing error states
        clearLoginError(state, actions) {
            return {
                ...state,
                loginErr: null
            }
        },

        //logout
        logout(state,actions){
            Cookies.remove("token")
            return{
                ...state,
                token:null
            }
        }
    }
})

const { actions, reducer } = commonSlice;

export const {
    updateModalShow,
    updateCanvasShow,
    updateIsonline,
    updateCurrentNavMenuIndex,
    updateScreenCurrentDimension,
    updateLoginCredentials,
    updateEyeFunction,
    updateLoginError,
    clearLoginError,
    loginRequest,
    loginResponse,
    loginFailure,
    updateToken,
    logout
} = actions;

export default reducer