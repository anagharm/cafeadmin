import React from 'react';

export const COLUMNS_MENU =[
    {
        Header              : 'Dish',
        accessor            : 'menu',
        Cell                : e=><div ><a href={'/admin/menu/view/'+(e.value).split("-")[1]}> {(e.value).split("-")[0]} </a></div>
    },
    {
        Header              : 'Price',
        accessor            : 'price',
        Cell                : e=><div className="text-center">{e.value}</div>
    },
    {
        Header              : 'Is Available',
        accessor            : 'available',
        Cell                : e=><div className="text-center">{e.value ? "Available" : "Not Available"}</div>
    }
]