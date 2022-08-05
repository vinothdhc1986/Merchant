import React, { FC } from "react";
import imgURL from "../../lib/imgURL";
import Props from "./typing";
import "./styles.scss";


const CustomNoDataFound: FC<Props> = (props): JSX.Element => {
  return (
    <React.Fragment>
      <div className="customNoDataFound">
        <img src= {imgURL['no-data']} alt='no-data'/>
        <p>{props.title}</p>
        <span>{props.subTitle}</span>
      </div>
    </React.Fragment>
  );
};

export default CustomNoDataFound;
