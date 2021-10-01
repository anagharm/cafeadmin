import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../hoc/formikComponents/FormikControl.js'
import { useMutation, useQuery } from 'react-query'
import ToastInstance from '../../hoc/notificationSettings/ToastInstance'
import Fetcher from '../../hoc/fetcherSetting/FetcherSetting'

function Menu() {
    const [initialValues, setInitialValues] = useState({ 
                                                            id          : "", 
                                                            menu        : "",
                                                            description	: "",
                                                            price  		: 0,
                                                            available   : true,
                                                        })
    const validationSchema = Yup.object({
        menu        : Yup.string().required('Required!!'),
        description	: Yup.string().required('Required!!'),
        price  		: Yup.number().required('Required!!'),
        available   : Yup.boolean().required('Required'),
    })

    const availableOptions = [
        { key : true , value : "Available" },
        { key : false , value : "Not Available" },
    ]
    const onSubmit = (values, { setSubmitting, resetForm }) => {
        console.log("values ",values)
        resetForm({ 
                        id          : "", 
                        menu        : "",
                        description	: "",
                        price  		: 0,
                        available   : true,
                })
        if(values.id === ""){
            // mutation.mutate(values)
        }else{
            // mutationEdit.mutate(values)
        }
    }
    return (
        <Formik
                initialValues       = {initialValues}
                enableReinitialize  = {true}
                validationSchema    = {validationSchema}
                onSubmit            = {onSubmit}
        >
                {
                    formik =>   <Form>
                                    <div className="formOuterDiv">
                                        <div className="form1RowDiv"> 
                                            <FormikControl control='input' type='text' label='Menu' name='menu' placeholder="Dish Name" />                                        
                                        </div>
                                        <div className="form1RowDiv"> 
                                            <FormikControl control='textarea' type='text' label='Description' name='description' placeholder="Description of the Dish" />                                        
                                        </div>
                                        <div className="form2RowDiv"> 
                                            <FormikControl control='input' type='number' label='Price' name='price' placeholder="Price" />                                        
                                            <FormikControl control='radio' label='Is Available' name='available' />                                        
                                        </div>
                                        {/* <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Submit</button> */}
                                    </div>
                                </Form>
                }
        </Formik>
    )
}

export default Menu
