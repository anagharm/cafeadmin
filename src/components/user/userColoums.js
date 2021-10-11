import React from 'react';

export const COLUMNS_USER =[
    {
        Header              : 'User Name',
        accessor            : 'name',
        Cell                : e=><div><a href={'/admin/user/view/'+(e.value).split("-")[1]}> {(e.value).split("-")[0]} </a></div>
    },
    {
        Header              : 'Email',
        accessor            : 'emails'
    },
    {
        Header              : 'Mobile Number',
        accessor            : 'mobileNum',
    },

    {
        Header              : 'Role',
        accessor            : 'role',
    },
]