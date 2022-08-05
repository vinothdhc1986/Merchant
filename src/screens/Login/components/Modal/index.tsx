import React, { FC } from "react";
import "./style.scss";
import { ModalProps } from "./typings";
import imgUrl from "../../../../lib/imgURL";

const Modal: FC<ModalProps> = (props) => {
  const { title, description, backButtonEnable, className, onBackButtonClick = () => {} , onBackdropClick } = props;
  return (
    <React.Fragment>
      
      <div className={`modal modal-dialog-centered ${className}`}>
      <div className="overlay" onClick={onBackdropClick}></div>
        <div className="modal-dialog">
          {/*Modal content*/}
          <div className="modal-content">
            {backButtonEnable && (
              <button className="back-button" onClick={onBackButtonClick}>
                <img src={imgUrl["back-arrow"]} alt="Back" />
              </button>
            )}
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="modal-body">{props.children}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
