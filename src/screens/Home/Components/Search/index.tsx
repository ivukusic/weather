import React, { useState } from 'react';

import weatherImage from 'resources/weather.jpg';

import TextInput from 'library/common/components/FormComponents/TextInput';
import './Search.style.scss';

export const Search = ({ className }: ISearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState<boolean>(false);

  const onBlurSearch = () => {
    setSuggestionsVisible(false);
  };

  const onChangeText = (value: string) => {
    setSearch(value);
  };

  const onFocusSearch = () => {
    setSuggestionsVisible(true);
  };

  return (
    <div className={`search } ${!!className && className}`}>
      <img src={weatherImage} alt="Weather - weather background" />
      <div className="search-container">
        <div className="search_input-container">
          <TextInput
            className="search-container_input-container"
            inputClassName="search-container_input"
            onBlur={onBlurSearch}
            onChange={onChangeText}
            onFocus={onFocusSearch}
            placeholder="Search city..."
            value={search}
          />
          <div className={`search_result${suggestionsVisible ? ' search_result--visible' : ''}`}>
            <div className="search_result_item">Use your current location</div>
            <div className="search_result_item">Rijeka, Primorsko Goranska, Hrvatska</div>
            <div className="search_result_item">Rijeka Crnojevica, Cetinje, ME</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Search.defaultProps = {
  className: '',
  type: 'primary',
};

interface ISearchProps {
  className?: string;
}

export default Search;
