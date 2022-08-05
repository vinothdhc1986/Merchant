import { preferenceType } from '../PreferenceScoreTab/typing';

interface managePriorityRoutingProps {
  handleCancel: CallableFunction;
  handleSave: (data: {
    titleValue: string;
    gateway: string;
    preferenceScore: string;
    type: preferenceType;
    mode: 'edit' | 'add';
    isUpdated: boolean;
  }) => void;
  payload: {
    id: string;
    titleValue: string;
    gateway: string;
    preferenceScore: string;
    mode: 'add' | 'edit';
    type: preferenceType;
  };
  cardBrandNames: Array<string>;
  issuerNames: Array<string>;
  gatewayNames: Array<{ label: string; value: string }>;
}

export default managePriorityRoutingProps;
