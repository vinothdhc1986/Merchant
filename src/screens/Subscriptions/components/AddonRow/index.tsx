import React, { FC } from 'react';
import Input from '../../../../components/TextInput';
import imgURL from '../../../../lib/imgURL';
import SelectDropdown from '../../../../components/Select';

import Props from './typing';
import './style.scss';

const AddonRow: FC<Props> = (): JSX.Element => {
  return (
    <React.Fragment>
      <div className="addon-list">
        <div className="adon-col">
          <label>Addon 1</label>
          <div className="filter-dropdown">
            <SelectDropdown
              placeholder={'select'}
              onChange={() => {}}
              defaultValue={'select'}
              // optionList={plansOptions}
            />
          </div>
        </div>
        <div className="adon-col">
          <Input
            id="totalCounts"
            isRequired={true}
            label="Total Counts"
            type="number"
            value={''}
            className=""
            placeholder="Total Counts"
            handleChange={() => {}}
            // error={!!planFormError.planName}
            // errorMessage={planFormError.planName}
          />
        </div>
        <div className="adon-col">
          <div className="addon-value">₹100 x 2</div>
        </div>
        <div className="adon-col">
          <button>
            <img src={imgURL['close-model']} alt="" />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddonRow;
