import { VectorMap } from '@react-jvectormap/core';
import { worldMill } from '@react-jvectormap/world';
import React, { useEffect, useState } from 'react';
import SearchBar from './button';
import { useCountries, colorScale } from './Countries';
import CountryShowcase from './counter';
import parentCompaniesData from './final_data_with_cn_provinces.json'; // Adjust the path as necessary
import countryCodeToNameMap from './conversion';
import tweetData from './Twitter_Data_Enhanced.json'; // Adjust the path as needed

function WorldMap() {
  const { countries, setCountries } = useCountries();
  const [mapKey, setMapKey] = useState(0);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const [selectedCountryName, setSelectedCountryName] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const processedTweetData = processTweetData(tweetData);

  const handleRegionClick = (event, code) => {
    // The 'code' parameter should give us the country code directly
    setSelectedCountryCode(code);

    // Use a function or a mapping to get the country name from the code
    // This is a placeholder function. You need to implement this based on your requirements
    const countryName = getCountryNameFromCode(code); // Implement this function
    setSelectedCountryName(countryName);

    const results = by_country(code);
    setFilteredResults(results);
};

const getCountryNameFromCode = (code) => {
  return countryCodeToNameMap[code] || 'Unknown';

};
// const colorScale = {
//   '0': '#FFFFFF', // White for zero value
  
// };

const by_country = (countryCode) => {
  const results = [];
  for (const parentCompany in parentCompaniesData) {
      const childEntities = parentCompaniesData[parentCompany];
      for (const childEntity in childEntities) {
          const countries = childEntities[childEntity];
          if (Array.isArray(countries) && countries.includes(countryCode)) {
              results.push({ parentCompany, childEntity, countries });
          } else if (countries === countryCode) {
              results.push({ parentCompany, childEntity, countries: [countryCode] });
          }
      }
  }
  return results;
};


  useEffect(() => {
    setMapKey((prevKey) => prevKey + 1); //Force rerender of new countries
  }, [countries]);

  return (
    <div
      style={{
        display: 'flex',
        paddingTop: '40px',
        margin: 'auto',
        width: '1800px',
        height: '800px',
        justifyContent: 'space-between', // Center the map and distribute space around it
      }}
    >
      <div style={{ flex: 1 }}>
      <CountryShowcase 
    selectedCountryCode={selectedCountryCode} 
    selectedCountryName={selectedCountryName} 
    filteredResults={filteredResults}
/>

      </div>
      <div style={{ flex: 2, marginLeft: '20px', marginRight: '20px' }}>
        <VectorMap
          key={mapKey}
          map={worldMill}
          containerStyle={{
            width: '100%',
            height: '600px',
            border: '1px solid',
            borderRadius: '10px',
            
          }}
          backgroundColor= 'rgb(63, 70, 82)'
          series={{
            regions: [
              {
                scale: colorScale,
                values: countries,
                min:  Math.min(...Object.values(countries)),
                max: Math.max(...Object.values(countries)),
              },
            ],
          }}
          onRegionTipShow={function reginalTip(event, label, code) {
            return label.html(`
                      <div style="background-color: black; border-radius: 6px; min-height: 50px; width: 125px; color: white"; padding-left: 10px>
                        <p>
                        <b>
                        ${label.html()}
                        </b>
                        </p>
                        <p>
                        ${code}
                        ${countries[code]}
                        </p>
                        </div>`);
          }}
        onRegionClick={handleRegionClick}
        />
      </div>
      <div style={{ flex: 1 }}>
        <SearchBar setCountries={setCountries} />
      </div>
    </div>
  );
}

export default WorldMap;
