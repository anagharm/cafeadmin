import React from 'react';

export const COLUMNS_USER =[
    {
        Header              : 'User Code',
        accessor            : 'userCode',
        Cell                : e=><div className="text-center"><a href={'/admin/user/view/'+e.value}> {e.value} </a></div>
    },
    {
        Header              : 'User Name',
        accessor            : 'userName'
    },
    {
        Header              : 'Email',
        accessor            : 'emailId'
    },
    {
        Header              : 'Mobile Number',
        accessor            : 'mobNum',
    },
]