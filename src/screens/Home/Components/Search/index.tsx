import React, { useContext, useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

import { AlertMessagesContext, Loader, TextInput } from 'library/common/components';
import weatherImage from 'resources/weather.jpg';
import { ISearchProps } from './Search.type';

import './Search.style.scss';

export const Search = ({ className, onSelect }: ISearchProps): JSX.Element => {
  const { addAlertMessages } = useContext(AlertMessagesContext);

  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestionsVisible, setSuggestionsVisible] = useState<boolean>(false);

  const onBlurSearch = () => {
    setSuggestionsVisible(false);
  };

  const onFocusSearch = () => {
    setSuggestionsVisible(true);
  };

  const handleChange = address => {
    console.log(address)
    setAddress(address);
  };

  const handlePick = suggestion => async () => {
    setLoading(true);
    if (suggestion.description === 'current-location') {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const { success } = await onSelect({ lat: position.coords.latitude, long: position.coords.longitude });
          if (!success) {
            setLoading(false);
            addAlertMessages([{ type: 'error', message: 'Something went wrong fetching weather for your location.' }]);
          }
        },
        () => {
          addAlertMessages([{ type: 'error', message: 'Something went wrong fetching your location.' }]);
        },
      );
    } else {
      const { success } = await onSelect({ city: suggestion.description });
      if (!success) {
        setLoading(false);
        addAlertMessages([{ type: 'error', message: 'Something went wrong fetching weather for your location.' }]);
      }
    }
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
                  {loading && (
                    <div className="search-loader">
                      <Loader />
                    </div>
                  )}
                </div>

                <div className={`search_result${suggestionsVisible ? ' search_result--visible' : ''}`}>
                  <div className="search_result_item" onClick={handlePick({ description: 'current-location' })}>
                    Use your current location
                  </div>
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
};

export default Search;
