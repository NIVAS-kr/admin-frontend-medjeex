import React, { createContext, useState, useContext } from 'react';


const TestSeriesContext = createContext();


export const TestSeriesProvider = ({ children }) => {
  const [testSeriesId, setTestSeriesId] = useState(null);

  return (
    <TestSeriesContext.Provider value={{ testSeriesId, setTestSeriesId }}>
      {children}
    </TestSeriesContext.Provider>
  );
};


export const useTestSeries = () => {
  return useContext(TestSeriesContext);
};
