import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../hoc/formikComponents/FormikControl.js'
import { useMutation, useQuery } from 'react-query'
import ToastInstance from '../../hoc/notificationSettings/ToastInstance'
import Fetcher from '../../hoc/fetcherSetting/FetcherSetting'
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';
import { useQueryClient } from 'react-query'

function Role() {
    const queryClient = useQueryClient();
    const [initialValues, setInitialValues] = useState({ id: "", role: "" })
    const validationSchema = Yup.object({
        role: Yup.string().required('Required!!'),
    })
    const onSubmit = (values, { setSubmitting, resetForm }) => {
        resetForm({ id: "", role: "" })
        if(values.id === ""){
            mutation.mutate(values)
        }else{
            mutationEdit.mutate(values)
        }
    }
    const mutation = useMutation((params) => Fetcher('post', '/api/role/post/addrole', params), {
        onSuccess(data) {
            if (data.data.errorCode === 0) {
                ToastInstance('Success', 'Role Added')
                queryClient.invalidateQueries('listrole');
            } else {
                var msg = 'Role - ' + data.data.errorMsg;
                ToastInstance('Error', msg)
            }
        },
        onError(error) {
            console.log('Got error from backend', error)
            ToastInstance('Error', 'Role' + error)
        }
    })
    const mutationEdit = useMutation((params) => Fetcher('patch', '/api/role/patch/role', params), {
        onSuccess(data) {
            if (data.data.errorCode === 0) {
                ToastInstance('Success', 'Role Edited')
                queryClient.invalidateQueries('listrole');
                setInitialValues({ id: "", role: "" })
            } else {
                var msg = 'Role - ' + data.data.errorMsg;
                ToastInstance('Error', msg)
            }
        },
        onError(error) {
            console.log('Got error from backend', error)
            ToastInstance('Error', 'Role' + error)
        }
    })
    const mutationDelete = useMutation((params) => Fetcher('delete', '/api/role/delete/role', params), {
        onSuccess(data) {
            if (data.data.errorCode === 0) {
                ToastInstance('Success', 'Role Deleted')
                queryClient.invalidateQueries('listrole');
            } else {
                var msg = 'Role - ' + data.data.errorMsg;
                ToastInstance('Error', msg)
            }
        },
        onError(error) {
            console.log('Got error from backend', error)
            ToastInstance('Error', 'Role' + error)
        }
    })
    const { data: roleList, isLoading } = useQuery(
        'listrole',
        () => Fetcher('get', '/api/role/get/list', {}))
    function editData(item) {
        setInitialValues({
            id: item._id,
            role: item.role 
        })
    }
    function deleteData(deleteId) {
        var jsonRequest = { id: deleteId }
        mutationDelete.mutate(jsonRequest)
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
                                        <div className="singleFieldForm"> 
                                            <FormikControl control='input' type='text' label='Role' name='role' placeholder="Role" />                                        
                                            <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Submit</button>
                                        </div>
                                        <div style={{border:"1px solid red", marginTop:"1%"}}>
                                            {
                                                !isLoading ?
                                                    <div>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Role</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    roleList && roleList.data && roleList.data.response.length > 0 && roleList.data.response.map((item,index) => {
                                                                        return(
                                                                            <tr key={index}>
                                                                                <td>{index + 1}</td>
                                                                                <td>{item.role}</td>
                                                                                <td className="text-center">
                                                                                    <span style={{ "marginRight": "6%", "cursor": "pointer" }} onClick={() => editData(item)}><BiIcons.BiEdit /></span>
                                                                                    <span style={{ "marginLeft": "6%", "cursor": "pointer" }} onClick={() => deleteData(item._id)}><AiIcons.AiOutlineDelete /></span>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                :
                                                    null
                                            }
                                        </div>
                                    </div>
                                </Form>
                }
        </Formik>
    )
}

export default Role