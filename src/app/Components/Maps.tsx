'use client';

import { GoogleMap, Marker } from '@react-google-maps/api';
import { useCallback, useMemo, useRef, useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

export const defaultMapContainerStyle = {
  width: '70%',
  height: '60vh',
  borderRadius: '15px 0px 0px 15px',
};

const defaultMapZoom = 13;

const MapComponent = () => {
  const [toffeeProduct, setToffeeProduct] = useState('');
  const [toffeeLocation, setToffeeLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [toffeeDescription, setToffeeDescription] = useState('');
  const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(
    null
  );

  // First usePlacesAutocomplete for general location
  const {
    ready: generalReady,
    value: generalValue,
    setValue: setGeneralValue,
    suggestions: { status: generalStatus, data: generalData },
    clearSuggestions: clearGeneralSuggestions,
  } = usePlacesAutocomplete();

  // Second usePlacesAutocomplete for toffee location
  const {
    ready: toffeeReady,
    value: toffeeValue,
    setValue: setToffeeValue,
    suggestions: { status: toffeeStatus, data: toffeeData },
    clearSuggestions: clearToffeeSuggestions,
  } = usePlacesAutocomplete();

  // Function to handle the general location select
  const handleSelect = async (val: string) => {
    setGeneralValue(val, false);
    clearGeneralSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setLocation({ lat, lng });
    setGeneralValue('');
  };

  // Function to handle toffee location select
  const handleToffeeLocation = async (val: string) => {
    setToffeeValue(val, false);
    clearToffeeSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setToffeeLocation({ lat, lng });
    setToffeeValue('');
  };

  const mapRef = useRef<GoogleMap>();
  const defaultMapCenter = useMemo(
    () => ({ lat: 30.266666, lng: -97.73333 }),
    []
  );
  const defaultMapOptions = useMemo(
    () => ({
      zoomControl: true,
      tilt: 0,
      gestureHandling: 'auto',
      mapTypeId: 'roadmap',
      clickableIcons: false,
      disableDefaultUI: true,
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-center items-center">
        <GoogleMap
          mapContainerStyle={defaultMapContainerStyle}
          center={location || toffeeLocation || defaultMapCenter}
          zoom={defaultMapZoom}
          options={defaultMapOptions}
          onLoad={onLoad}
        >
          {toffeeLocation && (
            <>
              <Marker position={toffeeLocation} />
            </>
          )}
        </GoogleMap>
      </div>

      {/* General location search */}
      <div id="form" className="inline-flex items-center gap-2 mt-4">
        <p>Narrow your search:</p>
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={generalValue}
            onChange={(e) => setGeneralValue(e.target.value)}
            disabled={!generalReady}
            className="combobox-input"
            placeholder="Enter a location"
          />
          <ComboboxPopover>
            <ComboboxList>
              {generalStatus === 'OK' &&
                generalData.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>

      <div className="text-center text-orange-500 text-3xl">Report Toffee</div>
      <form className="flex flex-col w-1/3 self-center gap-4 m-2">
        <div className="w-full">
          <p>Name of Toffee Product</p>
          <input
            type="text"
            placeholder="Toffee Product"
            className="w-full outline-1 outline-orange-500"
            value={toffeeProduct}
            onChange={(e) => setToffeeProduct(e.target.value)}
          />
        </div>

        {/* Toffee location search */}
        <div className="w-full">
          <p>Where did you find the toffee?</p>
          <Combobox onSelect={handleToffeeLocation}>
            <ComboboxInput
              value={toffeeValue}
              onChange={(e) => setToffeeValue(e.target.value)}
              disabled={!toffeeReady}
              className="combobox-input"
              placeholder="Toffee Location"
            />
            <ComboboxPopover>
              <ComboboxList>
                {toffeeStatus === 'OK' &&
                  toffeeData.map(({ place_id, description }) => (
                    <ComboboxOption key={place_id} value={description} />
                  ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        </div>

        <div className="w-full">
          <p>Describe the toffee</p>
          <input
            type="text"
            placeholder="Description"
            className="w-full outline-1 outline-orange-500"
            value={toffeeDescription}
            onChange={(e) => setToffeeDescription(e.target.value)}
          />
        </div>

        <button className=" text-white text-lg self-center bg-orange-500 h-10 w-1/4 shadow-lg drop-shadow-sm shadow-inherit rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export { MapComponent };
