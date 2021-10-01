import React , { useState , useEffect} from 'react'
import { useParams } from 'react-router'
import { useHistory } from "react-router-dom";
import { Formik, Form } from 'formik'
import  * as Yup from 'yup'
import FormikControl from '../../hoc/formikComponents/FormikControl.js'
import '../GeneralCss.css'

function RegisterUser() {
    const backDate = () => {
        var todayDate = new Date();
        var year_18 = todayDate.getFullYear() - 18;
        return new Date(todayDate.getDate() + "-" + todayDate.getMonth() + "-" + year_18)
    }
    const history = useHistory();

    const initialValues = {
                            userName            : "",
                            name                : "",
                            emailId             : "",
                            mobNum              : "",
                            dob                 : "",
                            dom                 : "",
                            gender              : "",
                            picUrl              : "",
                            role                : "",
    }

    const genderOptions = [
        { key: 'Select', value: '' },
        { key: 'Male', value: 'male' },
        { key: 'Female', value: 'female' },
        { key: 'Other', value: 'other' },
    ]

    const validationSchema = Yup.object({
        firstName       : Yup.string().required('Required!!'),
        lastName        : Yup.string().required('Required!!'),
        emailId         : Yup.string().email('Invalid Email Format').required('Required!!'),
        mobNum          : Yup.string(),
        dob             : Yup.date().default(function () { return new Date();}),
        gender          : Yup.string(),
        // picUrl          : "",
    })
    
    const onSubmit = values => {
        var tempValues = values
        tempValues.userName = tempValues.mobNum
        console.log('Form data ',values)
        // mutation.mutate(values)
    }

    return (
        <Formik
                initialValues       = {initialValues}
                validationSchema    = {validationSchema}
                onSubmit            = {onSubmit}
        >
                {
                    formik =>   <Form>
                                    <div className="formOuterDiv">
                                        <div className="form1RowDiv">
                                            <FormikControl control='input' type='text' label='Name' name='name' placeholder="Name" />
                                        </div>

                                        <div className="form2RowDiv">
                                            <FormikControl control='input' type='email' label='Email Id' name='emailId' placeholder="Email Id" />
                                            <FormikControl control='input' type='text' label='Mobile Number' name='mobNum' placeholder="Mobile Number" />
                                        </div>

                                        <div className="form2RowDiv">
                                            <FormikControl control='date' label='Birth Date' name='dob' />
                                            <FormikControl control='date' label='Marriage Date' name='dom' />
                                        </div>

                                        <div className="form2RowDiv">
                                            <FormikControl control='select' label='Gender' name='gender' options={genderOptions} />
                                            <FormikControl control='select' label='Role' name='role' options={genderOptions} />
                                        </div>

                                        <div className="submitButtonDiv">
                                            <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Submit</button>
                                        </div>
                                    </div>
                                </Form>
                }
        </Formik>
    )
}

export default RegisterUser