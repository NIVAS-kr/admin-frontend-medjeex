import React, { useState } from "react";
import "./QuestionModal.css"; 

const QuestionModal = ({ isOpen, onClose, onSave }) => {
  const [subject, setSubject] = useState("Physics");
  const [questionFormat, setQuestionFormat] = useState("text"); 
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("single-correct");
  const [options, setOptions] = useState([
    { value: "", format: "text" },
    { value: "", format: "text" },
    { value: "", format: "text" },
    { value: "", format: "text" }, 
  ]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [marks, setMarks] = useState(0);
  const [negativeMarks, setNegativeMarks] = useState("");
  
  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

 

  const handleSave = async () => {
    const testPaperId= JSON.parse(localStorage.getItem("testPaperId"))
    const newQuestion = {
      testPaperId,
      questionType,
      subject,
      questionFormat,
      question,
      options,
      correctAnswer,
      marks,
      negativeMarks,
      
    };

    try {
      
      const response = await fetch("http://localhost:3000/api/v1/add-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
        credentials: "include",
      });
       console.log(response);
      if (response.ok) {
        alert("Question saved successfully");
        onSave(newQuestion);  
        onClose();  
      } else {
        alert("Failed to save question");
      }
    } catch (error) {
      
      console.error("Error saving question:", error);
      alert("An error occurred while saving the question.");
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <span className="close-icon" onClick={onClose}>
            &#10005;
          </span>
          <h2>Add New Question</h2>

          
          <div className="form-group">
            <label>Subject</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Zoology">Zoology</option>
              <option value="Botany">Botany</option>
              <option value="Mathematics">Mathematics</option>
            </select>
          </div>
          <div className="form-group">
  <label>Question Type</label>
  <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
    <option value="single-correct">Single Correct</option>
    <option value="integer">Integer</option>
    <option value="multi-correct">Multi-Correct</option>
  </select>
</div>


          <div className="form-group">
            <label>Question Format</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="questionFormat"
                  value="text"
                  checked={questionFormat === "text"}
                  onChange={() => setQuestionFormat("text")}
                />
                Text
              </label>
              <label>
                <input
                  type="radio"
                  name="questionFormat"
                  value="image"
                  checked={questionFormat === "image"}
                  onChange={() => setQuestionFormat("image")}
                />
                Image
              </label>
            </div>
          </div>

         
          {questionFormat === "text" ? (
            <div className="form-group">
              <label>Question</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter question"
              />
            </div>
          ) : (
            <>
              <div className="form-group">
                <label>Image URL </label>
                <input
                  type="text"
                  placeholder="Enter Image URL"
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
             
            </>
          )}

       
          <div className="form-group">
            <label>Options</label>
            {options.map((option, index) => (
              <div key={index} className="option-group">
                <input
                  type="text"
                  value={option.value}
                  onChange={(e) => handleOptionChange(index, "value", e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
                <select
                  value={option.format}
                  onChange={(e) => handleOptionChange(index, "format", e.target.value)}
                >
                  <option value="text">Text</option>
                  <option value="imageurl">Image URL</option>
                </select>
              </div>
            ))}
          </div>

         
          <div className="form-group">
            <label>Correct Answer</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="correctAnswer"
                  value="A"
                  checked={correctAnswer === "A"}
                  onChange={() => setCorrectAnswer("A")}
                />
                A
              </label>
              <label>
                <input
                  type="radio"
                  name="correctAnswer"
                  value="B"
                  checked={correctAnswer === "B"}
                  onChange={() => setCorrectAnswer("B")}
                />
                B
              </label>
              <label>
                <input
                  type="radio"
                  name="correctAnswer"
                  value="C"
                  checked={correctAnswer === "C"}
                  onChange={() => setCorrectAnswer("C")}
                />
                C
              </label>
              <label>
                <input
                  type="radio"
                  name="correctAnswer"
                  value="D"
                  checked={correctAnswer === "D"}
                  onChange={() => setCorrectAnswer("D")}
                />
                D
              </label>
            </div>
          </div>

       
          <div className="form-group">
            <label>Marks</label>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              placeholder="Enter marks"
            />
          </div>
          <div className="form-group">
            <label>Negative Marks</label>
            <input
              type="number"
              value={negativeMarks}
              onChange={(e) => setNegativeMarks(e.target.value)}
              placeholder="Enter negative marks"
            />
          </div>


          <div className="modal-actions">
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default QuestionModal;




