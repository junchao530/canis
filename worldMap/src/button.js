import React, { useState, useEffect } from 'react';
import reprocessedData from './reprocessed_organization_data.json'; // Ensure this path is correct
import tweetData from './Twitter_Data_Enhanced.json'; // Adjust the path as needed
import { useCountries } from './Countries';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

const SearchBar = ({ setCountries }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedParentCompany, setSelectedParentCompany] = useState(null);
    const [activeMenu, setActiveMenu] = useState('Monopoly');
    const { countries } = useCountries();
    const [companyTweets, setCompanyTweets] = useState({});


    const processTweetData = (data) => {
        const tweetsMap = {};
        data.forEach(tweet => {
            const company = tweet["Parent Organization"];
            if (company) {
                if (!tweetsMap[company]) {
                    tweetsMap[company] = [];
                }
                tweetsMap[company].push({
                    content: tweet["Tweet Content"],
                    sentiment: tweet["Sentiment"]
                });
            }
        });
        return tweetsMap;
    };

    useEffect(() => {
        const processedTweets = processTweetData(tweetData);
        setCompanyTweets(processedTweets);
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value !== '') {
            if (activeMenu === 'Sentiment Analysis') {
                // Search only through the tweet data for sentiment analysis
                const results = Object.keys(companyTweets)
                    .filter(company =>
                        company.toLowerCase().includes(event.target.value.toLowerCase())
                    );
                setSearchResults(results);
            } else {
                // Search through reprocessed data for other scenarios
                const results = Object.keys(reprocessedData)
                    .filter(parentCompany =>
                        parentCompany.toLowerCase().includes(event.target.value.toLowerCase())
                    );
                setSearchResults(results);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleParentCompanyClick = (parentCompany) => {
        setSelectedParentCompany(parentCompany);
        if (activeMenu === 'Monopoly') {
            updateCountries(parentCompany);
        }
        // No need to update countries for Sentiment Analysis
    };


    const updateCountries = (parentCompany) => {
        let updatedCountries = { ...countries };

        // Zero out list before updating
        Object.keys(updatedCountries).forEach((countryCode) => {
            updatedCountries[countryCode] = 0;
        });

        if (reprocessedData.hasOwnProperty(parentCompany)) {
            const childCompanies = reprocessedData[parentCompany];
            Object.keys(childCompanies).forEach((childCompany) => {
                const { Countries: countryCodes, Followers: followerCount } = childCompanies[childCompany];
                countryCodes.forEach((code) => {
                    if (updatedCountries.hasOwnProperty(code)) {
                        updatedCountries[code] += followerCount;
                    }
                });
            });
        }

        setCountries(updatedCountries);
    };

    const pieChartData = {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [{
            label: 'Sentiment Distribution',
            data: [13, 4, 3], // Replace these numbers with dynamic data if needed
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)', // Color for Positive
                'rgba(255, 206, 86, 0.2)',  // Color for Neutral
                'rgba(255, 99, 132, 0.2)'   // Color for Negative
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
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

    const scrollableListStyletweet= {
        marginTop: '20px',
        maxHeight: '400px',
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
        marginTop: '30px',
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
                    {activeMenu === 'Sentiment Analysis' && (
                        <div style={scrollableListStyletweet}>
                            {companyTweets[selectedParentCompany]?.map((tweet, index) => (
                        <div key={index}>
                        <p>{tweet.content}</p>
                            <p>Sentiment: {tweet.sentiment}</p>
                            </div>
                            
                            ))}
                        <div style={{ width: '75%', margin: 'auto' }}>
                            Ovrall Sentiment Analysis
                            <Pie data={pieChartData} />
                        </div>
                        </div>
                    
                    )}
                    {activeMenu === 'Monopoly' && (
                        <ul style={scrollableListStyleSmall}>
                            {Object.entries(reprocessedData[selectedParentCompany]).map(([childCompanyName, data], index) => {
                                const countries = Array.isArray(data.Countries) ? data.Countries.join(', ') : data.Countries;
                                return (
                                    <li key={index} style={childCompanyStyle}>
                                        {childCompanyName} - {countries} - Followers: {data.Followers}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
    
    
};

export default SearchBar;
