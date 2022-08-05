import React, { FC, useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce ';
import AutoComplete from 'antd/lib/auto-complete';
import Input from 'antd/lib/input';
import imgURL from '../../lib/imgURL';
import { SEARCH_DELAY_BUFFER } from 'lib/constants';
import Props from './typing';
import './style.scss';

const { Option } = AutoComplete;

const DELAY = SEARCH_DELAY_BUFFER;

const CustomSearchInput: FC<Props> = (props): JSX.Element => {
  const [search, setSearch] = useState('');
  const {
    placeholder,
    handleSearch,
    searchRecordsHandler,
    customWidth,
    suffix,
  } = props;

  useEffect(() => {
    if (props.value) {
      setSearch(props.value);
    }
  }, []);

  const [isOpen, setIsOpen] = useState(true);

  const debouncedSearchValue = useDebounce(search, DELAY);

  useEffect(() => {
    searchRecordsHandler(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const renderOption = (item) => {
    return (
      <Option key={item} text={item} value={item}>
        <span>{item}</span>
      </Option>
    );
  };

  const handleSearchIcon = () => {
    handleSearch(search);
    setSearch(search);
  };

  let style;
  customWidth
    ? (style = { width: `${customWidth}`, borderRadius: '20px' })
    : (style = { width: '40%', borderRadius: '20px' });

  return (
    <React.Fragment>
      <div className='auto-suggest-search-container'>
        <AutoComplete
          value={search}
          style={style}
          dataSource={isOpen ? (props.list || []).map(renderOption) : []}
          onSelect={(selectedOption) => {
            setSearch(selectedOption);
            handleSearch(selectedOption);
          }}
          onChange={(e) => {
            setSearch(e);
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchIcon();
            }
          }}
        >
          <Input
            suffix={
              suffix ? (
                suffix
              ) : (
                <img
                  onClick={() => {
                    handleSearchIcon();
                    setIsOpen(false);
                  }}
                  src={imgURL['search-icon']}
                  alt='search'
                />
              )
            }
            placeholder={placeholder || ''}
          />
        </AutoComplete>
      </div>
    </React.Fragment>
  );
};

export default CustomSearchInput;
