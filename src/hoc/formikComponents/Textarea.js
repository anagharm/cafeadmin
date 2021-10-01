import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Textarea(props) {
    const { label , name, ...rest } = props
    return (
        <div className="formSingleElement" >
            <label  className="formSingleElementLabel" htmlFor={name}>{label}</label>            
            <Field  as="textarea" id={name} name={name} {...rest} className="formSingleElementField"/>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}

export default Textarea