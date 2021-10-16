import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router'
import { useHistory } from "react-router-dom";
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import FormikControl from '../../hoc/formikComponents/FormikControl.js'
import { useMutation, useQuery } from 'react-query'
import ToastInstance from '../../hoc/notificationSettings/ToastInstance'
import Fetcher from '../../hoc/fetcherSetting/FetcherSetting'
import '../GeneralCss.css'

function Order() {
    const history = useHistory();
    const {ordercode} = useParams();
    console.log("ordercode ",ordercode)
    const [initialValues, setInitialValues] = useState({ 
                                                            _id                 : "", 
                                                            orderNum            : 0,
                                                            orderDate           : new Date(),
                                                            orderedMenu	        : [{
                                                                                    menu_Id 	: "",
                                                                                    menu 		: "",
                                                                                    price 		: 0,
                                                                                    qty         : 0,
                                                                                    totalPrice  : 0,
                                                                                }],
                                                            // menus               : ["Data1","Data22"],
                                                            totalAmount  		: 0,
                                                            discountId  		: "",
                                                            discountCode  		: "",
                                                            discoutAmt  		: 0,
                                                            customerName        : "",
                                                            customerMobNum      : "",
                                                            orderStatus         : ""
                                                        })
    const validationSchema = Yup.object({
        orderDate           : Yup.date().required('Required!!'),
        // orderedMenu	        : ,
        totalAmount  		: Yup.number().required('Required!!'),
        // discountId  		: "",
        discoutAmt  		: Yup.number().required('Required!!'),
        customerName        : Yup.string().required('Required!!'),
        customerMobNum      : Yup.string().required('Required!!'),
        orderStatus         : Yup.string().required('Required!!')
    })

    const statusOptions = [
        { value : "Order Placed" , key : "Order Placed" },
        { value : "Order In Process" , key : "Order In Process" },
        { value : "Order Served" , key : "Order Served" },
        { value : "Order Completed" , key : "Order Completed" },
        { value : "Order Cancelled" , key : "Order Cancelled" },
    ]

    const { data: order, isLoading : orderLoading} = useQuery(
        'menu',
        () => { if(ordercode) return Fetcher('get', '/api/order/get/orderdetails/'+ordercode, {})})

    const { data: discount, isLoading : discountLoading} = useQuery(
        'menu',
        () => Fetcher('get', '/api/discount/get/list/keyvalue', {}))

    const { data: menu, isLoading : menuLoading} = useQuery(
        'menu',
        () => Fetcher('get', '/api/menu/get/list/keyvalue', {}))
    
    const mutation = useMutation((params) => Fetcher('post', '/api/order/post/addorder', params), {
        onSuccess(data) {
            if (data.data.responseCode === 0) {
                ToastInstance('Success', 'Menu Added')
                history.push('/admin/menu/view/'+data.data.response)
            } else {
                var msg = 'Menu - ' + data.data.responseMsg;
                ToastInstance('Error', msg)
            }
        },
        onError(error) {
            console.log('Got error from backend', error)
            ToastInstance('Error', 'Menu' + error)
        }
    })

    const mutationEdit = useMutation((params) => Fetcher('patch', '/api/order/patch/order', params), {
        onSuccess(data) {
            if (data.data.responseCode === 0) {
                ToastInstance('Success', 'Menu Edited')
                history.push('/admin/menu/view/'+data.data.response)
            } else {
                var msg = 'Menu - ' + data.data.responseMsg;
                ToastInstance('Error', msg)
            }
        },
        onError(error) {
            console.log('Got error from backend', error)
            ToastInstance('Error', 'Menu' + error)
        }
    })

    const onSubmit = values => {
        var tempValues = values
        console.log('Form data ',values)
        // if(values._id !== ""){
        //     tempValues.id = tempValues._id
        //     mutationEdit.mutate(values)
        // }else{
        //     mutation.mutate(values)
        // }
    }

    if(orderLoading && menuLoading && discountLoading) return <h1>Loading</h1>

    return (
        <Formik
                initialValues       = {initialValues}
                enableReinitialize  = {true}
                // validationSchema    = {validationSchema}
                onSubmit            = {onSubmit}
        >
                {
                    formik =>   <Form>
                                    <div className="formOuterDiv">
                                        <div className="form2RowDiv"> 
                                            <FormikControl control='showdata' label="Order Date" value={moment(initialValues.orderDate).format("DD-MMM-YYYY")} />                                        
                                            <FormikControl control='showdata' label="Order Number" value={initialValues.orderNum} />                                        
                                        </div>
                                        <div className="submitButtonDiv"></div>
                                        <div className="form1RowDiv">
                                            <FormikControl control="addmenu" label="Select Dish" name="menus" />
                                        </div>
                                        <div className="submitButtonDiv"></div>
                                        <div className="submitButtonDiv">
                                            <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Submit</button>
                                        </div>
                                    </div>
                                </Form>
                }
        </Formik>
    )
}

export default Order
