import React, { useState } from 'react';
import axios from 'axios';

const ImageClassification = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);  // To store the preview image URL

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a URL for the selected file to preview it
    const fileUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(fileUrl);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image to classify.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send POST request to the Flask backend
      const response = await axios.post('http://127.0.0.1:5000/classify_image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Set the response data as the result
      setResult(response.data);
    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };

  return (
    <div>
      <h1>Upload a Traffic Sign Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Classify</button>
      </form>

      {previewUrl && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={previewUrl} alt="Uploaded Traffic Sign" width="300" />
        </div>
      )}

      {result && (
        <div>
          <h2>Prediction:</h2>
          <p>Class: {result.class_name}</p>
          <p>Confidence: {result.probability}%</p>
          <img
            src={`http://127.0.0.1:5000/${result.image_path}`}
            alt="Uploaded Traffic Sign"
            width="300"
          />
        </div>
      )}
    </div>
  );
};

export default ImageClassification;
