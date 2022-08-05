import React, { FC } from 'react';
import Props from './typing';
import './styles.scss';

const Tabs: FC<Props> = (props): JSX.Element => {
  const { options, value, onChange } = props;

  return (
    <div className='planTabsNav paymentOption'>
      <ul>
        {options.map((tabItem) => (
          <li
            key={tabItem.value}
            className={`tablink ${value === tabItem.value ? 'active' : ''}`}
            onClick={() => onChange(tabItem.value)}
          >
            <span>{tabItem.label}</span>
          </li>
        ))}
      </ul>
      <div className={props.extraContentWrapperClassName || ''}>
        {props.extraContent}
      </div>
    </div>
  );
};

export default Tabs;
