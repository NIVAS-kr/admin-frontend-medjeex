import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TestSeriesModal from "./TestSeriesModal";
import "./TestSeriesDetailPage.css";

const TestSeriesDetailPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [testPapers, setTestPapers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTestPapers = async () => {
      try {
        const newstore = JSON.parse(localStorage.getItem("testSeriesId"));

        console.log(localStorage.getItem("testSeriesId"));
        const response = await axios.post(
          "http://localhost:3000/api/v1/all-test-papers",
          { testSeriesId: newstore },
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setTestPapers(response.data.allTestPapers);
        }
      } catch (error) {
        console.error("Error fetching test papers:", error);
      }
    };

    fetchTestPapers();
  }, []);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleViewTest = (testId) => {
    console.log(testId);
   
    localStorage.setItem("testPaperId", JSON.stringify(testId));
    

    
    navigate(`/create-question/${testId}`);
  };


  return (
    <div className="test-series-detail-page">
      {testPapers.length > 0 && (
        <div className="test-paper-container">
          {testPapers.map((testPaper) => (
            <div key={testPaper.testSeriesId} className="test-paper-card">
              <div className="test-paper-info">
                <div className="test-name">{testPaper.testName}</div>
                <button
                  className="view-test-button"
                  
                >
                  View Test
                </button>
              </div>
              <div className="approve-container">
                <button className="approve-button"
                onClick={() => handleViewTest(testPaper.testPaperId)}>
                  {testPaper.approved ? "Approved" : "Open"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="create-test-button-container">
        <button
          className="create-test-series-button"
          onClick={handleButtonClick}
        >
          <FaPlus className="plus-icon" /> Create New Test
        </button>
      </div>

      <TestSeriesModal
        isOpen={showModal}
        onClose={handleCloseModal}
        initialTestPaper={{}}
        testSeriesId={JSON.parse(localStorage.getItem("testSeriesId"))}
      
        onSave={(savedTestPaper) => {
          console.log("Test paper saved:", savedTestPaper);
          setShowModal(false);
          setTestPapers((prevTestPapers) => [
            ...prevTestPapers,
            savedTestPaper,
          ]); 
        }}
      />
    </div>
  );
};

export default TestSeriesDetailPage;
