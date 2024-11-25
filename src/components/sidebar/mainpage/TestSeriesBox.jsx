import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TestSeriesBox.css";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom"; 
import TestSeriesModal from "./TestSeriesModal";

const TestSeriesBox = ({ showAll }) => {
  const [testSeriesList, setTestSeriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestSeries, setSelectedTestSeries] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchTestSeries = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
  
        const response = await axios.get("http://localhost:3000/api/v1/all-test-series", 
          {
            withCredentials: true,
          }
        );
  
        if (response.data.success) {
          setTestSeriesList(response.data.allTestSeries);
          localStorage.setItem("test-series", JSON.stringify(response.data.allTestSeries));
        } else {
          setError("Failed to fetch test series.");
        }
      } catch (err) {
        console.error("Error fetching test series:", err);
        setError("An error occurred while fetching the test series.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchTestSeries();
  }, []);
  

  if (loading) return <p>Loading test series...</p>;
  if (error) return <p>{error}</p>;

  const visibleTestSeries = showAll ? testSeriesList : testSeriesList.slice(0, 1);

  const handleOpenModal = (testSeries) => {
    setSelectedTestSeries(testSeries);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTestSeries(null);
  };

  const handleOpenDetailPage = (testSeriesId) => {
    localStorage.setItem("testSeriesId",JSON.stringify(testSeriesId))
   
    navigate(`/test-series/${testSeriesId}`);
  };

  return (
    <div className="test-series-container">
      {visibleTestSeries.map((testSeries, index) => (
        <div className="test-series-box1" key={index}>
          <div className="test-series-content">
            <div className="test-image">
              {testSeries.imageUrls && testSeries.imageUrls[0] && (
                <img
                  src={testSeries.imageUrls[0]}
                  alt="Test Series"
                  className="test-series-image"
                />
              )}
            </div>
            <div className="test-details">
              <p className="test-name">{testSeries.title || "Untitled Test"}</p>
              <p className="created-by-test">Created by {testSeries.createdBy || "Unknown"}</p>
              <p className="total-tests">Total Tests: {testSeries.totalTest || 0}</p>
              <button 
                className="open-button-test" 
                onClick={() => handleOpenDetailPage(testSeries.testSeriesId)} 
              >
                Open
              </button>
              <div className="actions">
                <div className="action-icons">
                  <button className="edit-icon"><LuPencilLine /></button>
                  <button className="delete-icon"><RiDeleteBinLine /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <TestSeriesModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        testSeries={selectedTestSeries}
      />
    </div>
  );
};

export default TestSeriesBox;
