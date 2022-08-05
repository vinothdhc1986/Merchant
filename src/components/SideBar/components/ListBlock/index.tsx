import React, { FC } from 'react';
import Props from './typing';

const ListBlock: FC<Props> = (props) => {
  const { className, onClick, isCollapsed, label, imgSrc, imgAlt } = props;
  return (
    <>
      <li className={className ? className : ''}>
        <a
          href=""
          onClick={onClick}
          className={!isCollapsed ? 'border-radius-8' : 'center-align-content'}
        >
          <img src={imgSrc} alt={imgAlt} />
          {!isCollapsed && <label>{label}</label>}
        </a>
      </li>
    </>
  );
};

export default ListBlock;
