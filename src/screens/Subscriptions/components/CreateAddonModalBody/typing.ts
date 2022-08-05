interface AddonModalFormData {
  addonName: string;
  amountPerUnit: string;
}

interface Props {
  closeModal: () => void;
  createAddonHandler: () => void;
  addonModalFormData: AddonModalFormData;
  addonModalChangeHandler: (name: string, value: string) => void;
}

export default Props;
