import React  from 'react'
import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import Fetcher from '../../hoc/fetcherSetting/FetcherSetting'
import FormikControl from '../../hoc/formikComponents/FormikControl.js'
import '../GeneralCss.css'
import moment from 'moment'
import { useHistory } from "react-router-dom";

function ViewDiscount() {
    const {discountcode} = useParams()
    const history = useHistory();
    const { data: discount, isLoading } = useQuery(
        'discountData',
        () => { if(discountcode) return Fetcher('get', '/api/discount/get/discountdetails/'+discountcode, {})})

    if(isLoading) return <h1>Loading</h1>

    const editMenuInfo = () =>{
        history.push('/admin/discount/'+discountcode);
    }

    return (
        <div className="viewData">
            <div className="imgDiv">
                <img src="https://banner2.cleanpng.com/20171127/f77/blue-discount-cube-transparent-png-clip-art-image-5a1bc4666e4248.2116458315117691904516.jpg" width="60%" />
            </div>
            <div className="infoDiv">
                <div className="formOuterDiv">
                    <div className="form2RowDiv">
                        <FormikControl control="showdata" label="Discount Type" value={discount.data.response.typeofDiscount}/>
                        <FormikControl control="showdata" label="Discount Code" value={discount.data.response.discountCode}/>
                    </div>
                    <div className="form1RowDiv">
                        <FormikControl control="showdata" label="Description" value={discount.data.response.description}/>
                    </div>
                    <div className="form2RowDiv">
                        <FormikControl control="showdata" label="Start Date" value={moment(discount.data.response.discountFrom).format("DD-MMM-YYYY")}/>
                        <FormikControl control="showdata" label="Till Date" value={moment(discount.data.response.discountTo).format("DD-MMM-YYYY")}/>
                    </div>
                    <div className="form2RowDiv">
                        <FormikControl control="showdata" label="Is Available" value={discount.data.response.available ? "Is Available" : "Not Available"}/>
                    </div>
                    <div className="viewEditButton">
                        <button className="btn btn-info" onClick={() => editMenuInfo()}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewDiscount
