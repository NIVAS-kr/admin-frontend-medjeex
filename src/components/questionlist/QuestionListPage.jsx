import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./QuestionListPage.css"; 

const QuestionListPage = () => {
  const { testId } = useParams(); 
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/v1/all-questions-by-test-paper`,
          { testPaperId: testId },{
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setQuestions(response.data.allQuestions); // Set the state with the fetched questions
        } else {
          console.error("No questions found");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false); // Mark loading as complete
      }
    };
  
    fetchQuestions();
  },[]); // Dependency array ensures the hook runs when `testId` changes
  

  if (loading) return <p>Loading questions...</p>;
  if (!questions.length) return <p>No questions available for this test.</p>;

  return (
    <div className="question-list-container">
     
      {questions.map((question) => (
        <div key={question._id} className="question-card">
          <div className="question-content">
            <h3 className="question-text">{question.question}</h3>
            <p className="correct-answer">Correct Answer: {question.correctAnswer}</p>
            <button className="view-question-button">View Question</button>
          </div>
          <div className="question-actions">
            <FaEdit className="action-icon edit-icon" title="Edit" />
            <FaTrashAlt className="action-icon delete-icon" title="Delete" />
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default QuestionListPage;
