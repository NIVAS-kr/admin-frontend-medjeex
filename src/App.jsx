import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import HeaderControls from './components/sidebar/mainpage/HeaderControls';
import RequestPage from './components/sidebar/mainpage/RequestPage';
import TestSeriesBox from './components/sidebar/mainpage/TestSeriesBox';
import TestSeriesDetailPage from './components/sidebar/mainpage/TestSeriesDetailPage';
import CreateQuestionPage from './components/sidebar/mainpage/CreateQuestionPage';
import AdminLogin from './AdminLogin';
import AddUserPage from './components/adduserpage/AddUserPage';
import QuestionListPage from './components/questionlist/QuestionListPage';
import './App.css';

function MainContent() {
  const location = useLocation();

  return (
    <div className="main-content">
  
      {location.pathname !== "/add-user" && <HeaderControls />}
      <Routes>
        <Route path="/" element={<RequestPage />} />
        <Route path="/test-series" element={<TestSeriesBox showAll={true} />} />
        <Route path="/test-series/:id" element={<TestSeriesDetailPage />} />
        <Route path="/create-question/:testId" element={<CreateQuestionPage />} />
        <Route path="/question-list/:testId" element={<QuestionListPage />} />
        <Route path="/add-user" element={<AddUserPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login-page" element={<AdminLogin />} />
          <Route
            path="*"
            element={
              <>
                <Sidebar />
                <MainContent />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
