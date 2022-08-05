import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CustomNoDataFound from '../../components/CustomNoDataFound';
import CustomTable from '../../components/CustomTable';
import SubHeader from 'components/SubHeader';
import CustomSearchInput from '../../components/CustomSearchInput';
import { getMerchantListAction, merchantSearchAction } from '../../redux/actions/merchantListing';
import { setMerchantInfoAction } from '../../redux/actions/login';
import { tableConstants } from './listing.constants';
import { PER_PAGE_LIMIT } from '../../lib/constants';
import Props, { GetMerchantListApiPayloadType } from './typing';
import './style.scss';

const MerchantListing: FC<Props> = (props): JSX.Element => {
  const { MerchantListRecords, totalRecords, searchRecords } = props;
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [orderBy, setorderBy] = useState('');
  const [searchText, setSearchText] = useState('');

  const fetchMerchantListing = ({
    pageNo,
    sortBy,
    orderBy,
    merchantName,
  }: GetMerchantListApiPayloadType) => {
    let requestPayload = {};
    if (merchantName) {
      requestPayload = {
        sortBy,
        orderBy,
        merchantName,
      };
    }
    else {
      requestPayload = {
        sortBy,
        orderBy,
      };
    }

    props.getMerchantListAction({
      pageNo: pageNo,
      limit: PER_PAGE_LIMIT,
      payload: {
        ...requestPayload,
      },
    });
  };

  useEffect(() => {
    fetchMerchantListing({
      pageNo: 1,
    });
  }, []);

  const onPageChange = (pageNo: number) => {
    fetchMerchantListing({
      pageNo,
      sortBy,
      orderBy,
    });
    setPage(pageNo);
  };

  useEffect(() => {
    fetchMerchantListing({
      pageNo: page,
      sortBy,
      orderBy,
      merchantName: searchText,
    });
  }, [page, sortBy, orderBy, searchText]);

  const handleSorting = ({
    columnName,
    order,
  }: {
    columnName: string;
    order: string;
  }) => {
    fetchMerchantListing({
      pageNo: page,
      sortBy: columnName,
      orderBy: order,
    });
    setSortBy(columnName);
    setorderBy(order);
  };

  const merchantRedirectionHandler = (
    merchantId: number,
    merchantName: string,
    isTRMEnabled: boolean,
    merchantEmailId: string,
    isPayoutEnabled: boolean,
    payoutBankId: string | null,
  ) => {
    props.setMerchantInfoAction({
      merchantId,
      merchantName,
      isTRMEnabled,
      merchantEmailId,
      isPayoutEnabled,
      payoutBankId,
    });
  };

  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
    setPage(1);
  };

  const searchRecordsHandler = (value: string) => {
    props.merchantSearchAction({ searchPattern: value });
  };

  return <div className='merchant-listing-container'>
    <SubHeader
      title='Merchants'
    // description='Placeholder'
    />
    <div className='filtering-row'>
      <CustomSearchInput
        placeholder='Search for a Merchant Name'
        list={searchRecords || []}
        handleSearch={(searchValue) => handleSearch(searchValue)}
        searchRecordsHandler={(value) => searchRecordsHandler(value)}

      />
    </div>
    {MerchantListRecords.length > 0 ? (
      <CustomTable
        columns={tableConstants(merchantRedirectionHandler)}
        dataSource={MerchantListRecords}
        handleSorting={handleSorting}
        showPagination={Boolean(totalRecords > 0)}
        onPageChangeHandler={onPageChange}
        totalRecords={totalRecords}
        currentPage={page}
      />
    ) : (<CustomNoDataFound
      title='There are no Merchant here!'
      subTitle='All Merchant Listing will show up here'
    />)}
  </div>;
};

const mapStateToProps = ({ MerchantListingReducer }) => ({
  MerchantListRecords:
    MerchantListingReducer.merchantList?.data.merchantInfoModelList ?? [],
  totalRecords: MerchantListingReducer.merchantList.data?.totalRows ?? 0,
  searchRecords: MerchantListingReducer.merchantSearch?.data ?? [],
});

export default connect(mapStateToProps, {
  getMerchantListAction,
  setMerchantInfoAction,
  merchantSearchAction,
})(MerchantListing);
