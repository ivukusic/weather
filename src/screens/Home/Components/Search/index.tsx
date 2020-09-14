import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

import TextInput from 'library/common/components/FormComponents/TextInput';

import weatherImage from 'resources/weather.jpg';
import './Search.style.scss';

export const Search = ({ className }: ISearchProps): JSX.Element => {
  const [address, setAddress] = useState<string>('');
  const [suggestionsVisible, setSuggestionsVisible] = useState<boolean>(false);

  const onBlurSearch = () => {
    setSuggestionsVisible(false);
  };

  const onFocusSearch = () => {
    setSuggestionsVisible(true);
  };

  const handleChange = address => {
    setAddress(address);
  };

  const handlePick = suggestion => async () => {
    // const { success, data } = await getWeatherDataByCity(suggestion.description);
    // console.log({ success, data });
  };

  return (
    <div className={`search } ${!!className && className}`}>
      <img src={weatherImage} alt="Weather - weather background" />
      <div className="search-container">
        <div className="search_input-container">
          <PlacesAutocomplete value={address} onChange={handleChange}>
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <>
                <div>
                  <TextInput
                    {...getInputProps()}
                    className="location-search-input search-container_input-container"
                    inputClassName="search-container_input"
                    onBlur={onBlurSearch}
                    onFocus={onFocusSearch}
                    placeholder="Search city..."
                  />
                </div>

                <div className={`search_result${suggestionsVisible ? ' search_result--visible' : ''}`}>
                  <div className="search_result_item">Use your current location</div>
                  {suggestions.map((suggestion, index) => (
                    <div
                      {...getSuggestionItemProps(suggestion, { className: 'search_result_item' })}
                      key={index}
                      onClick={handlePick(suggestion)}
                    >
                      {suggestion.description}
                    </div>
                  ))}
                </div>
              </>
            )}
          </PlacesAutocomplete>
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
