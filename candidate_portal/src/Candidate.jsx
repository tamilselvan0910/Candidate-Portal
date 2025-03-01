import React, { useState } from "react";
import "./Candidate.css"; // Importing the CSS file for better styling

const Candidate = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // File Type Validation
    const allowedTypes = ["application/pdf", "application/msword"];
    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      setMessage("⚠️ Only PDF and DOC files are allowed!");
      return;
    }

    // File Size Limit (5MB)
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setMessage("⚠️ File size must be under 5MB!");
      return;
    }

    setFile(selectedFile);
    setMessage(""); // Clear previous messages
  };

  const handleData = async () => {
    if (!name.trim() || !file) {
      setMessage("⚠️ Please enter your name and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    setUploading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("✅ File uploaded successfully!");
        setName(""); // Clear input field
        setFile(null); // Reset file selection
      } else {
        setMessage("❌ Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      setMessage("⚠️ An error occurred. Please check your connection.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="candidate-container">
      <h2>Candidate File Upload</h2>

      <div className="form-group">
        <label className="input-label">Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label className="input-label">Upload Resume (PDF/DOC):</label>
        <input type="file" onChange={handleFileChange} className="file-input" />
      </div>

      {file && <p className="file-info">📄 Selected file: {file.name}</p>}

      {uploading ? (
        <button className="upload-button" disabled>
          Uploading...
        </button>
      ) : (
        <button onClick={handleData} className="upload-button">
          Upload
        </button>
      )}

      {message && <p className="upload-message">{message}</p>}
    </div>
  );
};

export default Candidate;
