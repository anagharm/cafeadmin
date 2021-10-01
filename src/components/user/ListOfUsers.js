import React from 'react'
import { TableTemplate } from '../../hoc/tableSetting/TableTemplate'
import { COLUMNS_USER } from './userColoums'

const UserData = [
    {
        "userCode" : "1",
        "userName" : "Aaditya Aadekar",
        "emailId"  : "aadityaaadekar@gmail.com",
        "mobNum"   : "9999999911"
    },
    {
        "userCode" : "2",
        "userName" : "Balaraam Baggonkar",
        "emailId"  : "balaraambaggonkar@gmail.com",
        "mobNum"   : "9999999924"
    },
    {
        "userCode" : "3",
        "userName" : "Chandan Berde",
        "emailId"  : "chandanberde@gmail.com",
        "mobNum"   : "9999999930"
    },
    {
        "userCode" : "4",
        "userName" : "Daksh Bhatwadekar",
        "emailId"  : "dakshbhatwadekar@gmail.com",
        "mobNum"   : "9999999934"
    },

    {
        "userCode" : "5",
        "userName" : "Ekambar Bhujbal",
        "emailId"  : "ekambarbhujbal@gmail.com",
        "mobNum"   : "9999999940"
    },
    {
        "userCode" : "6",
        "userName" : "Falak Chandratre",
        "emailId"  : "falakchandratre@gmail.com",
        "mobNum"   : "9999999945"
    },
    {
        "userCode" : "7",
        "userName" : "Gagan Chandratreya",
        "emailId"  : "gaganchandratreya@gmail.com",
        "mobNum"   : "9999999946"
    },
    {
        "userCode" : "8",
        "userName" : "Hardik Chiplunkar",
        "emailId"  : "hardikchiplunkar@gmail.com",
        "mobNum"   : "9999999951"
    },
];

function ListOfUsers() {
    return (
        <div>
            <TableTemplate userData={UserData} columns={COLUMNS_USER}/>
        </div>
    )
}

export default ListOfUsers
