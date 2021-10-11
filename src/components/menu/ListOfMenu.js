import React from 'react'
import { TableTemplate } from '../../hoc/tableSetting/TableTemplate'
import { COLUMNS_MENU } from './menuColoums'
import { useQuery } from 'react-query'
import Fetcher from '../../hoc/fetcherSetting/FetcherSetting'

function ListOfMenu() {
    const { data: menuList, isLoading } = useQuery(
        'listmenu',
        () => Fetcher('get', '/api/menu/get/list', {}))
    if(isLoading) return <h1>Loading Menu</h1>
    return (
        <div>
            <TableTemplate userData={menuList.data.response} columns={COLUMNS_MENU}/>
        </div>
    )
}

export default ListOfMenu
