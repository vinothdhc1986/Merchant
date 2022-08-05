import React, { FC } from 'react';
import Popover from 'antd/lib/popover';
import Props from './typing';
import './styles.scss';

const Popper: FC<Props> = ({
  parentId = '',
  trigger = 'click',
  placement = 'bottom',
  contentClassName = '',
  content,
  visible,
  onVisibleChange,
  autoAdjustOverflow,
  className = '',
  children,
}): JSX.Element => {
  return (
    <Popover
      trigger={trigger}
      placement={placement}
      overlayClassName={`custom-popper ${contentClassName}`}
      content={content}
      visible={visible}
      onVisibleChange={onVisibleChange}
      autoAdjustOverflow={autoAdjustOverflow}
      className={className}
      getPopupContainer={() =>
        document.getElementById(parentId) || document.body
      }
    >
      {children}
    </Popover>
  );
};

export default Popper;
