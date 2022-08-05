import React, { FC, useEffect, useState } from 'react';
import useRedirect from '../../../../hooks/useRedirect';
import { UiRoutes } from '../../../../lib/constants';
import Modal from '../../../../components/Modal';
import BeneficiaryType from '../modalBodyComponents/BeneficiaryType';
import ExistingBeneficiary from '../modalBodyComponents/ExistingBeneficiary';
import TransferDetails from '../modalBodyComponents/TransferDetails';
import SchedulePayout from '../modalBodyComponents/SchedulePayout';
import ConfirmPayout from '../modalBodyComponents/ConfirmPayout';
import { connect } from 'react-redux';
import Props from './typings';
import notify from 'lib/notifiy';
import { getMerchantIdFromStore } from 'lib/helper';
import {
  addNewIndividualPayoutAction,
  clearAddIndividualPayoutAction,
  clearGetBeneficiaryByCodeAction,
} from 'redux/actions/payouts';
import { add, format } from 'date-fns';

const CurrentStepModalBody: FC<Props & { setIsConfirmPage: CallableFunction }> =
  (props): JSX.Element => {
    const { setIsConfirmPage } = props;
    const merchantId = getMerchantIdFromStore().toString();
    const { push } = useRedirect();
    const [search, setSearch] = useState('');

    useEffect(() => {
      return () => {
        // clear actions only if modal is closed
        props.clearGetBeneficiaryByCodeAction();
        props.clearAddIndividualPayoutAction();
      };
    }, []);

    useEffect(() => {
      const { isSuccess, isFailure, errorMessage } =
        props.addIndividualPayoutState;

      if (isSuccess) {
        props.fetchPayoutList();
        props.closeModal();
        notify({
          type: 'success',
          message: 'Payout Initiated Successfully!',
          description: `Payout for ${existingBeneficiary.beneficiaryName} has been initiated.`,
        });
      }
      if (isFailure) {
        notify({
          type: 'error',
          message: 'Payout Initiation Failed',
          description: errorMessage,
        });
      }
    }, [props.addIndividualPayoutState]);

    const [currentStepModal, setCurrentStepModal] = useState<
      | 'BENEFICIARY_TYPE'
      | 'EXISTING_BENEFICIARY'
      | 'NEW_BENEFICIARY'
      | 'TRANSFER_TYPE'
      | 'SCHEDULE_PAYOUT'
      | 'CONFIRM_PAYOUT'
    >('BENEFICIARY_TYPE');

    const [beneficiaryType, setBeneficiaryType] = useState('');
    const [scheduleType, setScheduleType] = useState('');
    const [scheduleDateTime, setScheduleDateTime] = useState(
      add(new Date(), {
        days: 1,
      })
    );
    const [existingBeneficiary, setExistingBeneficiary] = useState({
      beneficiaryName: '',
      beneficiaryCode: '',
      VPA: '',
    });
    const [transferDetails, setTransferDetails] = useState({
      amount: 0,
      transferType: '',
      remarks: '',
    });

    const beneficiaryTypeOnProceedHandler = (type: string) => {
      setBeneficiaryType(type);
      if (type === 'existingBeneficiary')
        setCurrentStepModal('EXISTING_BENEFICIARY');
      if (type === 'newBeneficiary') {
        setCurrentStepModal('NEW_BENEFICIARY');
        push(UiRoutes.BENEFICIARIES, {
          isAddBeneficirayModalOpen: true,
        });
      }
    };

    const existingBeneficiaryOnProceedHandler = (beneficiaryDetails) => {
      setExistingBeneficiary({
        ...beneficiaryDetails,
      });
      setCurrentStepModal('TRANSFER_TYPE');
    };

    const transferDetailsOnProceedHandler = (transferDetails) => {
      setTransferDetails({
        ...transferDetails,
      });
      setCurrentStepModal('SCHEDULE_PAYOUT');
    };

    const schedulePayoutTypeOnProceedHandler = ({
      schedulePayoutType,
      scheduleDateTime,
    }) => {
      setScheduleType(schedulePayoutType);
      setScheduleDateTime(scheduleDateTime);
      setCurrentStepModal('CONFIRM_PAYOUT');
    };

    const confirmPayoutOnProceedHandler = () => {
      const formattedScheduleDate = format(
        scheduleDateTime,
        'yyyy-MM-dd HH:mm'
      );
      const formattedScheduleDateAndTimeInArray =
        formattedScheduleDate.split(' ');

      const payload = {
        amount: transferDetails.amount,
        beneficiaryCode: existingBeneficiary.beneficiaryCode,
        merchantId: merchantId,
        paymentType: transferDetails.transferType,
        remarks: transferDetails.remarks,
        payLater: scheduleType === 'scheduleForLater',
        ...(scheduleType === 'scheduleForLater' && {
          payDate: formattedScheduleDateAndTimeInArray[0],
          payTime: formattedScheduleDateAndTimeInArray[1],
        }),
      };
      props.addNewIndividualPayoutAction({
        ...payload,
      });
    };

    useEffect(() => {
      if (currentStepModal === 'CONFIRM_PAYOUT') {
        setIsConfirmPage(true);
      } else {
        setIsConfirmPage(false);
      }
    }, [currentStepModal, setIsConfirmPage]);

    switch (currentStepModal) {
      case 'EXISTING_BENEFICIARY':
        return (
          <ExistingBeneficiary
            closeModal={props.closeModal}
            onProceed={(beneficiaryDetails, searchText) => {
              existingBeneficiaryOnProceedHandler(beneficiaryDetails);
              setSearch(searchText);
            }}
            onBackClick={() => setCurrentStepModal('BENEFICIARY_TYPE')}
            search={search}
          />
        );
      case 'TRANSFER_TYPE':
        return (
          <TransferDetails
            closeModal={props.closeModal}
            onProceed={(transferDetails) => {
              transferDetailsOnProceedHandler(transferDetails);
            }}
            onBackClick={() => {
              setCurrentStepModal('EXISTING_BENEFICIARY');
            }}
            isVPA={existingBeneficiary.VPA ? true : false}
            validationErrors={props.validationErrors}
            savedTransferDetails={transferDetails}
          />
        );
      case 'SCHEDULE_PAYOUT':
        return (
          <SchedulePayout
            closeModal={props.closeModal}
            onBackClick={() => {
              setCurrentStepModal('TRANSFER_TYPE');
            }}
            onProceed={({ schedulePayoutType, scheduleDateTime }) => {
              schedulePayoutTypeOnProceedHandler({
                schedulePayoutType,
                scheduleDateTime,
              });
            }}
            savedSchedulePayoutDetails={{ scheduleType, scheduleDateTime }}
          />
        );

      case 'CONFIRM_PAYOUT':
        return (
          <ConfirmPayout
            onBackClick={() => {
              setCurrentStepModal('SCHEDULE_PAYOUT');
            }}
            onProceed={() => {
              confirmPayoutOnProceedHandler();
            }}
            scheduleType={scheduleType}
            scheduleDateTime={scheduleDateTime}
            transferTypeDetails={transferDetails}
            existingBeneficiaryDetails={existingBeneficiary}
            closeModal={props.closeModal}
          />
        );
      default:
        return (
          <BeneficiaryType
            closeModal={props.closeModal}
            onProceed={(type: string) => beneficiaryTypeOnProceedHandler(type)}
            beneficiaryType={beneficiaryType}
            setBeneficiaryType={setBeneficiaryType}
          />
        );
    }
  };

