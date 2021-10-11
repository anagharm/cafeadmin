import React from 'react'
import { TableTemplate } from '../../hoc/tableSetting/TableTemplate'
import { COLUMNS_USER } from './userColoums'
import { useQuery } from 'react-query'
import Fetcher from '../../hoc/fetcherSetting/FetcherSetting'

function ListOfUsers() {
    const { data: userList, isLoading } = useQuery(
        'listuser',
        () => Fetcher('get', '/api/profile/get/list', {}))
    if(isLoading) return <h1>Loading user</h1>
    return (
        <div>
            <TableTemplate userData={userList.data.response} columns={COLUMNS_USER}/>
        </div>
    )
}

export default ListOfUsers
