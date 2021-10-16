import React from 'react'
import { Field, ErrorMessage, FieldArray } from 'formik'
import TextError from './TextError.js'
import '../../components/GeneralCss.css'

function FieldArrayMenu(props) {
    const { label, name,...rest } = props
    return (
            <div className="formSingleElement">
                <label className="formSingleElementLabel">{label}</label>
                {/*<Field id={name} name={name} {...rest} className="formSingleElementField"/>*/}
                <FieldArray name={name}>
                    {
                        (fieldArrayProps) => {
                                                const { push, remove, form } = fieldArrayProps 
                                                const { values } = form
                                                const { orderedMenu } = values
                                                return <div>
                                                            {
                                                                orderedMenu.map((item, index) => (
                                                                    <div key={index}>
                                                                        <Field name={`orderedMenu[${index}].menu`} />
                                                                        <Field name={`orderedMenu[${index}].price`} />
                                                                        <Field name={`orderedMenu[${index}].qty`} />
                                                                        <Field name={`orderedMenu[${index}].totalPrice`} />
                                                                        {
                                                                            index > 0 &&
                                                                            <button type="button" onClick={() => remove(index)}>{'  '} - {'  '}</button>
                                                                        }                                                                            
                                                                        <button type="button" onClick={() => push('')}> Add </button>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                             }
                    }
                </FieldArray>
                <ErrorMessage name={name} component={TextError}/>
            </div>
    )
}

export default FieldArrayMenu
