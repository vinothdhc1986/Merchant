import React, { FC, useRef, useState } from 'react';
import IdleTimer from 'react-idle-timer';
import RefreshModal from '../RefreshModal';
import Props from './typing';

const IdleTimerContainer: FC<Props> = (props) => {
  const [isRefreshPopup, setRefreshPopup] = useState<boolean>(false);
  //const [idleTimerRef, setIdleTimerRef] = useState(null);

  //const idleTimerRef = useRef(null);
  const sessionTimeoutRef = useRef(null);

  const onIdle = () => {
    setRefreshPopup(true);
    sessionTimeoutRef.current = setTimeout(
      onLogoutClickHandler,
      props.afterIdleHardLogoutTime
    );
  };

  const onLogoutClickHandler = () => {
    props.logoutAction();
    setRefreshPopup(false);
    clearTimeout(sessionTimeoutRef.current);
  };

  const onOkClickHandler = () => {
    setRefreshPopup(false);
    props.refreshTokenAction();
    clearTimeout(sessionTimeoutRef.current);
  };

  return (
    <React.Fragment>
      <IdleTimer
        //ref={(ref) => setIdleTimerRef(ref)}
        timeout={props.idleTimeout}
        onIdle={onIdle}
        crossTab={{
          emitOnAllTabs: true,
        }}
      />

      {isRefreshPopup && (
        <RefreshModal
          onLogoutClickHandler={onLogoutClickHandler}
          onOkClickHandler={onOkClickHandler}
        />
      )}
    </React.Fragment>
  );
};

export default IdleTimerContainer;
