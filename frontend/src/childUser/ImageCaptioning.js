import React, { useState, useRef } from 'react';
import '../styles/childUser/ImageCaptioning.css'; // Correct path to CSS file

const ImageCaptioning = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef(null);
  const imageUrlRef = useRef(null);
  const imgPreviewRef = useRef(null);

  const previewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (imgPreviewRef.current) {
          imgPreviewRef.current.src = reader.result;
          setImage(reader.result.split(',')[1]); // Get the base64 string
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imageURL = imageUrlRef.current.value;
    const imageFile = image;

    const response = await fetch('http://localhost:3000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageURL, imageFile }),
    });

    const data = await response.json();
    setCaption(data.caption);
    setImage(data.image);
  };

  return (
    <div id="imagecaptioning" className="container text-center">
      <h1 className="mb-4">See Say Caption</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="imageFile" className="form-label">Upload an Image</label>
          <input
            className="form-control"
            type="file"
            name="imageFile"
            id="imageFile"
            ref={fileInputRef}
            onChange={previewImage}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageURL" className="form-label">Or Enter Image URL</label>
          <input
            className="form-control"
            type="url"
            name="imageURL"
            id="imageURL"
            ref={imageUrlRef}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <button className="btn btn-primary" type="submit">Generate Caption</button>
      </form>

      {caption && (
        <div className="caption-box mt-4">
          <h5>Generated Caption:</h5>
          <p>{caption}</p>
        </div>
      )}

      {image && (
        <div>
          <img src={image} className="img-preview" ref={imgPreviewRef} alt="Uploaded Preview" />
        </div>
      )}
    </div>
  );
};

export default ImageCaptioning;
