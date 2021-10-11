import React from 'react'
import { TableTemplate } from '../../hoc/tableSetting/TableTemplate'
import { COLUMNS_DISCOUNT } from './discountColoums'
import { useQuery } from 'react-query'
import Fetcher from '../../hoc/fetcherSetting/FetcherSetting'

function ListOfDiscount() {
    const { data: discountList, isLoading } = useQuery(
        'listdiscount',
        () => Fetcher('get', '/api/discount/get/list', {}))
    if(isLoading) return <h1>Loading Discount</h1>
    return (
        <div>
            <TableTemplate userData={discountList.data.response} columns={COLUMNS_DISCOUNT}/>
        </div>
    )
}

export default ListOfDiscount
