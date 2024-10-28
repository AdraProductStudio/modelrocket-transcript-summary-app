import axiosInstance from 'services/axiosInstance';
import {
    updateRadioBtnValue,
    clientNamesRequest,
    clientNamesResponse,
    clientNamesFailure,
    updateClientName,
    getSummaryRequest,
    getSummaryResponse,
    getSummaryFailure,
    clearError
} from 'Redux/Slices/Transcript_summary_slice/Transcript_summary_slice';



//functions 
export const handleChangeOption = (value) => dispatch => {
    dispatch(updateRadioBtnValue(value))
}

export const handleGetClients = () => async (dispatch) => {
    try {
        dispatch(clientNamesRequest())
        const { data } = await axiosInstance.get("/get_clients");
        dispatch(clientNamesResponse(data?.data))
    } catch (err) {
        dispatch(clientNamesFailure(err))
    }
}

export const handleChangeClient = (value) => (dispatch) => {
    dispatch(updateClientName(value))
}

export const handleGetClientSummaryData = (clientname) => async (dispatch) => {
    try {
        dispatch(getSummaryRequest())
        const obj = { client_name: clientname }
        const { data } = await axiosInstance.post("/get_client_conversation_details", obj);
        console.log(data)
        dispatch(getSummaryResponse())
    } catch (err) {
        dispatch(getSummaryFailure())
    }
}



//clear errors
export const handleClearErrors = dispatch => {
    dispatch(clearError())
}
