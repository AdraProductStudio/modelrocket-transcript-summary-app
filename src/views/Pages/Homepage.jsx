import React, { Fragment, useEffect, useState } from "react";
import Image from "Utils/Image";
import DataTable from "react-data-table-component";

import MainPagesHeader from "components/Panel_compnent/MainPagesHeader";
import FooterCopyrights from "components/Panel_compnent/FooterCopyrights";
import ModalComponent from "components/Modal/Modal";
import FormCheck from "components/Input/FormCheck";
import JsonData from "Utils/JsonData";
import { useDispatch } from "components/CustomHooks";
import {
  handleChangeOption,
  handleGetClients,
  handleChangeClient,
  handleGetClientSummaryData,
} from "Redux/Actions/Transcript_summary_actions/Transcript_summary_action";
import FormSelect from "components/Input/FormSelect";
import SpinnerComponent from "components/Spinner/Spinner";
import store from "StoreIndex";
import { handleUpdateModalShow } from "Redux/Actions/Common_actions/Common_action";

const Homepage = () => {
  const [modalData, setModalData] = useState({});


  const state = store.getState();
  const transcriptSummaryState = state?.transcriptSummaryState;
  const commonState = state?.commonState;


  const { homePageFormRadio } = JsonData().jsonOnly;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGetClients());
  }, []);


  useEffect(() => {
    if (transcriptSummaryState?.selectedClient) {
      dispatch(
        handleGetClientSummaryData(transcriptSummaryState?.selectedClient)
      );
    }
  }, [transcriptSummaryState?.selectedClient]);

  useEffect(() => {
    console.log(transcriptSummaryState?.data);
  }, [transcriptSummaryState?.data]);

  const columns = [
    {name:"S.No",
      selector: (row,index) => <p className="table-content text-center">{row?.S_No}</p>,
      width: "80px",
    },
    {
      name: "Call Type",
      selector: (row) => <p className="table-content">{row?.call_type}</p>,
    },
    {
      name: "Type of Engagement",
      selector: (row) => (
        <p className="table-content">{row?.conversation_id}</p>
      ),
    },
    {
      name: "Time of Engagement",
      selector: (row) => <p className="table-content">{row?.created_at}</p>,
    },
    {
      name: "Is Qualified?",
      selector: (row) => <p className="table-content">{row?.is_qualified}</p>,
    },
    {
      name: "Service Name",
      selector: (row) => <p className="table-content">{row?.service_name}</p>,
    },
    {
      name: "Transcript Summary",
      selector: (row) => (
        <div className="d-flex justify-content-center align-items-center">
        <p
          className="table-content"
          onClick={() => {
            setModalData(row);
            console.log(row, "row");
            dispatch(handleUpdateModalShow);
          }}
        >
          {Image.eyeIcon}
        </p>
      
        <p className="table-content">
          {row?.transcript_summary
            ? row.transcript_summary.split(" ").slice(0, 15).join(" ") + (row.transcript_summary.split(" ").length > 15 ? "..." : "")
            : "No Summary Available"}
        </p>
      </div>
      
          )},  
    {
      name: "User Phone No",
      selector: (row) => <p className="table-content">{row?.usr_phoneno}</p>,
    },
  ];

  const customStyles = {
    headCells: {
      style: {  
        color: "#222",
        fontSize: "20px",
        fontWeight: 500,
        paddingLeft: "0px",
        justifyContent: "center",
      },
    },
  };

  return (
    <>
      <div className="model-rocket-home d-flex flex-column placeholder-glow">
        <MainPagesHeader />

        <div className="model-rocket-content d-flex flex-column justify-content-evenly align-items-center overflow-hidden">
          <div className="filter-button-container d-flex  justify-content-md-end align-items-center">
            {transcriptSummaryState?.initialGlow ? (
              <div className="col-5 col-lg-2 me-3 placeholder py-3 pb-4 rounded"></div>
            ) : (
              <div className="col-5 col-lg-2 me-3">
                <FormSelect
                  className="py-2 border-0 "
                  options={transcriptSummaryState?.clientNames}
                  change={(e) => dispatch(handleChangeClient(e.target.value))}
                  value={transcriptSummaryState?.selectedClient}
                />
              </div>
            )}

            {transcriptSummaryState?.initialGlow ||
            transcriptSummaryState?.dataTableLoading ? (
              <Fragment>
                <div className="col-3 col-sm-2 col-lg-1 me-3 placeholder py-3 pb-4 rounded"></div>
                <div className="col-3 col-sm-2 col-lg-1 me-3 placeholder py-3 pb-4 rounded"></div>
              </Fragment>
            ) : (
              homePageFormRadio.map((val, ind) => (
                <div
                  className="checkbox p-2 me-3 px-4"
                  key={ind}
                  onClick={() => dispatch(handleChangeOption(val?.label))}
                >
                  <FormCheck
                    formType="radio"
                    formLabel={val?.label}
                    formClassName="me-2"
                    formId={val?.label}
                    formChecked={val?.value === val?.label ? true : false}
                    change={() => dispatch(handleChangeOption(val?.label))}
                  />
                </div>
              ))
            )}
          </div>

          <div className="body-table">
            {transcriptSummaryState?.dataTableLoading ? (
              <div className="col-12 h-100 d-flex align-items-center justify-content-center">
                <div className="col-4 text-center">
                  <SpinnerComponent />
                  <p className="text-secondary mt-2">Loading data...</p>
                </div>
              </div>
            ) : (
              <div className="table-container card p-3">
                <DataTable
                  className="fs-4"
                  columns={columns}
                  data={transcriptSummaryState?.data}
                  customStyles={customStyles}
                  pagination
                />
              </div>
            )}
          </div>
        </div>

        <FooterCopyrights />
      </div>

      <ModalComponent
        modalShow={commonState?.modalShow}
        modalSize="md"
        modalCentered={true}
        showModalHeader={true}
        modalHeader={"Transcript Summary"}
        modalBody={<p>{modalData.transcript_summary || 'No summary available'}</p>}
        showModalFooter={true}
        modalFooter={<button className="btn btn-primary" onClick={() => dispatch(handleUpdateModalShow)}>Done</button>} 

      />

    </>
  );
};

export default Homepage;
