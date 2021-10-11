import React , { useState , useEffect} from 'react'
import { useParams } from 'react-router'
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from 'react-query'
import { Formik, Form } from 'formik'
import  * as Yup from 'yup'
import FormikControl from '../../hoc/formikComponents/FormikControl.js'
import ToastInstance from '../../hoc/notificationSettings/ToastInstance'
import Fetcher from '../../hoc/fetcherSetting/FetcherSetting'
import '../GeneralCss.css'

function RegisterUser() {
    const history = useHistory();
    const {usercode} = useParams();
    const backDate = () => {
        var todayDate = new Date();
        var year_18 = todayDate.getFullYear() - 18;
        return new Date(todayDate.getDate() + "-" + todayDate.getMonth() + "-" + year_18)
    }
    const { data: roleList, isLoading } = useQuery(
        'listrole',
        () => Fetcher('get', '/api/role/get/list/keyvalue', {}))
    
    const { data: user, isLoading : userLoading} = useQuery(
        'user',
        () => { if(usercode) return Fetcher('get', '/api/profile/get/menudetails/'+usercode, {})})

    const [initialValues, setInitialValues] = useState({
        _id                 : "",
        userName            : "",
        name                : "",
        emailId             : "",
        mobileNum           : "",
        dob                 : "",
        dom                 : "",
        gender              : "",
        picUrl              : "",
        roleId              : "",
    })

    useEffect(() => {
        if(user && user.data.response){
            console.log("user data ",user.data.response)
            var tempData  = user.data.response
            tempData.dob = Date.parse(tempData.dob)
            tempData.dom = Date.parse(tempData.dom)
            tempData.emailId = tempData.emails
            setInitialValues(user.data.response)
        }
    }, [user && !userLoading]);

    const genderOptions = [
        { key: 'Select', value: '' },
        { key: 'Male', value: 'male' },
        { key: 'Female', value: 'female' },
        { key: 'Other', value: 'other' },
    ]

    const validationSchema = Yup.object({
        name            : Yup.string().required('Required!!'),
        emailId         : Yup.string().email('Invalid Email Format').required('Required!!'),
        mobileNum       : Yup.string().max(10),
        dob             : Yup.date().default(function () { return backDate();}).required('Required!!'),
        gender          : Yup.string(),
        // picUrl          : "",
        roleId          : Yup.string().required('Required!!')
    })

    const mutation = useMutation((params) => Fetcher('post', '/api/user/post/createuser', params), {
        onSuccess(data) {
            if (data.data.responseCode === 0) {
                ToastInstance('Success', 'User Added')
                history.push('/admin/user/view/'+data.data.response)
            } else {
                var msg = 'User - ' + data.data.responseMsg;
                ToastInstance('Error', msg)
            }
        },
        onError(error) {
            console.log('Got error from backend', error)
            ToastInstance('Error', 'User' + error)
        }
    })

    const mutationEdit = useMutation((params) => Fetcher('patch', '/api/profile/patch/userdetails', params), {
        onSuccess(data) {
            if (data.data.responseCode === 0) {
                ToastInstance('Success', 'User Edited')
                history.push('/admin/user/view/'+data.data.response)
            } else {
                var msg = 'User - ' + data.data.responseMsg;
                ToastInstance('Error', msg)
            }
        },
        onError(error) {
            console.log('Got error from backend', error)
            ToastInstance('Error', 'User' + error)
        }
    })

    const onSubmit = values => {
        var tempValues = values
        tempValues.userName = tempValues.mobileNum
        console.log('Form data ',values)
        if(values._id !== ""){
            tempValues.id = tempValues._id
            mutationEdit.mutate(values)
        }else{
            mutation.mutate(values)
        }
    }

    if(isLoading || (usercode && userLoading)) return <h1>Loading</h1>

    return (
        <Formik
                enableReinitialize  = {true}
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
                                            <FormikControl control='input' type='text' label='Mobile Number' name='mobileNum' placeholder="Mobile Number" />
                                        </div>

                                        <div className="form2RowDiv">
                                            <FormikControl control='date' label='Birth Date' name='dob' />
                                            <FormikControl control='date' label='Marriage Date' name='dom' />
                                        </div>

                                        <div className="form2RowDiv">
                                            <FormikControl control='select' label='Gender' name='gender' options={genderOptions} />
                                            <FormikControl control='select' label='Role' name='roleId' options={roleList.data.response} />
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
