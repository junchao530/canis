import React, { useState} from 'react';
import parentCompaniesData from './organization_data.json';
import { useCountries } from './Countries';

const SearchBar = ({ setCountries }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedParentCompany, setSelectedParentCompany] = useState(null);
    const {countries} = useCountries();
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
  
      if (event.target.value !== '') {
        const results = Object.keys(parentCompaniesData)
          .filter(company =>
            company.toLowerCase().includes(event.target.value.toLowerCase())
          );
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    };
  
    const handleParentCompanyClick = (company) => {
      setSelectedParentCompany(company);
      updateCountries(company);
    };

    const updateCountries = (parentCompany) => {
      let updatedCountries = {...countries};
      
      //Zero out list before updating
       Object.keys(updatedCountries).forEach((country) => {
        updatedCountries[country] = 0;
      });
      
      switch(parentCompany){
        case "China Media Group (CMG)":
          updatedCountries.CN = 255;
          break;
        default:
          break;
      }
      setCountries(updatedCountries);

    }

    const searchResultStyle = {
        cursor: 'pointer',
        color: 'white',
        textDecoration: 'none',
      };
    
      const childCompanyStyle = {
        color: 'white',
      };
    const containerStyle = {
      border: '1px solid white',
      padding: '10px',
      margin: '10px',
      borderRadius: '5px',
    };
    
    const scrollableListStyle = {
        maxHeight: '200px', // Adjust the height as per your design
        overflow: 'auto',
        marginTop: '10px',
    };
  
    return (
      <div style={containerStyle}>
        <input
          type="text"
          placeholder="Search for parent companies..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <div style={scrollableListStyle}>
          {searchResults.map((result, index) => (
            <div key={index} style={searchResultStyle} onClick={() => handleParentCompanyClick(result)}>
              {result}
            </div>
          ))}
        </div>
        {selectedParentCompany && (
          <div>
            <h3 style={childCompanyStyle}> {selectedParentCompany}</h3>
            <ul style={scrollableListStyle}>
              {Object.keys(parentCompaniesData[selectedParentCompany]).map((childCompany, index) => (
                <li key={index}  style={childCompanyStyle}>{childCompany}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default SearchBar;