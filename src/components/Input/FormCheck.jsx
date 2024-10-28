import React from 'react'
import { Form } from 'react-bootstrap'

const FormCheck = ({
    componentFrom,
    formType,
    formLabel,
    formClassName,
    formId,
    formChecked,
    change
}) => {


    return (
        <Form.Check
            type={formType}
            label={formLabel}
            id={formId}
            className={formClassName}
            onChange={change}
            checked={formChecked}
        />
    )
}

export default FormCheck