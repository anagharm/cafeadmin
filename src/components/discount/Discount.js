import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router'
import { useHistory } from "react-router-dom";
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../hoc/formikComponents/FormikControl.js'
import { useMutation, useQuery } from 'react-query'
import ToastInstance from '../../hoc/notificationSettings/ToastInstance'
import Fetcher from '../../hoc/fetcherSetting/FetcherSetting'
import '../GeneralCss.css'

function Discount() {
    const history = useHistory();
    const {discountcode} = useParams();
    console.log("discountcode ",discountcode)
    const [initialValues, setInitialValues] = useState({ 
                                                            _id             : "", 
                                                            typeofDiscount 	: "Total Bill",
                                                            discountAmt		: 0,
                                                            description		: "",
                                                            discountCode  	: "",
                                                            available   	: true,
                                                            discountFrom  	: new Date(),
                                                            discountTo  	: new Date(),
                                                        })
    const validationSchema = Yup.object({
        typeofDiscount 	: Yup.string().required('Required!!'),
        discountAmt		: Yup.number().required('Required!!'),
        description		: Yup.string().required('Required!!'),
        discountCode  	: Yup.string().required('Required!!'),
        available   	: Yup.boolean().required('Required'),
        // discountFrom  	: new Date(),
        // discountTo  	: new Date(),
    })

    const { data: discount, isLoading : discountLoading} = useQuery(
        'discount',
        () => { if(discountcode) return Fetcher('get', '/api/discount/get/discountdetails/'+discountcode, {})})
    
    useEffect(() => {
        if(discount && discount.data.response){
            console.log("discount data ",discount.data.response)
            var tempData          = discount.data.response
            tempData.discountFrom = Date.parse(tempData.discountFrom)
            tempData.discountTo   = Date.parse(tempData.discountTo)
            setInitialValues(tempData)
        }
    }, [discount && !discountLoading]);

    const availableOptions = [
        { value : true , key : "Available" },
        { value : false , key : "Not Available" },
    ]
    const mutation = useMutation((params) => Fetcher('post', '/api/discount/post/adddiscount', params), {
        onSuccess(data) {
            if (data.data.responseCode === 0) {
                ToastInstance('Success', 'Discount Added')
                history.push('/admin/discount/view/'+data.data.response)
            } else {
                var msg = 'Discount - ' + data.data.responseMsg;
                ToastInstance('Error', msg)
            }
        },
        onError(error) {
            console.log('Got error from backend', error)
            ToastInstance('Error', 'Discount' + error)
        }
    })

    const mutationEdit = useMutation((params) => Fetcher('patch', '/api/discount/patch/discount', params), {
        onSuccess(data) {
            if (data.data.responseCode === 0) {
                ToastInstance('Success', 'Discount Edited')
                history.push('/admin/discount/view/'+data.data.response)
            } else {
                var msg = 'Discount - ' + data.data.responseMsg;
                ToastInstance('Error', msg)
            }
        },
        onError(error) {
            console.log('Got error from backend', error)
            ToastInstance('Error', 'Discount' + error)
        }
    })
 
    const onSubmit = values => {
        var tempValues = values
        console.log('Form data ',values)
        if(values._id !== ""){
            tempValues.id = tempValues._id
            mutationEdit.mutate(values)
        }else{
            mutation.mutate(values)
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
                                        <div className="form2RowDiv"> 
                                            <FormikControl control='input' type='text' label='Discount Type' name='typeofDiscount' disabled/>                                        
                                            <FormikControl control='input' type='text' label='Discount Code' name='discountCode' placeholder="Discount Code" />                                        
                                        </div>
                                        <div className="form1RowDiv">
                                            <FormikControl control='textarea' type='text' label='Description' name='description' placeholder="Description" />                                        
                                        </div>
                                        <div className="form2RowDiv"> 
                                            <FormikControl control='select' label='Is Available' name='available' options={availableOptions}/>                                        
                                        </div>
                                        <div className="form2RowDiv"> 
                                            <FormikControl control='date' label='Start Date' name='discountFrom' />                                        
                                            <FormikControl control='date' label='Till Date' name='discountTo' />                                        
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

export default Discount
