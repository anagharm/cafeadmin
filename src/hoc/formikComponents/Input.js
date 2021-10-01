import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError.js'
import '../../components/GeneralCss.css'
function Input(props) {
    const { label, name, ...rest } = props
    return (
            <div className="formSingleElement">
                <label className="formSingleElementLabel">{label}</label>
                <Field id={name} name={name} {...rest} className="formSingleElementField"/>
                <ErrorMessage name={name} component={TextError}/>
            </div>
    )
}

export default Input