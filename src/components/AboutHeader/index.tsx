import React, { FC, useEffect, useState } from "react";
import imgURL from "../../lib/imgURL";
import Props from "./typing";
import "./styles.scss";
import {
  getCloseHeaderListFromLocalStorage,
  setCloseHeaderListInLocalStorage,
} from "../../lib/localStorage";

const AboutHeader: FC<Props> = (props): JSX.Element => {
  const styles = {
    bgStrip: {
      background: `url(${imgURL["colour-bg"]}) 0 0 no-repeat`,
    },
  };
  const { title, content } = props;

  const [isShowHeader, setIsShowHeader] = useState<boolean>(true);

  const closeAboutHeader = () => {
    const aboutHeaderCloseList = getCloseHeaderListFromLocalStorage(
      "aboutHeaderCloseList"
    );
    aboutHeaderCloseList.push(title);
    setCloseHeaderListInLocalStorage(
      "aboutHeaderCloseList",
      aboutHeaderCloseList
    );
    setIsShowHeader(false);
  };

  useEffect(() => {
    const aboutHeaderCloseList = getCloseHeaderListFromLocalStorage(
      "aboutHeaderCloseList"
    );
    if (aboutHeaderCloseList.indexOf(title) >= 0) {
      setIsShowHeader(false);
    }
  }, []);

  const headerData = (
    <>
      <div className="bg-strp" style={styles.bgStrip}>
        <img src={imgURL["info-icon"]} alt="info-icon" /> {title}
      </div>
      <p>{content}</p>
      <button className="close-strp" onClick={closeAboutHeader}>
        <img src={imgURL["close-icon"]} alt="close" />
      </button>
    </>
  );

  return (
    <React.Fragment>
      <div className="about-header-strip">{isShowHeader ? headerData : ""}</div>
    </React.Fragment>
  );
};

export default AboutHeader;
