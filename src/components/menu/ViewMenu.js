import React  from 'react'
import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import Fetcher from '../../hoc/fetcherSetting/FetcherSetting'
import FormikControl from '../../hoc/formikComponents/FormikControl.js'
import '../GeneralCss.css'
import { useHistory } from "react-router-dom";

function ViewMenu() {
    const {menucode} = useParams()
    const history = useHistory();
    const { data: menu, isLoading } = useQuery(
        'menuData',
        () => { if(menucode) return Fetcher('get', '/api/menu/get/menudetails/'+menucode, {})})

    if(isLoading) return <h1>Loading</h1>

    const editMenuInfo = () =>{
        history.push('/admin/menu/'+menucode);
    }

    return (
        <div className="viewData">
            <div className="imgDiv">
                <img src="https://i.pinimg.com/564x/c9/3f/24/c93f245aa6c85b1b3bf5e2163c6b1405.jpg" width="60%" />
            </div>
            <div className="infoDiv">
                <div className="formOuterDiv">
                    <div className="form1RowDiv">
                        <FormikControl control="showdata" label="Menu" value={menu.data.response.menu}/>
                    </div>
                    <div className="form1RowDiv">
                        <FormikControl control="showdata" label="Description" value={menu.data.response.description}/>
                    </div>
                    <div className="form2RowDiv">
                        <FormikControl control="showdata" label="Price" value={menu.data.response.price}/>
                        <FormikControl control="showdata" label="Is Available" value={menu.data.response.available ? "Is Available" : "Not Available"}/>
                    </div>
                    {/* <div className="form2RowDiv">
                        <FormikControl control="showdata" label="Gender" value={(menu.data.response.gender).replace(/^\w/, c => c.toUpperCase())}/>
                    </div> */}
                    <div className="viewEditButton">
                        <button className="btn btn-info" onClick={() => editMenuInfo()}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewMenu
