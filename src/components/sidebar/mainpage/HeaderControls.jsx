import React from 'react';
import './HeaderControls.css'; 
import { LuBellDot } from "react-icons/lu";

const HeaderControls = () => {
  return (
    <div className="header-controls">
      
      <div className="button-group">
        <button className="control-button ">Edited</button>
        <button className="control-button ">Approved</button>
        <button className="control-button ">Deleted</button>
      </div>
<div className="notification-icon">
      <LuBellDot />
      </div>
    </div>
  );
};

export default HeaderControls;
