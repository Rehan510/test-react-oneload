import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import Dropdown from 'react-bootstrap/Dropdown';
import { get } from 'lodash';
const items = [
  {
    label: ' Price Low to High',
    key: 'asc'
  },
  {
    label: 'Price High to Low',
    key: 'desc'
  }
];

function SortDropDown({ label, handleMenuClick }) {
  return (
    <Dropdown>
      <Dropdown.Toggle className="sort-class">{label.label}</Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map((sort, index) => {
          return (
            <div key={`${index}drop`}>
              <Dropdown.Item
                onClick={() => {
                  handleMenuClick(sort);
                }}>
                {sort.label}
              </Dropdown.Item>
            </div>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortDropDown;
