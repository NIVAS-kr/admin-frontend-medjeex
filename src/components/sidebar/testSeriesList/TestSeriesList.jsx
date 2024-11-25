import React, { useEffect, useState } from "react";
import axios from "axios";

const TestSeriesList = () => {
  const [testSeries, setTestSeries] = useState([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/getAllTestSeries",{
          withCredentials: true,
        });
        setTestSeries(response.data.allTestSeries);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching test series:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const handleOpen = (id) => {
    console.log(`Open Test Series: ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Edit Test Series: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete Test Series: ${id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="test-series-container">
      {testSeries.map((series) => (
        <div key={series._id} className="test-series-card">
          <img
            src={series.imageUrls}
            alt={series.title}
            className="test-series-image"
          />
          <div className="test-series-content">
            <h2>{series.title}</h2>
            <p>Total Tests: {series.totalTest}</p>
            <div className="test-series-actions">
              <button onClick={() => handleOpen(series._id)} className="btn-open">
                open
              </button>
              <button onClick={() => handleEdit(series._id)} className="btn-edit">
                Edit
              </button>
              <button onClick={() => handleDelete(series._id)} className="btn-delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestSeriesList;
