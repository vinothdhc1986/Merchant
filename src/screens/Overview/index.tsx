/*******************************************************************************
 *  Class name : Overview
 *
 *  Author : PayHuddle
 *  Date   : 27-09-2021
 *  Copyright : PineLabs
 *******************************************************************************/

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { format, subDays } from 'date-fns';
import imgURL from '../../lib/imgURL';
import { getTimeKey, formatToIST } from '../../lib/helper';
import Card from './components/Card';
import Select from '../../components/Select';
import { getMerchantIdFromStore, getDateRangeTitle } from '../../lib/helper';
import PlatformDetails from './components/PlatformDetails';
import DateRange from '../../components/DateRange';
import PlatformChart from './components/PlatformChart';
import PaymentMethodProgressUnit from './components/PaymentMethodProgressUnit';
import TransactionDetailsChartLegend from './components/TransactionDetailsChartLegend';
import TotalTransactionsByVolumeAndCountChart from './components/TotalTransactionsByVolumeAndCountChart';
import SuccessTransactionsByPaymentMethodChart from './components/SuccessTransactionsByPaymentMethodChart';
import {
  initGatewaysOptions,
  totalTransactionsOptions,
  volumeAndCountOptions,
  paymentMethodsList,
  initPlatformDataset,
  legendListForPaymentMethodChart,
  legendListForVolumeAndCountChart,
  enabledPaymentModesList,
} from './overview.constants';
import {
  getTodayTransactionsDataAction,
  getOverviewDataAction,
  clearOverviewStateAction,
} from '../../redux/actions/overview';
import SubHeader from 'components/SubHeader';
import {
  getOverviewSettlementDataApi
} from '../../api/overview';
import { getGatewayListAction } from '../../redux/actions/smartRouting';
import { DateRangeType } from '../../lib/typing';
import Props, {
  TotalTransactionsDatasetUnitType,
  GatewayOptionsListType,
  PlatformDatasetListType,
  PaymentMethodsListType,
} from './typing';
import './style.scss';

