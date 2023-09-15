import React from 'react';
import { FaUserTie } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import { CgDanger } from 'react-icons/cg';
import { customerCommunicationRoutes, settingRoutes } from '../../../config/routesName';
const { SETTNG } = settingRoutes;
const { CUSTOMER_COMMUNICATION } = customerCommunicationRoutes;
export const sideBarItems = [
  {
    label: 'Customer Communication',
    icon: <FaUserTie />,
    to: `/${CUSTOMER_COMMUNICATION}`,
    disabled: false,
    key: 'customerCommunication'
  },
  {
    label: 'Setting',
    icon: <MdSettings />,
    to: `/${SETTNG}`,
    key: 'setting',
    disabled: false
  },
  {
    label: 'item3',
    icon: <CgDanger />,
    to: '/happy',
    key: 'happy',
    disabled: false
  },
  {
    label: 'item4',
    icon: <CgDanger />,
    to: '/happy',
    key: 'item4',
    disabled: false
  }
];
export const getCurrentPath = (path) => {
  let key = CUSTOMER_COMMUNICATION;
  const currentPath = sideBarItems.find((p) => p.to === path);
  if (currentPath) {
    key = currentPath.key;
  }
  return key;
};
