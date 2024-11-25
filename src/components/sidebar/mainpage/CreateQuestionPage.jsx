import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import QuestionModal from "./QuestionModal"; 
import "./CreateQuestionPage.css"; 
import QuestionListPage from "../../questionlist/QuestionListPage";

const CreateQuestionPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const handleSaveQuestion = (newQuestion) => {
    console.log("New Question Saved:", newQuestion);

  };

  return (
    <div className="create-question-button-container">
    <QuestionListPage/>
      <button className="create-question-button" onClick={handleButtonClick}>
        <FaPlus className="plus-icon" /> Add New Question
      </button>

      
      <QuestionModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveQuestion}
      />
    </div>
  );
};

export default CreateQuestionPage;
