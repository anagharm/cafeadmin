import React  from 'react'
import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import Fetcher from '../../hoc/fetcherSetting/FetcherSetting'
import FormikControl from '../../hoc/formikComponents/FormikControl.js'
import '../GeneralCss.css'
import moment from 'moment'
import { useHistory } from "react-router-dom";

function ViewUser() {
    const {usercode} = useParams()
    const history = useHistory();
    const { data: user, isLoading } = useQuery(
        'userData',
        () => { if(usercode) return Fetcher('get', '/api/profile/get/userdetails/'+usercode, {})})

    if(isLoading) return <h1>Loading</h1>

    const editUserInfo = () =>{
        history.push('/admin/register/'+usercode);
    }

    return (
        <div className="viewData">
            <div className="imgDiv">
                <img src="https://www.carrycargo.com/wp-content/uploads/2018/10/user_dummy.jpg" width="60%" />
            </div>
            <div className="infoDiv">
                <div className="formOuterDiv">
                    <div className="form2RowDiv">
                        <FormikControl control="showdata" label="Name" value={user.data.response.name}/>
                        <FormikControl control="showdata" label="Email Id" value={user.data.response.emails}/>
                    </div>
                    <div className="form2RowDiv">
                        <FormikControl control="showdata" label="Mobile" value={user.data.response.mobileNum}/>
                        <FormikControl control="showdata" label="Role" value={(user.data.response.role).replace(/^\w/, c => c.toUpperCase())}/>
                    </div>
                    <div className="form2RowDiv">
                        <FormikControl control="showdata" label="Date of Birth" value={moment(Date.parse(user.data.response.dob)).format("DD-MMM-YYYY")}/>
                        <FormikControl control="showdata" label="Date of Marriage" value={moment(Date.parse(user.data.response.dom)).format("DD-MMM-YYYY")}/>
                    </div>
                    <div className="form2RowDiv">
                        <FormikControl control="showdata" label="Gender" value={(user.data.response.gender).replace(/^\w/, c => c.toUpperCase())}/>
                    </div>
                    <div className="viewEditButton">
                        <button className="btn btn-info" onClick={() => editUserInfo()}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewUser
