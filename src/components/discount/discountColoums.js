import React from 'react';
import moment from 'moment'
export const COLUMNS_DISCOUNT =[
    {
        Header              : 'Discount Code',
        accessor            : 'discountCode',
        Cell                : e=><div ><a href={'/admin/discount/view/'+(e.value).split("-")[1]}> {(e.value).split("-")[0]} </a></div>
    },
    {
        Header              : 'Start Date',
        accessor            : 'discountFrom',
        Cell                : e=><div className="text-center">{moment(e.value).format("DD-MMM-YYYY")}</div>
    },
    {
        Header              : 'Till Date',
        accessor            : 'discountTo',
        Cell                : e=><div className="text-center">{moment(e.value).format("DD-MMM-YYYY")}</div>
    },
    {
        Header              : 'Is Available',
        accessor            : 'available',
        Cell                : e=><div className="text-center">{e.value ? "Available" : "Not Available"}</div>
    }
]