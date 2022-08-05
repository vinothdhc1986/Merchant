import React, { FC, useState } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import Checkbox from '../Checkbox';
import CustomSwitch from '../CustomSwitch';
import Props from './typing';
import './style.scss';

const renderColumnsList = ({ columnsList, columnsState, setColumnsState }) =>
  columnsList.map((item) => (
    <li className={item.isCustomizable ? '' : 'dissable'} key={item.id}>
      <Checkbox
        id={item.id}
        label={item.label}
        checked={columnsState.includes(item.id)}
        handleChange={() => {
          let columnsStateCopy = [...columnsState];
          if (columnsStateCopy.includes(item.id)) {
            columnsStateCopy = columnsStateCopy.filter((id) => id !== item.id);
          } else {
            columnsStateCopy.push(item.id);
          }
          setColumnsState(columnsStateCopy);
        }}
      />
    </li>
  ));

const RenderModalBody = (props): JSX.Element => {
  const { closeModal, columnsList, visibleColumns, setVisibleColumns } = props;
  const [columnsState, setColumnsState] = useState<string[]>(visibleColumns);

  return (
    <React.Fragment>
      <h3>Customize Columns</h3>
      <p>Please choose the columns that you want to see in the table</p>
      <CustomSwitch
        onChange={(value) => {
          let selectedColumns;
          if (value) selectedColumns = columnsList.map((item) => item.id);
          else
            selectedColumns = columnsList
              .filter((item) => !item.isCustomizable)
              .map((item) => item.id);
          setColumnsState([...selectedColumns]);
        }}
        label={'Select/Deselect All'}
        checked={columnsState.length === columnsList.length}
      />
      <div className='modal-body'>
        <ul>
          {renderColumnsList({ columnsList, columnsState, setColumnsState })}
        </ul>
        <div className='action-button text-right'>
          <Button
            btnStyleClass='secondry-button'
            label='Cancel'
            onClick={closeModal}
            enable={true}
          />
          <Button
            btnStyleClass='primary-button'
            label='Save'
            onClick={() => {
              setVisibleColumns(columnsState);
              closeModal();
            }}
            enable={true}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const CustomizeModal: FC<Props> = (props): JSX.Element => {
  return (
    <React.Fragment>
      <Modal
        ModalBody={RenderModalBody}
        modalBodyProps={{ ...props }}
        modalWrapperClass='customize-model'
        onBackdropClick={props.closeModal}
      />
    </React.Fragment>
  );
};

export default CustomizeModal;
