import { useSelector } from "react-redux"

const JsonData = () => { 

    //main selectors
    const transcriptSummaryState = useSelector((state) => state.transcriptSummaryState)
    const jsonOnly = {
        homePageFormRadio: [
            {
                label:"All",
                value:transcriptSummaryState?.radioBtnValue
            },
            {
                label:"Leads",
                value:transcriptSummaryState?.radioBtnValue
            } 
        ]
    }

    const jsxJson = {


    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData