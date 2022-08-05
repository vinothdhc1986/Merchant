import React, { FC } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import Props from './typing';
import './style.scss';

const Payment: FC<Props> = (props): JSX.Element => {
  return (
    <React.Fragment>
      <div className="wrapper">
        <SideBar />
        <div id="content">
          <Navbar />
          <div
            className={
              props.isCollapsed ? 'content-pane-collapsed' : 'content-pane'
            }
          >
            {props.children}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ sidebarReducer }) => ({
  isCollapsed: sidebarReducer.isCollapsed,
});

export default connect(mapStateToProps)(Payment);
