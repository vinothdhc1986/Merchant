import React, { FC } from 'react';
import imgURL from '../../lib/imgURL';
import Input from '../TextInput';
import Props from './typing';
import './style.scss';

const SearchField: FC<Props> = (props): JSX.Element => {
  const { name, searchValue, handleChange, placeholder, handleSubmit } = props;
  return (
    <div className="plan-search-field">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Input
          name={name}
          type="text"
          placeholder={placeholder}
          value={searchValue}
          handleChange={handleChange}
        />
        <button type="submit" className="search-bt">
          <img src={imgURL['search-icon']} alt="search" />
        </button>
      </form>
    </div>
  );
};

export default SearchField;