const RenderModalBody: FC<Props> = (props) => {
  const [isConfirmPage, setIsConfirmPage] = useState<boolean>(false);

  return (
    <div>
      <h2 className='title'>Initiate Individual Payout</h2>
      <p className='description'>
        {isConfirmPage
          ? 'Please confirm the details to initiate the payout.'
          : 'Please fill the following details to proceed'}
      </p>
      <CurrentStepModalBody {...props} setIsConfirmPage={setIsConfirmPage} />
    </div>
  );
};

const IndividualPayoutModal: FC<Props> = (props): JSX.Element => {
  return (
    <React.Fragment>
      <Modal
        ModalBody={RenderModalBody}
        modalBodyProps={{ ...props }}
        onBackdropClick={() => props.closeModal()}
      />
    </React.Fragment>
  );
};

const mapStateToProps = ({ validationReducer, payoutsReducer }) => ({
  validationErrors: validationReducer.validationErrorState.validationErrors,
  addIndividualPayoutState: payoutsReducer.addIndividualPayoutState,
  scheduleNewIndividualPayoutState:
    payoutsReducer.scheduleNewIndividualPayoutState,
});

export default connect(mapStateToProps, {
  addNewIndividualPayoutAction,
  clearAddIndividualPayoutAction,
  clearGetBeneficiaryByCodeAction,
})(IndividualPayoutModal);
