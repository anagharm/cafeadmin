import React from 'react'
import './AuthCss.css'
import { Formik, Form } from 'formik'
import  * as Yup from 'yup'
import FormikControl from '../../hoc/formikComponents/FormikControl'
import { useMutation } from 'react-query'
import ToastInstance from '../../hoc/notificationSettings/ToastInstance'
import { useHistory } from "react-router-dom";
import Fetcher from '../../hoc/fetcherSetting/FetcherSetting'

function SignIn() {
    const history = useHistory();
    const initialValues = {
        emailId         : "",
        password        : "",
    }
    const validationSchema = Yup.object({
        emailId         : Yup.string().email('Invalid Email Format').required('Required!!'),
        password        : Yup.string().required('Required!!'),
    })
    const onSubmit = values => {
        console.log('Form data ',values)
        mutation.mutate(values)
    }
    const mutation = useMutation((params) => Fetcher('post','/api/user/post/signin',params), {
		onSuccess(data){
			console.log('Got response from backend',data)
            if(data.data.responseCode === 0){
                ToastInstance('Success','User Loged In')
                history.push('/commingsoon');
            }else{
                var msg = 'User Not Registered - ' + data.data.responseMsg;
                ToastInstance('Error',msg)
            }
		},
		onError(error){
			console.log('Got error from backend',error)
            ToastInstance('Error','User Not Registered'+error)
		}
	})
    return (
        <Formik
                initialValues       = {initialValues}
                validationSchema    = {validationSchema}
                onSubmit            = {onSubmit}
        >
                {
                    formik =>   <div className="signOuterDiv">
                                    <Form>
                                        <div className="formSign">
                                            <FormikControl control='input' type='email' label='Email' name='emailId' placeholder="Email ID" />
                                        </div>
                                        <div className="formSign">
                                            <FormikControl control='input' type='password' label='Password' name='password' placeholder="Password" />
                                        </div>
                                        <div className="signSubmitDiv">
                                                <button type="submit" className="btn signSubmit" disabled={!formik.isValid}><span className="submitButton">Submit</span></button>
                                        </div>
                                        {/* <div className="row">
                                            <div className="col-lg-6 align-right">
                                                <a href="/forgotpassword">Forgot Password</a>
                                            </div>
                                            <div className="col-lg-6 align-right">
                                                <a href="/signup">Sign Up</a>
                                            </div>
                                        </div> */}
                                    </Form>
                                </div>
                }
        </Formik>
    )
}

export default SignIn
