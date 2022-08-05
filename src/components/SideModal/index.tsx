import React, { FC } from 'react';
import imgURL from '../../lib/imgURL';
import Drawer from 'antd/lib/drawer';
import Props from './typing';
import './style.scss';

const SideModal: FC<Props> = (props): JSX.Element => {
  const { closeModal, ModalBody, modalBodyProps, title, description } = props;
  return (
    <React.Fragment>
      <Drawer
        placement="right"
        visible={true}
        onClose={closeModal}
        bodyStyle={{}}
      >
        <div className="transaction-detail-popup customScroll">
          <div className="transation-table-section">
            <button className="close-model" onClick={closeModal}>
              <img src={imgURL['close-model']} alt="close" />
            </button>
            <h2>
              <div>
                {title} {description && <p>{description}</p>}
              </div>
            </h2>
            <ModalBody {...modalBodyProps} />
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default SideModal;
