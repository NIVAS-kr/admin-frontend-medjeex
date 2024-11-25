import React, { useRef, useEffect, useState } from "react";
import axios from "axios"; 
import "./AddTestForm.css";

const AddTestForm = ({ onClose }) => {
  const modalRef = useRef();
  const [formData, setFormData] = useState({
    title: "",
    description: [],
    features: [],
    testSeriesType: "All-India",
    imageUrls: "",
    tags: [], 
    totalTest: "",
    stream: "select stream",
    standard: "select standard",
    price: "",
    discountedPrice: "",
  });

  const [descriptionInput, setDescriptionInput] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");
  const subjectOptions = {
    jee: ["Mathematics", "Physics", "Chemistry"],
    neet: ["Zoology", "Botany", "Chemistry", "Physics"],
    foundation: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Botany",
      "Zoology",
      "Science",
    ],
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose && onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayAdd = (field, input, setInput) => {
    if (input.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], input],
      }));
      setInput("");
    }
  };

  const handleArrayRemove = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    console.log("Save button clicked");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/create-test-series",
        formData,
        
        {
          withCredentials: true,
        }
      );

      console.log("API Response:", response.data);

      if (response.status === 201) {
        console.log("Test series saved successfully:", response.data);
        alert("Test series saved successfully!");
        onClose && onClose();
      } else {
        console.error("Error saving test series:", response.data.message);
        alert("Error saving test series: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving the test series.");
    }
  };

  const handleSubjectChange = (e) => {
    const selectedSubjects = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, tags: selectedSubjects });
  };

  return (
    <div className="form-modal" onClick={(e) => e.stopPropagation()}>
      <div className="form-container" ref={modalRef}>
        <h2> Form</h2>

        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter test title"
        />

        <label>Description:</label>
        <div className="array-input">
          <input
            type="text"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            placeholder="Add description"
          />
          <button
            type="button"
            onClick={() =>
              handleArrayAdd(
                "description",
                descriptionInput,
                setDescriptionInput
              )
            }
          >
            Add Test Form
          </button>
        </div>
        <div className="array-list">
          {formData.description.map((desc, index) => (
            <div key={index} className="array-item">
              {desc}{" "}
              <span
                className="remove-icon"
                onClick={() => handleArrayRemove("description", index)}
              >
                ✖
              </span>
            </div>
          ))}
        </div>
      
        <label>Features:</label>
        <div className="array-input">
          <input
            type="text"
            value={featuresInput}
            onChange={(e) => setFeaturesInput(e.target.value)}
            placeholder="Add feature"
          />
          <button
            type="button"
            onClick={() =>
              handleArrayAdd("features", featuresInput, setFeaturesInput)
            }
          >
            Add
          </button>
        </div>
        <div className="array-list">
          {formData.features.map((feature, index) => (
            <div key={index} className="array-item">
              {feature}{" "}
              <span
                className="remove-icon"
                onClick={() => handleArrayRemove("features", index)}
              >
                ✖
              </span>
            </div>
          ))}
        </div>

   
        <label>Test Series Type:</label>
        <select
          name="testSeriesType"
          value={formData.testSeriesType}
          onChange={handleInputChange}
        >
          <option value="All-India">All-India</option>
          <option value="Mock-Test-Series">Mock-Test-Series</option>
        </select>

        <label>Thumbnail (Image URL):</label>
        <input
          type="text"
          name="imageUrls"
          value={formData.imageUrls}
          onChange={handleInputChange}
          placeholder="Enter thumbnail URL"
        />

        <div className="row-inputs">
          <div>
            <label>Stream:</label>
            <select
              name="stream"
              value={formData.stream}
              onChange={handleInputChange}
            >
              <option value="select Stream">select stream</option>
              <option value="jee">JEE</option>
              <option value="neet">NEET</option>
              <option value="foundation">Foundation</option>
            </select>
          </div>
          <div>
            <label>Standard:</label>
            <select
              name="standard"
              value={formData.standard}
              onChange={handleInputChange}
            >
              <option value="select Standard">select Standard</option>
              <option value="8th">8th</option>
              <option value="9th">9th</option>
              <option value="10th">10th</option>
              <option value="11th">11th</option>
              <option value="12th">12th</option>
              <option value="dropper">Dropper</option>
            </select>
          </div>
          <div>
            <label>Subject:</label>
            <div className="checkbox-group">
              {[
                "Mathematics",
                "Physics",
                "Chemistry",
                "Botany",
                "Science",
                "Zoology",
              ].map((subject) => (
                <div key={subject} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={subject}
                    value={subject}
                    checked={formData.tags.includes(subject)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData((prev) => ({
                          ...prev,
                          tags: [...prev.tags, subject],
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          tags: prev.tags.filter((tag) => tag !== subject),
                        }));
                      }
                    }}
                  />
                  <label htmlFor={subject}>{subject}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total Test */}
        <div className="full-width-input">
          <label>Total Test:</label>
          <input
            type="number"
            name="totalTest"
            value={formData.totalTest}
            onChange={handleInputChange}
            placeholder="Enter total test"
          />
        </div>

        
        <div className="row-inputs">
          <div>
            <label>Price:</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
            />
          </div>
          <div>
            <label>Discounted Price:</label>
            <input
              type="text"
              name="discountedPrice"
              value={formData.discountedPrice}
              onChange={handleInputChange}
              placeholder="Enter discounted price"
            />
          </div>
        </div>

      
        <div className="form-buttons">
          <button
            className="cancel-button"
            onClick={() => onClose && onClose()}
          >
            Cancel
          </button>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTestForm;
