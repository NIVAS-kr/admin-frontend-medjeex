import React, { useEffect, useState } from "react";
import axios from "axios";

const TestSeriesDetails = ({ match }) => {
  const { testSeriesId } = match.params; 
  const [testSeries, setTestSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestSeriesDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/test-series/${testSeriesId}`,{
          withCredentials: true,
        });
        if (response.data.success) {
          setTestSeries(response.data.testSeries);
        } else {
          setError("Failed to fetch test series details.");
        }
      } catch (err) {
        console.error("Error fetching test series details:", err);
        setError("An error occurred while fetching the test series details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestSeriesDetails();
  }, [testSeriesId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{testSeries.title}</h1>
      <p>Created by: {testSeries.createdBy}</p>
      <p>Total Tests: {testSeries.totalTest}</p>
      
    </div>
  );
};

export default TestSeriesDetails;
