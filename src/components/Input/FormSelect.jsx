import React from 'react'
import { Form } from 'react-bootstrap'

const FormSelect = ({
    componentFrom,
    className,
    options,
    change,
    value
}) => {


    return (
        <Form.Select onChange={change} className={className}>
            <option value="">select</option>
            {options?.map((val, ind) => (
                <option value={val?.name} key={ind} selected={value === val?.name ? true : false}>
                    {val?.name}
                </option>
            ))}
        </Form.Select>
    )
}

export default FormSelect