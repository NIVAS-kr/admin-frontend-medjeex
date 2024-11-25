import React from 'react';
import './RequestBox.css';

const RequestBox = () => {
  return (
    <div className="request-box">
      <div className="request-content">
        <div className="request-details">
          <p className="request-name">Test Name</p>
          <p className="created-by">Created by Jacob Salvi</p>
          <button className="view-button">View Test</button>
          
        </div>
        <button className="approve-button">Approve</button>
      </div>
    </div>
  );
};

export default RequestBox;
