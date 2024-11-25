import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "./CreateTestSeriesBox.css";
import AddTestForm from "./AddTestForm";

const CreateTestSeriesBox = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    console.log("Button clicked!"); 
    setShowForm(true); 
  };

  return (
    <div className="create-test-series-box">
      <button className="create-test-series-button" onClick={handleButtonClick}>
        <FaPlus className="plus-icon" /> Create New Test Series
      </button>
      {showForm && <AddTestForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default CreateTestSeriesBox;
