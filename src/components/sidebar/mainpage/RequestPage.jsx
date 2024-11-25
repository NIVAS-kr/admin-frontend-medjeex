import React, { useState } from "react";
import './RequestPage.css';
import RequestBox from './RequestBox'; 
import TestSeriesBox from './TestSeriesBox';
import CreateTestSeriesBox from './CreateTestSeriesBox';

const RequestPage = () => {
  const [showAllTestSeries, setShowAllTestSeries] = useState(false);

  
  const handleSeeAllClick = () => {
    setShowAllTestSeries((prevState) => !prevState); 
  };

  return (
    <div className="request-page">
      <div className="request-section">
        <h2 className="request-title">Requests</h2>
        <button className="see-all-button">See All</button>
      </div>

      <RequestBox />
      
      <div className="request-section">
        <h2 className="request-title">Test Series</h2>
        <button className="see-all-button" onClick={handleSeeAllClick}>
          {showAllTestSeries ? "Hide All" : "See All"} 
        </button>
      </div>

     
      <TestSeriesBox showAll={showAllTestSeries} />
      <CreateTestSeriesBox />
    </div>
  );
};

export default RequestPage;
