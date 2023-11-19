import React from 'react'

const CompanyButton = ({ companyName, onClick }) => {
    return (
      <button onClick={onClick}>
        {companyName}
      </button>
    );
  };

function button() {
  return (
    <div>button</div>
  )
}

const CompanyButtonList = () => {
    // Sample list of companies
    const companies = ["Company1", "Company2", "Company3", "Company4", "Company5", "Company6", "Company7", "Company8", "Company9", "Company10"];
  
    // Handle button click
    const handleButtonClick = (companyName) => {
      // Add your logic here for what happens when a button is clicked
      console.log(`Button for ${companyName} clicked`);
    };
  
    return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
        <h2 style={{ gridColumn: 'span 5' }}>Company Buttons</h2>
        {companies.map((company, index) => (
          <CompanyButton key={index} companyName={company} onClick={() => handleButtonClick(company)} />
        ))}
      </div>
    );
  };
  
  export default CompanyButtonList;