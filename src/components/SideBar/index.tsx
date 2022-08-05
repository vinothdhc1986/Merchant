import React, { FC } from 'react';
import { connect } from 'react-redux';
import Sider from 'antd/lib/layout/Sider';
import ListBlock from './components/ListBlock';
import { updateSidebarView } from '../../redux/actions/sidebar';
import useRedirect from '../../hooks/useRedirect';
import {
  Options,
  transactionsOptionsList,
  // TODO: To be added in future sprints
  payoutsOptionsList,
  valueAddedFeaturesList,
  adminOptionList,
} from './sidebar.constant';
import imgURL from '../../lib/imgURL';
import { UiRoutes } from '../../lib/constants';
import {
  pushClevertapEvent,
  clevertapEventConfigList,
} from '../../lib/analyticsUtil';
import Props from './typing';
import './style.scss';

const SideBar: FC<Props> = (props): JSX.Element => {
  const { push, generatePath, location: pathLocation } = useRedirect();
  const { isCollapsed } = props;

  return (
    <React.Fragment>
      <Sider
        collapsed={isCollapsed}
        className='sidebar'
        theme='light'
        width={272}
      >
        <div className='sidebar-header'>
          <h3>
            <a href='#'>
              {isCollapsed ? (
                <img
                  src={imgURL['collapse-logo']}
                  width={'67.64px'}
                  alt='Plural'
                  onClick={(e) => {
                    e.preventDefault();
                    push(generatePath(UiRoutes.OVERVIEW));
                  }}
                />
              ) : (
                <img
                  className='plural-logo'
                  src={imgURL.logo}
                  alt='Plural'
                  onClick={(e) => {
                    e.preventDefault();
                    push(generatePath(UiRoutes.OVERVIEW));
                  }}
                />
              )}
            </a>
          </h3>
        </div>
        {props.isAdmin && !props.merchantId ? (
          <>
            <div
              className={`menu-section customScroll ${
                !isCollapsed ? 'horizontal-padding' : ''
              }`}
            >
              <div className='manu-block'>
                <ul className='list-unstyled components'>
                  {adminOptionList.map((item: Options, index: number) => {
                    return (
                      <ListBlock
                        className={
                          pathLocation.pathname.indexOf(item.value) > -1 &&
                          'active'
                        }
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          push(generatePath(`${item.value}`));
                        }}
                        isCollapsed={isCollapsed}
                        label={item.label}
                        imgSrc={item.icon}
                        imgAlt={item.label}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>{' '}
          </>
        ) : (
          <>
            <div
              className={`menu-section customScroll ${
                !isCollapsed ? 'horizontal-padding' : ''
              }`}
            >
              <div className='manu-block'>
                <ul className='list-unstyled components'>
                  <ListBlock
                    className={
                      pathLocation.pathname.indexOf(UiRoutes.OVERVIEW) > -1 &&
                      'active'
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      push(generatePath(UiRoutes.OVERVIEW));
                    }}
                    isCollapsed={isCollapsed}
                    label={'Overview'}
                    imgSrc={imgURL['overview-icon']}
                    imgAlt={'Overview'}
                  />
                </ul>
              </div>
              <div className='manu-block'>
                {!isCollapsed && <h6>TRANSACTIONS</h6>}
                <ul className='list-unstyled components'>
                  {transactionsOptionsList.map(
                    (item: Options, index: number) => {
                      return (
                        <ListBlock
                          className={
                            pathLocation.pathname.indexOf(item.value) > -1 &&
                            'active'
                          }
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            if (!props.isAdmin)
                              pushClevertapEvent(
                                clevertapEventConfigList[
                                  item.clevertapEventName
                                ]
                              );
                            push(generatePath(`${item.value}`));
                          }}
                          isCollapsed={isCollapsed}
                          label={item.label}
                          imgSrc={item.icon}
                          imgAlt={item.label}
                        />
                      );
                    }
                  )}
                </ul>
              </div>
              {props.merchantPayoutEnabled && (
                <div className='manu-block'>
                  {!isCollapsed && <h6>PAYOUTS</h6>}
                  <ul className='list-unstyled components'>
                    {payoutsOptionsList.map((item: Options, index: number) => {
                      return (
                        <ListBlock
                          className={
                            pathLocation.pathname.indexOf(item.value) > -1 &&
                            'active'
                          }
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            push(generatePath(`${item.value}`));
                          }}
                          isCollapsed={isCollapsed}
                          label={item.label}
                          imgSrc={item.icon}
                          imgAlt={item.label}
                        />
                      );
                    })}
                  </ul>
                </div>
              )}
              <div className='manu-block'>
                <ul className='list-unstyled components'>
                  {valueAddedFeaturesList.map(
                    (item: Options, index: number) => {
                      return (
                        <ListBlock
                          className={
                            pathLocation.pathname.indexOf(item.value) > -1 &&
                            'active'
                          }
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            if (!props.isAdmin)
                              pushClevertapEvent(
                                clevertapEventConfigList[
                                  item.clevertapEventName
                                ]
                              );
                            push(generatePath(`${item.value}`));
                          }}
                          isCollapsed={isCollapsed}
                          label={item.label}
                          imgSrc={item.icon}
                          imgAlt={item.label}
                        />
                      );
                    }
                  )}
                </ul>
              </div>
              <div className='manu-block last'>
                <ul className='list-unstyled components'>
                  <ListBlock
                    className={
                      pathLocation.pathname.indexOf(UiRoutes.SETTINGS) > -1 &&
                      'active'
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      if (!props.isAdmin)
                        pushClevertapEvent(
                          clevertapEventConfigList.SIDEBAR_TAB_CLICKED_SETTINGS
                        );
                      push(generatePath(UiRoutes.SETTINGS));
                    }}
                    isCollapsed={isCollapsed}
                    label={'Settings'}
                    imgSrc={imgURL['setting-icon']}
                    imgAlt={'Settings'}
                  />
                </ul>
              </div>
            </div>
          </>
        )}

        {/* <!--Toggle button--> */}
        <button
          type='button'
          id='sidebarCollapse'
          className='navbar-btn sidebarCollapse'
          onClick={() => {
            props.updateSidebarView();
          }}
        >
          <img
            src={imgURL['collapse-icon']}
            alt='Collapse'
            className={(isCollapsed && 'sidebar-rotated-expand-icon') || ''}
          />
          {!isCollapsed && <label>Collapse Sidebar</label>}
        </button>
      </Sider>
    </React.Fragment>
  );
};

const mapStateToProps = ({ sidebarReducer, loginReducer }) => ({
  isCollapsed: sidebarReducer.isCollapsed,
  merchantId: loginReducer.loginState.MerchantId,
  isAdmin: loginReducer.loginState.isAdmin,
  merchantPayoutEnabled:
    loginReducer?.loginState?.merchantPayoutEnabled ?? false,
});

export default connect(mapStateToProps, {
  updateSidebarView,
})(SideBar);
