import { createSlice } from "@reduxjs/toolkit";

const TranscriptSummarySlice = createSlice({
  name: "Transcript_summary_slice",
  initialState: {
    radioBtnValue: "All",
    initialGlow: false,
    dataTableLoading: false,
    clientNames: [],
    data: [],
    datatableDatas: [],
    selectedClient: "",
  },
  reducers: {
    updateRadioBtnValue(state, actions) {

        const changedata = state.datatableDatas.filter((val) => val?.is_qualified === "Y");

      return {
        ...state,
        data: actions.payload==="Leads" ? changedata : state.datatableDatas,
        radioBtnValue: actions.payload,
      };
    },

    //get clients api
    clientNamesRequest(state, actions) {
      return {
        ...state,
        initialGlow: true,
      };
    },
    clientNamesResponse(state, actions) {
      return {
        ...state,
        clientNames: actions.payload,
        selectedClient: actions.payload[0]?.name,
        initialGlow: false,
      };
    },
    clientNamesFailure(state, actions) {
      return {
        ...state,
        initialGlow: false,
        err: actions.payload,
      };
    },

    //client on-change
    updateClientName(state, actions) {
      return {
        ...state,
        selectedClient: actions.payload,
        radioBtnValue: "All",
      };
    },

    // summary reports api
    getSummaryRequest(state, actions) {
      return {
        ...state,
        dataTableLoading: true,
      };
    },
    getSummaryResponse(state, actions) {
      return {
        ...state,
        dataTableLoading: false,
        data: actions.payload,
        datatableDatas: actions.payload,
      };
    },
    getSummaryFailure(state, actions) {
      return {
        ...state,
        dataTableLoading: false,
        err: actions.payload,
      };
    },

    //api error
    clearError(state, actions) {
      return {
        ...state,
        err: null,
      };
    },
  },
});

const { actions, reducer } = TranscriptSummarySlice;

export const {
  updateRadioBtnValue,
  clientNamesRequest,
  clientNamesResponse,
  clientNamesFailure,
  updateClientName,
  getSummaryRequest,
  getSummaryResponse,
  getSummaryFailure,

  clearError,
} = actions;

export default reducer;
