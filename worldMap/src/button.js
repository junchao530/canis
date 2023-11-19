import React, { useState } from 'react';
import parentCompaniesData from './final_data_with_cn_provinces.json';
import { useCountries } from './Countries';

const SearchBar = ({ setCountries }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedParentCompany, setSelectedParentCompany] = useState(null);
    const [activeMenu, setActiveMenu] = useState('Monopoly');
    const { countries } = useCountries();

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
        let updatedCountries = { ...countries };

        // Zero out list before updating
        Object.keys(updatedCountries).forEach((country) => {
            updatedCountries[country] = 0;
        });

        const companyCountries = parentCompaniesData[parentCompany];
        Object.keys(companyCountries).forEach((childCompany) => {
            const countryData = companyCountries[childCompany];
            const countryCodes = Array.isArray(countryData) ? countryData : [countryData];
            countryCodes.forEach((code) => {
                if (updatedCountries.hasOwnProperty(code)) {
                    updatedCountries[code] = 255;
                }
            });
        });

        setCountries(updatedCountries);
    };

    const containerStyle = {
        background: 'rgb(40, 44, 52)',
        border: '1px solid',
        borderRadius: '10px',

        width: '500px',
        height: '800px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column', // Arrange items vertically
        alignItems: 'center', // Center items horizontally
    };

    const inputStyle = {
        background: 'rgb(63, 70, 82)',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        padding: '10px',
        width: '75%',
        marginBottom: '10px',
    };

    const scrollableListStyle = {
        marginTop: '20px',
        maxHeight: '300px',
        overflow: 'auto',
    };

    const handleMenuToggle = (menu) => {
        setActiveMenu(menu);
    };

    
     const scrollableListStyleSmall= {
        marginTop: '20px',
        maxHeight: '200px',
        overflow: 'auto',
    };

    const resultItemStyle = {
        cursor: 'pointer',
        marginBottom: '5px',
        backgroundColor: activeMenu === 'Monopoly' ? 'yourColorCodeForMonopoly' : '',
        color: activeMenu === 'Monopoly' ? 'yourTextColorForMonopoly' : '',
    };

    const buttonContainerStyle = {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginBottom: '10px', 
    };

    const clickableTextStyle = {
        cursor: 'pointer',
        fontSize: '24px',
        textDecoration: activeMenu === 'Monopoly' ? 'underline' : 'none',
        fontWeight: 'bold',
        color: activeMenu === 'Sentiment Analysis' ? 'yourColorCodeForSentiment' : 'white',
        marginBottom: '10px',
    };

    const sentimentAnalysisStyle = {
    ...clickableTextStyle,
    marginLeft: '20px', // Add left margin to create space between buttons
    textDecoration: activeMenu === 'Sentiment Analysis' ? 'underline' : 'none',
};

    const childCompanyStyle = {
        marginBottom: '5px',
    };

    return (
     <div style={containerStyle}>
            <div style={buttonContainerStyle}>
            <div style={clickableTextStyle} onClick={() => handleMenuToggle('Monopoly')}>
                Monopoly Index
            </div>
            <div style={sentimentAnalysisStyle} onClick={() => handleMenuToggle('Sentiment Analysis')}>
                Sentiment Analysis
            </div>
        </div>
            <input
                type="text"
                placeholder="Search for parent companies..."
                value={searchTerm}
                onChange={handleSearch}
                style={inputStyle}
            />
            <div style={scrollableListStyle}>
                {activeMenu === 'Monopoly' &&
                    searchResults.map((result, index) => (
                        <div key={index} style={resultItemStyle} onClick={() => handleParentCompanyClick(result)}>
                            {result}
                        </div>
                    ))
                }
                {activeMenu === 'Sentiment Analysis' && (
                    /* PUT Code for Sentimenet Analsyis Render here */
                    searchResults.map((result, index) => (
                        <div key={index} style={resultItemStyle} onClick={() => handleParentCompanyClick(result)}>
                            {result}
                        </div>
                    ))
                )}
            </div>
            {selectedParentCompany && (
                <div>
                    <h2 style={childCompanyStyle}>{selectedParentCompany}</h2>
                    <ul style={scrollableListStyleSmall}>
                        {Object.entries(parentCompaniesData[selectedParentCompany]).map(([childCompanyName, countryData], index) => {
                            const countries = Array.isArray(countryData) ? countryData.join(', ') : countryData;
                            return (
                                <li key={index} style={childCompanyStyle}>
                                    {childCompanyName} - {countries}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
