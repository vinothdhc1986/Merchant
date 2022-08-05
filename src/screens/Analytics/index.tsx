import React, { FC, useEffect } from 'react';
import { embedSession } from 'amazon-quicksight-embedding-sdk';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import {
  analyticsAction,
  clearAnalyticsAction,
} from '../../redux/actions/analytics';
import SubHeader from 'components/SubHeader';
import AboutHeader from 'components/AboutHeader';
import notify from '../../lib/notifiy';
import { PAYOUT_REQUEST_DATE_FORMAT } from 'lib/constants';
import { DateRangeType } from 'lib/typing';
import { dateRangeUpToToday } from 'lib/helper';
import Props from './typing';
import './style.scss';

const Analytics: FC<Props> = (props): JSX.Element => {
  const { isAdmin, MerchantId } = props.loginState;
  const dateRange: DateRangeType = dateRangeUpToToday();

  useEffect(() => {
    const data = {
      merchantId: MerchantId,
      isAdmin: isAdmin,
    };
    props.analyticsAction(data);
    return () => {
      props.clearAnalyticsAction();
    };
  }, []);

  useEffect(() => {
    const { isSuccess, isFailure, analyticsURL, MerchantName } =
      props.analyticsState;

    if (isSuccess && analyticsURL) {
      setQuickDiv(analyticsURL, MerchantName);
    } else if (isFailure) {
      notify({
        message: 'Error',
        type: 'error',
        description: props.validationErrors.SOMETHING_WENT_WRONG,
      });
      props.clearAnalyticsAction();
    }
  }, [
    props.analyticsState.isSuccess,
    props.analyticsState.isFailure,
    props.analyticsState.analyticsURL,
    props.analyticsState.MerchantName,
  ]);

  const setQuickDiv = (
    analyticsURL: string,
    MerchantName: string | undefined
  ) => {
    const url = analyticsURL;

    const options = {
      url: url,
      container: '#embeddingContainer',
      parameters: {
        ...(!isAdmin && { Merchant: MerchantName, MerchantID: MerchantId }),
        ...(dateRange?.startDate && {
          FromDate: format(
            new Date(dateRange.startDate),
            PAYOUT_REQUEST_DATE_FORMAT
          ),
        }),
        ...(dateRange?.endDate && {
          ToDate: format(
            new Date(dateRange.endDate),
            PAYOUT_REQUEST_DATE_FORMAT
          ),
        }),
      },
      scrolling: 'no',
      //scrolling: 'yes',
      //height: 'AutoFit',
      height: '100%',
      width: '100%',
      locale: 'en-US',
      footerPaddingEnabled: true,
      //defaultEmbeddingVisualType: 'TABLE' // this option only applies to experience embedding and will not be used for dashboard embedding
    };

    embedSession(options);
  };

  return (
    <React.Fragment>
      <div className='analytics-container'>
        {!isAdmin && (
          <AboutHeader
            title='Analytics'
            content='Gather intelligent insights based on transactions across multiple payment gateways.'
          />
        )}

        <SubHeader
          title='Analytics'
          description='Gather intelligent insights based on transactions across multiple payment gateways.'
          showIcon={true}
          svgIcon='analytics-icon-white'
          svgDetail='Analytics'
        />
        <div className='white-box-content'>
          <div id='embeddingContainer'></div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({
  analyticsReducer,
  validationReducer,
  loginReducer,
}) => ({
  analyticsState: analyticsReducer.analyticsState,
  loginState: loginReducer.loginState,
  validationErrors: validationReducer.validationErrorState.validationErrors,
});

export default connect(mapStateToProps, {
  analyticsAction,
  clearAnalyticsAction,
})(Analytics);
