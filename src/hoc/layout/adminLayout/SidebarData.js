import React from 'react';
import * as FiIcons from 'react-icons/fi';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as CgIcons from 'react-icons/cg';

export const SidebarData = [
  {
    title: 'Discount Mgmt',
    // path: '/userlist',
    icon: <BsIcons.BsFilePlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'New',
        path: '/commingsoon',
        icon: <FiIcons.FiFile />
      },
      {
        title: 'List of Discounts',
        path: '/commingsoon',
        icon: <FiIcons.FiFile />
      }
    ]
  },
  {
    title: 'Receipt Mgmt',
    // path: '/userlist',
    icon: <BsIcons.BsFilePlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'List of Receipt',
        path: '/commingsoon',
        icon: <FiIcons.FiFile />
      }
    ]
  },
  {
    title: 'Order Mgmt',
    // path: '/userlist',
    icon: <BsIcons.BsFilePlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Place Order',
        path: '/commingsoon',
        icon: <FiIcons.FiFile />
      },
      {
        title: 'List of Orders',
        path: '/commingsoon',
        icon: <FiIcons.FiFile />
      }
    ]
  },
  {
    title: 'Menu Mgmt',
    // path: '/userlist',
    icon: <BsIcons.BsFilePlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'New Menu',
        path: '/admin/menu',
        icon: <FiIcons.FiFile />
      },
      {
        title: 'List of Menu',
        path: '/admin/menulist',
        icon: <FiIcons.FiFile />
      }
    ]
  },
  {
    title: 'Role Mgmt',
    path: '/admin/role',
    icon: <BsIcons.BsFilePlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'User Mgmt',
    // path: '/userlist',
    icon: <BsIcons.BsFilePlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Register',
        path: '/admin/register',
        icon: <FiIcons.FiFile />
      },
      {
        title: 'List of User',
        path: '/admin/userlist',
        icon: <FiIcons.FiFile />
      }
    ]
  },
];