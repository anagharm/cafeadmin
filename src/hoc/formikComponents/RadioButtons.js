import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function RadioButtons(props) {
    const { label, name, options, ...rest } = props
    return (
        <div className="formSingleElement">
            <Field name={name} className="formSingleElementField">
                {
                    ({ field }) => {
                        return options.map(option => {
                            return(
                                <React.Fragment key={option.key}>
                                    <input className="col-sm-3"
                                        type="radio" 
                                        id={option.value}
                                        {...field} 
                                        {...rest} 
                                        value={option.value} 
                                        checked={field.value === option.value}
                                    />

                                    <label  htmlFor={option.value}>{option.key}</label>
                                    
                                </React.Fragment>
                            )
                        })
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}

export default RadioButtons
