import React, { useState, useEffect } from "react";
import "./TestSeriesModal.css";

const TestSeriesModal = ({
  isOpen,
  onClose,
  initialTestPaper,
  onSave,
  testSeriesId,
}) => {
  const [testPaper, setTestPaper] = useState(initialTestPaper || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialTestPaper?.testStartTime) {
      const testStartDate = new Date(initialTestPaper.testStartTime);
      const testEndDate = new Date(initialTestPaper.testEndTime);

      // Check if the dates are valid
      if (isNaN(testStartDate.getTime()) || isNaN(testEndDate.getTime())) {
        setError("Invalid start or end time.");
        return;
      }

      // Convert to IST (Asia/Kolkata time zone)
      const testStartTimeIST = new Date(
        testStartDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      );
      const testEndTimeIST = new Date(
        testEndDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      );

      // Format the time in yyyy-MM-ddTHH:mm format for datetime-local input
      const formatDate = (date) => {
        if (isNaN(date.getTime())) return ""; // Return empty string for invalid dates
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const hh = String(date.getHours()).padStart(2, "0");
        const min = String(date.getMinutes()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
      };

      setTestPaper({
        ...initialTestPaper,
        testStartTime: formatDate(testStartTimeIST),
        testEndTime: formatDate(testEndTimeIST),
      });
    }
  }, [initialTestPaper]);

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setTestPaper((prev) => ({ ...prev, [id]: value }));
  };

  // Handle boolean inputs (checkbox)
  const handleBooleanChange = (e) => {
    const { id, checked } = e.target;
    setTestPaper((prev) => ({ ...prev, [id]: checked }));
  };

  // Handle adding a subject
  const handleAddSubject = (subject) => {
    setTestPaper((prev) => ({
      ...prev,
      subjectsCovered: [...(prev.subjectsCovered || []), subject],
    }));
  };

  // Handle removing a subject
  const handleRemoveSubject = (subject) => {
    setTestPaper((prev) => ({
      ...prev,
      subjectsCovered: prev.subjectsCovered.filter((s) => s !== subject),
    }));
  };

  const handleSave = async () => {
    try {
      // Convert to Date objects
      const testStartDate = new Date(testPaper.testStartTime);
      const testEndDate = new Date(testPaper.testEndTime);

      // Check if the dates are valid
      if (isNaN(testStartDate.getTime()) || isNaN(testEndDate.getTime())) {
        setError("Invalid start or end time.");
        return;
      }

      // Ensure the Test Series ID is valid
      if (!testSeriesId) {
        setError("Test Series ID is required.");
        return;
      }

      setLoading(true);
      setError("");

      // Make the API call to save the test paper
      const response = await fetch(
        "http://localhost:3000/api/v1/create-test-paper",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...testPaper,
            testSeriesId,
            testStartTime: testStartDate.toISOString(), // Send in ISO format (local to IST)
            testEndTime: testEndDate.toISOString(), // Send in ISO format (local to IST)
          }),
          credentials: "include",
        },

       
      );

      if (!response.ok)
        throw new Error("Failed to save test paper. Please try again.");

      const savedTestPaper = await response.json();
      onSave(savedTestPaper);
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>{testPaper?.testName || "Test Paper Details"}</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="modal-form">
          <div className="form-group">
            <label htmlFor="testName">Test Name</label>
            <input
              type="text"
              id="testName"
              placeholder="Enter test name"
              value={testPaper.testName || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="testDuration"></label>
            <input
              type="number"
              id="testDuration"
              placeholder="Enter duration in minutes"
              value={testPaper.testDuration || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="testStartTime">Start Time</label>
            <input
              type="datetime-local"
              id="testStartTime"
              value={testPaper?.testStartTime || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="testEndTime">End Time</label>
            <input
              type="datetime-local"
              id="testEndTime"
              value={testPaper?.testEndTime || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="totalQuestions">Total Questions</label>
            <input
              type="number"
              id="totalQuestions"
              placeholder="Enter total questions"
              value={testPaper.totalQuestions || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subjectsCovered">Subjects Covered</label>
            <div className="subjects-input">
              <div className="subject-checkboxes">
                {[
                  "Physics",
                  "Chemistry",
                  "Mathematics",
                  "Botany",
                  "Science",
                  "Zoology",
                ]
                  .filter(
                    (subject) => !testPaper.subjectsCovered?.includes(subject) // Exclude already selected subjects
                  )
                  .map((subject) => (
                    <div key={subject} className="checkbox-item">
                      <label>
                        <input
                          type="checkbox"
                          value={subject}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Add or remove the subject based on checkbox selection
                            if (e.target.checked) {
                              handleAddSubject(value);
                            } else {
                              handleRemoveSubject(value);
                            }
                          }}
                          checked={testPaper.subjectsCovered?.includes(subject)} // Preselect already chosen subjects
                        />
                        {subject}
                      </label>
                    </div>
                  ))}
              </div>

              <div className="selected-subjects">
                {testPaper.subjectsCovered?.map((subject) => (
                  <div key={subject} className="subject-item">
                    {subject}
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => handleRemoveSubject(subject)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="testDescription">Description</label>
            <textarea
              id="testDescription"
              placeholder="Enter description"
              value={testPaper.testDescription || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="negativeMarking">Negative Marking</label>
            <input
              type="checkbox"
              id="negativeMarking"
              checked={!!testPaper.negativeMarking}
              onChange={handleBooleanChange}
            />
            <span>{testPaper.negativeMarking ? "Yes" : "No"}</span>
          </div>

          <div className="form-group">
            <label htmlFor="totalAttempts">Total Attempts</label>
            <input
              type="number"
              id="totalAttempts"
              placeholder="Enter total attempts"
              value={testPaper.totalAttempts || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="save-button"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestSeriesModal;
