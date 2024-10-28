import React, { Fragment, useEffect, useState } from "react";
import Image from 'Utils/Image';
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";
import MainPagesHeader from "components/Panel_compnent/MainPagesHeader";
import FooterCopyrights from "components/Panel_compnent/FooterCopyrights";
import ModalComponent from "components/Modal/Modal";
import FormCheck from "components/Input/FormCheck";
import JsonData from "Utils/JsonData";
import { useDispatch } from "components/CustomHooks";
import { handleChangeOption, handleGetClients, handleChangeClient, handleGetClientSummaryData } from "Redux/Actions/Transcript_summary_actions/Transcript_summary_action";
import FormSelect from "components/Input/FormSelect";
import SpinnerComponent from "components/Spinner/Spinner";
import store from "StoreIndex";

const Homepage = () => {
  const [modalShow, setModalShow] = useState(false);
  const handleModel = () => setModalShow(!modalShow);
  const [modalData, setModalData] = useState({});

  
  const state = store.getState();
  const  transcriptSummaryState  = state?.transcriptSummaryState
  const { homePageFormRadio } = JsonData().jsonOnly;
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(handleGetClients())
  }, [])

  useEffect(() => {
    if (transcriptSummaryState?.selectedClient) {
      dispatch(handleGetClientSummaryData(transcriptSummaryState?.selectedClient))
    }
  }, [transcriptSummaryState?.selectedClient])

  const columns = [
    {
      name: "S.No",
      selector: (row) => <p className="table-content">{row.id}</p>,
      width: "80px",
    },
    {
      name: "Type of Engagement",
      selector: (row) => <p className="table-content">{row.typeEngagement}</p>,
    },
    {
      name: "Time of Engagement",
      selector: (row) => <p className="table-content">{row.timeEngagement}</p>,
    },
    {
      name: "Is Qualified?",
      selector: (row) => <p className="table-content">{row.isQualified}</p>,
    },
    {
      name: "Service Name",
      selector: (row) => <p className="table-content">{row.serviceName}</p>,
    },
    {
      name: "Transcript Summary",
      selector: (row) => (
        <div className="d-flex justify-content-center align-items-center">
          <p
            className="table-content"
            onClick={() => {
              setModalData(row);
              handleModel();
            }}
          >
            {Image.eyeIcon}
          </p>
          <p className="table-content">{row.transcriptSummary}</p>
        </div>
      ),
    },
    {
      name: "User Phone No",
      selector: (row) => <p className="table-content">{row.userPhoneNo}</p>,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        font: "Poppins !important",
        color: "#222",
        fontSize: "20px",
        fontWeight: 500,
        paddingLeft: "0px",
      },
    },
  };

  const data = [
    { id: 1, typeEngagement: "type-of-engagement", timeEngagement: "time-of-engagement", isQualified: "yes", serviceName: "service-name", transcriptSummary: "transcript-summary", userPhoneNo: "user-phone-no" },
    { id: 2, typeEngagement: "type-of-engagement", timeEngagement: "time-of-engagement", isQualified: "no", serviceName: "service-name", transcriptSummary: "transcript-summary", userPhoneNo: "user-phone-no" },
    { id: 3, typeEngagement: "type-of-engagement", timeEngagement: "time-of-engagement", isQualified: "yes", serviceName: "service-name", transcriptSummary: "transcript-summary", userPhoneNo: "user-phone-no" },
    { id: 4, typeEngagement: "type-of-engagement", timeEngagement: "time-of-engagement", isQualified: "no", serviceName: "service-name", transcriptSummary: "transcript-summary", userPhoneNo: "user-phone-no" },
    { id: 5, typeEngagement: "type-of-engagement", timeEngagement: "time-of-engagement", isQualified: "yes", serviceName: "service-name", transcriptSummary: "transcript-summary", userPhoneNo: "user-phone-no" },
    { id: 6, typeEngagement: "type-of-engagement", timeEngagement: "time-of-engagement", isQualified: "no", serviceName: "service-name", transcriptSummary: "transcript-summary", userPhoneNo: "user-phone-no" },
    { id: 7, typeEngagement: "type-of-engagement", timeEngagement: "time-of-engagement", isQualified: "yes", serviceName: "service-name", transcriptSummary: "summary", userPhoneNo: "user-phone-no" },
    { id: 8, typeEngagement: "type-of-engagement", timeEngagement: "time-of-engagement", isQualified: "no", serviceName: "service-name", transcriptSummary: "transcript", userPhoneNo: "user-phone-no" },
    { id: 9, typeEngagement: "type-of-engagement", timeEngagement: "time-of-engagement", isQualified: "yes", serviceName: "service-name", transcriptSummary: "hello", userPhoneNo: "user-phone-no" },
    { id: 10, typeEngagement: "type-of-engagement", timeEngagement: "time-of-engagement", isQualified: "no", serviceName: "service-name", transcriptSummary: "trans", userPhoneNo: "user-phone-no" },
  ];



  return (
    <>
      <div className="model-rocket-home d-flex flex-column placeholder-glow">
        <MainPagesHeader />

        <div className="model-rocket-content d-flex flex-column justify-content-evenly align-items-center overflow-hidden">
          <div className="filter-button-container d-flex  justify-content-md-end align-items-center">
            {
              transcriptSummaryState?.initialGlow ?
                <div className="col-5 col-lg-2 me-3 placeholder py-3 pb-4 rounded"></div>
                :
                <div className="col-5 col-lg-2 me-3">
                  <FormSelect
                    className="py-2 border-0 "
                    options={transcriptSummaryState?.clientNames}
                    change={(e) => dispatch(handleChangeClient(e.target.value))}
                    value={transcriptSummaryState?.selectedClient}
                  />
                </div>
            }


            {
              transcriptSummaryState?.initialGlow || transcriptSummaryState?.dataTableLoading ?
                <Fragment>
                  <div className="col-3 col-sm-2 col-lg-1 me-3 placeholder py-3 pb-4 rounded"></div>
                  <div className="col-3 col-sm-2 col-lg-1 me-3 placeholder py-3 pb-4 rounded"></div>
                </Fragment>
                :

                homePageFormRadio.map((val, ind) => (
                  <div className="checkbox p-2 me-3 px-4" key={ind} onClick={() => dispatch(handleChangeOption(val?.label))}>
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
            }
          </div>

          <div className="body-table">
            {
              transcriptSummaryState?.dataTableLoading ?
                <div className="col-12 h-100 d-flex align-items-center justify-content-center">
                  <div className="col-4 text-center">
                    <SpinnerComponent />
                    <p className="text-secondary mt-2">Loading data...</p>
                  </div>
                </div>
                :
                <div className="table-container card p-3">
                  <DataTable
                    className="fs-4"
                    columns={columns}
                    // data={filteredData}
                    customStyles={customStyles}
                    pagination
                  />

                </div>
            }
          </div>
        </div>

        <FooterCopyrights />
      </div>

      {/* <ModalComponent

      /> */}


      {/* <Modal show={modalShow} onHide={handleModel} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Transcript Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalData?.typeEngagement}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModel}>
            Done
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default Homepage;
