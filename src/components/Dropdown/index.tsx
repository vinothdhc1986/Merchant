// import React, { FC } from 'react';
// import Props from './typing';
// import { Menu, Dropdown } from 'antd/lib';
// // import { DownOutlined } from '@ant-design/icons';
// import './style.scss';
// import MenuItem from 'antd/lib/menu/MenuItem';
// const DropdownComponent: FC<Props> = (props): JSX.Element => {
//   const { dropdownLabel, optionsList } = props;

//   const renderMenuItems = () =>
//     optionsList.map((item, index) => (
//       <MenuItem key={index}>
//         <span>{item.label}</span>
//       </MenuItem>
//     ));
//   return (
//     <React.Fragment>
//       <div>
//         <Dropdown overlay={<Menu>{renderMenuItems()}</Menu>}>
//           {dropdownLabel}
//         </Dropdown>
//       </div>
//     </React.Fragment>
//   );
// };

// export default DropdownComponent;