const Overview: FC<Props> = (props) => {
  const merchantId = getMerchantIdFromStore();
  const {
    transactionData,
    refundData,
    paymentModesData,
    platformData,
    allGatewaysList,
    transactionAccordingToDateTime,
    todayDate,
  } = props;

  const [selectedGateway, setSelectedGateway] = useState('all');
  const [selectedTransactionType, setSelectedTransactionType] =
    useState('totalTransactions');
  const [selectedVolumeType, setSelectedVolumeType] = useState('byVolumeCount');
  const [timeSlot, setTimeSlot] = useState('daily');
  const [gatewayOptions, setGatewayOptions] = useState<
    Array<GatewayOptionsListType>
  >(JSON.parse(JSON.stringify(initGatewaysOptions)));

  const [totalTransactionsDailyDataset, setTotalTransactionsDailyDataset] =
    useState<TotalTransactionsDatasetUnitType[] | null>(null);

  const [platformDataset, setPlatformDataset] =
    useState<PlatformDatasetListType[] | null>(null);

  const [paymentMethodsDataset, setPaymentMethodsDataset] = useState<
    PaymentMethodsListType[]
  >(JSON.parse(JSON.stringify(paymentMethodsList)));

  const [isDateRangeModal, setIsDateRangeModal] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeType>({
    startDate: subDays(new Date(), 7),
    endDate: new Date(),
    key: 'selection',
  });
  const [settlementData] = useState<{
    merchantID:string,
  }>({
    merchantID:"1",
  });
  const [merchantRecord, setMerchantRecord] = useState("");
  const generateToken = ({ fromDate, toDate, isHourly, paymentGateway }) => {
    const requestBody = {
      fromDate: formatToIST(new Date(fromDate)),
      toDate: formatToIST(new Date(toDate)),
      merchantId,
      isHourly,
      paymentGateway,
    };
    if (paymentGateway !== 'all') {
      const filteredGatewayId = allGatewaysList
        .filter((item) => item.gatewayName === paymentGateway)
        .pop().gatewayID;
      requestBody.paymentGateway = [filteredGatewayId];
    } else {
      delete requestBody.paymentGateway;
    }
    const buff = new Buffer(JSON.stringify(requestBody));
    return buff.toString('base64');
  };

  const fetchOverviewData = (args) => {
    const base64data = generateToken(args);
    props.getOverviewDataAction({
      base64data,
    });
  };
  const fetchsettlemnetData = async() =>{
    const data_value = await getOverviewSettlementDataApi(settlementData);
  // console.log("------------settlement data============"+JSON.stringify(data_value));
    setMerchantRecord(data_value.body);
   // console.log("---------merchant log=========="+JSON.stringify(data_value.body));

   // console.log("---------logs=========="+merchantRecord["totalSettled"]);

  };
  useEffect(() => {
    props.getGatewayListAction(merchantId);
    props.getTodayTransactionsDataAction({
      merchantId,
    });
    fetchsettlemnetData();
    fetchOverviewData({
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
      isHourly: timeSlot === 'hours' ? true : false,
      paymentGateway: selectedGateway,
    });

    return () => {
      props.clearOverviewStateAction();
    };
  }, []);

  useEffect(() => {
    const gatewayOptionsCopy = [...gatewayOptions];
    allGatewaysList.forEach((item) => {
      if (!gatewayOptionsCopy.some((i) => i.value === item.gatewayName)) {
        const obj = {
          label: item.gatewayName,
          value: item.gatewayName,
          gatewayId: item.gatewayID,
        };
        gatewayOptionsCopy.push(obj);
      }
    });
    setGatewayOptions(gatewayOptionsCopy);
  }, [allGatewaysList]);

  useEffect(() => {
    if (timeSlot === 'hours') {
      if (Object.entries(transactionAccordingToDateTime).length > 0) {
        const newData: TotalTransactionsDatasetUnitType[] = [];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [dateString, transactionsOfThatDay]: any = Object.entries(
          transactionAccordingToDateTime
        ).pop();

        if (new Date(dateString).toDateString() === new Date().toDateString()) {
          const totalHoursOfTheCurrentDay = new Date().getHours() + 1;
          transactionsOfThatDay.splice(totalHoursOfTheCurrentDay);
        }
        transactionsOfThatDay.forEach((item) => {
          const [key, value]: any = Object.entries(item).pop();
          const obj: TotalTransactionsDatasetUnitType = {
            key: getTimeKey(key),
            dateString: dateString,
            failureAmount: value.failureAmount / 1000,
            failureCount: value.failureCount,
            successAmount: value.successAmount / 1000,
            successCount: value.successCount,
            totalTransactionAmount: value.totalTransactionAmount / 1000,
            totalTransactionCount: value.totalTransactionCount,
          };
          newData.push(obj);
        });
        setTotalTransactionsDailyDataset(newData);
      }
    } else {
      const newData: TotalTransactionsDatasetUnitType[] = [];
      for (const item of Object.entries(transactionAccordingToDateTime)) {
        const [key, value]: any = item;
        const obj: TotalTransactionsDatasetUnitType = {
          key: format(new Date(key), 'd/MM'),
          failureAmount: value.failureAmount / 1000,
          failureCount: value.failureCount,
          successAmount: value.successAmount / 1000,
          successCount: value.successCount,
          totalTransactionAmount: value.totalTransactionAmount / 1000,
          totalTransactionCount: value.totalTransactionCount,
        };
        newData.push(obj);
      }
      setTotalTransactionsDailyDataset(newData);
    }
  }, [transactionAccordingToDateTime]);

  useEffect(() => {
    const paymentMethodsDatasetCopy = JSON.parse(
      JSON.stringify(paymentMethodsDataset)
    );

    const othersIndex = paymentMethodsDatasetCopy.findIndex(
      (listItem) => listItem.key === 'others'
    );

    paymentMethodsDatasetCopy[othersIndex].percentage = 0;

    paymentMethodsDatasetCopy.forEach((item, i) => {
      const itemIndex = paymentModesData.findIndex(
        (j) => j.methods === item.key
      );

      if (itemIndex >= 0) {
        paymentMethodsDatasetCopy[i].percentage =
          paymentModesData[itemIndex].transactionPercent;
      } else {
        paymentMethodsDatasetCopy[i].percentage = 0;
      }
    });

    paymentModesData.forEach((item) => {
      if (!enabledPaymentModesList.includes(item.methods)) {
        paymentMethodsDatasetCopy[othersIndex].percentage +=
          item.transactionPercent;
      }
    });

    setPaymentMethodsDataset(paymentMethodsDatasetCopy);
  }, [paymentModesData]);

  useEffect(() => {
    if (
      platformData.transactionPercentMobile !== undefined &&
      platformData.transactionPercentDesktop !== undefined
    ) {
      initPlatformDataset.forEach((item, i) => {
        if (item.name === 'Mobile') {
          initPlatformDataset[i].value = platformData.transactionPercentMobile;
        } else {
          initPlatformDataset[i].value = platformData.transactionPercentDesktop;
        }
      });
      setPlatformDataset(initPlatformDataset);
    }
  }, [platformData]);

  useEffect(() => {
    fetchOverviewData({
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
      isHourly: timeSlot === 'hours' ? true : false,
      paymentGateway: selectedGateway,
    });
  }, [selectedGateway, selectedTransactionType, timeSlot]);

  const dateTitle = useMemo(() => {
    return getDateRangeTitle(dateRange.startDate, dateRange.endDate);
  }, [dateRange.startDate, dateRange.endDate]);

  const dateRangeSaveHandler = (value) => {
    setDateRange(value);
    setIsDateRangeModal(false);
    fetchOverviewData({
      fromDate: value.startDate,
      toDate: value.endDate,
      isHourly: timeSlot === 'hours' ? true : false,
      paymentGateway: selectedGateway,
    });
  };

  return (
    <div className="overview-container">
      <SubHeader
        title="Overview"
        showIcon={true}
        svgIcon="overview-white-icon"
        svgDetail="Overview"
        description="Summary of transactions and issued refunds"
      />
      <div className="taday-transtion">
        <div className="transtion-block">
          <Card
            title={'Today’s Transactions'}
            topRightIcon={imgURL.CreditCard}
            amount={transactionData.successAmount || 0}
            totalTransactions={transactionData.totalTransactions || 0}
         //   successPercentage={transactionData.successPercentage}
            bottomLeftLabel={'Transactions'}
            amountPercentageChange={transactionData.amountPercentageChange || 5.2}
            todayDate={todayDate}
          />
          <Card
            title={'Today’s Settlement'}
            topRightIcon={imgURL['settlements-icon']}
            amount={transactionData.successAmount || 0}
            totalTransactions={transactionData.totalTransactions || 234}
         //   successPercentage={transactionData.successPercentage}
            bottomLeftLabel={'Transactions'}
            amountPercentageChange={transactionData.amountPercentageChange || 5.2}
            todayDate={todayDate}
          />
          <Card
            title={'Refunds'}
            topRightIcon={imgURL.ArrowsCounterClockwise}
            amount={refundData.totalRefundAmount || 0}
            bottomLeftLabel={'Transactions'}
            totalTransactions={refundData.refundCount || 0}
            amountPercentageChange={refundData.amountPercentageChange || 5.2}
            todayDate={todayDate}
          />
        </div>
      </div>

      {/* Report section */}
      <div className="heading-title">
        <h2>Reports</h2>
      </div>
      <div className="reportSection">
        <div className="reportBox">
          <div className="topDropdown">
            <div className="filtering-row overview-date-filter">
              <DateRange
                cancelHandler={() => setIsDateRangeModal(false)}
                saveHandler={(value) => dateRangeSaveHandler(value)}
                dateRange={dateRange}
                visible={isDateRangeModal}
                onVisibleChange={(visible: boolean) =>
                  setIsDateRangeModal(visible)
                }
              >
                <div
                  onClick={() => setIsDateRangeModal(true)}
                  className="daterange-field form-control"
                  style={{ cursor: 'pointer' }}
                >
                  {`${dateTitle ? dateTitle + ' | ' : ''}${format(
                    new Date(dateRange.startDate),
                    'MMM d yyyy'
                  )} - ${format(new Date(dateRange.endDate), 'MMM d yyyy')}`}
                  {isDateRangeModal ? (
                    <button className="arrow-bt">
                      <img src={imgURL['caret-up']} alt="Calendar" />
                    </button>
                  ) : (
                    <button className="arrow-bt">
                      <img src={imgURL['caret-down']} alt="Calendar" />
                    </button>
                  )}
                </div>
              </DateRange>
            </div>
            <div className="AllpaymentDrop">
              <Select
                DropdownIcon={<img src={imgURL['overview-dropdown-gray']} />}
                onChange={(value) => setSelectedGateway(value)}
                optionList={gatewayOptions}
                defaultValue={gatewayOptions[0].label}
                bordered={false}
                value={selectedGateway}
                wrapperClass={'gateway-filter-wrapper'}
              />
            </div>
          </div>
          <div className="graphBox">
            <div className="transtionDrop">
              <Select
                DropdownIcon={<img src={imgURL['overview-dropdown-blue']} />}
                onChange={(value) => setSelectedTransactionType(value)}
                optionList={totalTransactionsOptions}
                defaultValue={totalTransactionsOptions[0].label}
                bordered={false}
                value={selectedTransactionType}
                wrapperClass={'transaction-filter-wrapper'}
              />
              <Select
                DropdownIcon={<img src={imgURL['overview-dropdown-blue']} />}
                onChange={(value) => setSelectedVolumeType(value)}
                optionList={volumeAndCountOptions}
                defaultValue={volumeAndCountOptions[0].label}
                bordered={false}
                value={selectedVolumeType}
                wrapperClass={'volume-filter-wrapper'}
              />
              <div className="buttonAction">
                <button
                  className={timeSlot === 'hours' ? 'active' : ''}
                  onClick={() => setTimeSlot('hours')}
                >
                  Hourly
                </button>
                <button
                  className={timeSlot === 'daily' ? 'active' : ''}
                  onClick={() => setTimeSlot('daily')}
                >
                  Daily
                </button>
              </div>
            </div>
            {totalTransactionsDailyDataset &&
            selectedVolumeType === 'byVolumeCount' ? (
              <>
                <TotalTransactionsByVolumeAndCountChart
                  dataset={totalTransactionsDailyDataset}
                />
                <TransactionDetailsChartLegend
                  labelList={legendListForPaymentMethodChart}
                  filtersInBase64={generateToken({
                    fromDate: dateRange.startDate,
                    toDate: dateRange.endDate,
                    isHourly: timeSlot === 'hours' ? true : false,
                    paymentGateway: selectedGateway,
                  })}
                />
              </>
            ) : (
              <>
                <SuccessTransactionsByPaymentMethodChart
                  dataset={totalTransactionsDailyDataset}
                />
                <TransactionDetailsChartLegend
                  labelList={legendListForVolumeAndCountChart}
                  filtersInBase64={generateToken({
                    fromDate: dateRange.startDate,
                    toDate: dateRange.endDate,
                    isHourly: timeSlot === 'hours' ? true : false,
                    paymentGateway: selectedGateway,
                  })}
                />
              </>
            )}
          </div>
        </div>
        <div className="plateFormBox">
          <div className="graphSection">
            <h3>Platform</h3>
            <PlatformChart platformData={platformDataset} />
          </div>
          <PlatformDetails platformData={platformData} />
        </div>

        <div className="plateFormBox paymentMethod">
          <h3>Payment Method</h3>
          <ul>
            {paymentMethodsDataset.map((item, i) => (
              <PaymentMethodProgressUnit
                key={i}
                label={item.label}
                icon={item.icon}
                percentage={Number(Number(item.percentage).toFixed(2))}
                bgClass={item.bgClass}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="taday-transtion">

      <div className="transtion-block">
      <div className="inner-transtion-block">
        <h2>SETTLEMENTS</h2>
        <div className="settlementcard">
        <div className="settlementcol">
    <p>Total Settled</p>
    <h3>₹{merchantRecord!==""?merchantRecord["totalSettled"]:"0"} </h3>
  </div>
  <div className="settlementcol">
    <p># of Transactions Settled</p>
    <h3>{merchantRecord!==""?merchantRecord["transactionsSettled"]:"0"} </h3>
  </div>
  <div className="settlementcol">
    <p>Settlement as on 1 Oct</p>
    <h3>₹{merchantRecord!==""?merchantRecord["totalSettledToday"]:"0"} </h3>
  </div>
        </div>
      
      
         {/* <div className="foot">
          <div className="Transactions">
            <h4>{bottomLeftLabel}</h4>
            {numberWithCommas(totalTransactions)}
          </div>
          {successPercentage ? (
            <div className="Success">
              <h4>SUCCESS</h4>
              {`${successPercentage}%`}
            </div>
          ) : null}
        </div> */}
      </div>
      <div className="inner-transtion-block">
        <h2>REFUNDS</h2>
        <div className="settlementcard">
        <div className="settlementcol">
    <p>Total Refund Transactions</p>
    <h3>123456</h3>
  </div>
 
  <div className="settlementcol">
    <p>Total Refund Amount</p>
    <h3>₹50,000</h3>
  </div>
 
        </div>
        </div>


        </div>
   </div>
    </div>
  );
};

const mapStateToProps = ({ overviewReducer, smartRoutingReducer }) => ({
  transactionData:
    overviewReducer?.todayTransactionsState?.data?.transactionData ?? {},
  refundData: overviewReducer?.todayTransactionsState?.data?.refundData ?? {},
  todayDate: overviewReducer?.todayTransactionsState?.data?.todayDate,
  paymentModesData:
    overviewReducer?.overviewState?.data?.paymentModesTransactions ?? [],
  platformData: overviewReducer?.overviewState?.data?.platformTrendsData ?? {},
  allGatewaysList:
    smartRoutingReducer.gatewayListState.list?.length > 0
      ? smartRoutingReducer.gatewayListState.list
      : [],
  transactionAccordingToDateTime:
    overviewReducer?.overviewState?.data?.transactionAccordingToDateTime ?? [],
});

export default connect(mapStateToProps, {
  getTodayTransactionsDataAction,
  getOverviewDataAction,
  getGatewayListAction,
  clearOverviewStateAction,
})(Overview);
