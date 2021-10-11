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

function Menu() {
    const history = useHistory();
    const {menucode} = useParams();
    console.log("menucode ",menucode)
    const [initialValues, setInitialValues] = useState({ 
                                                            _id         : "", 
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

    const { data: menu, isLoading : menuLoading} = useQuery(
        'menu',
        () => { if(menucode) return Fetcher('get', '/api/menu/get/menudetails/'+menucode, {})})
    
    useEffect(() => {
        if(menu && menu.data.response){
            console.log("menu data ",menu.data.response)
            setInitialValues(menu.data.response)
        }
    }, [menu && !menuLoading]);

    const availableOptions = [
        { value : true , key : "Available" },
        { value : false , key : "Not Available" },
    ]
    const mutation = useMutation((params) => Fetcher('post', '/api/menu/post/addmenu', params), {
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

    const mutationEdit = useMutation((params) => Fetcher('patch', '/api/menu/patch/menu', params), {
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
                                        <div className="form1RowDiv"> 
                                            <FormikControl control='input' type='text' label='Menu' name='menu' placeholder="Dish Name" />                                        
                                        </div>
                                        <div className="form1RowDiv"> 
                                            <FormikControl control='textarea' type='text' label='Description' name='description' placeholder="Description of the Dish" />                                        
                                        </div>
                                        <div className="form2RowDiv"> 
                                            <FormikControl control='input' type='number' label='Price' name='price' placeholder="Price" />                                        
                                            <FormikControl control='select' label='Is Available' name='available' options={availableOptions}/>                                        
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

export default Menu
