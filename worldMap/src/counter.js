import React from 'react';
import parentCompaniesData from './final_data_with_cn_provinces.json';


const CountryShowcase = ({ selectedCountryCode, selectedCountryName, filteredResults }) => {

    const containerStyle = {
        background: 'rgb(40, 44, 52)',
        border: '1px solid',
        borderRadius: '10px',
        width: '500px',
        height: '800px',
        color: 'white',
    };

    const scrollableListStyle = {
        maxHeight: '650px',
        overflow: 'auto',
    };

    const childCompanyStyle = {
        marginBottom: '5px',
    };
    return (
        <div style={containerStyle}>
            <h1>{selectedCountryName ? `Media Companies in ${selectedCountryName}` : 'Country Counter'}</h1>
            <div style={scrollableListStyle}>
                {selectedCountryCode && filteredResults.map(({ parentCompany, childEntity, countries }, index) => (
                    <div key={index}>
                        <ul>
                            <li style={childCompanyStyle}>
                                {childEntity} 
                            </li>
                        </ul>
                    </div>
                ))}
                {!selectedCountryCode && "Please select a country on the map."}
            </div>
        </div>
    );
};
export default CountryShowcase;

