import axios from 'axios';
import React, { useState } from 'react';

const App = () => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log('File selected:', file); // Log selected file to ensure it's being set
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if image is selected
    if (!image) {
      console.log('No image selected');
      return;
    }

    // Check if content is entered
    if (!content) {
      console.log('No content entered');
      return;
    }

    // Log current state values before creating FormData
    console.log('Current Image:', image);
    console.log('Current Content:', content);

    // Create FormData and append image and content
    const formData = new FormData();
    formData.append('imageUrl', image);
    formData.append('content', content);

    // Log the FormData content
    console.log('FormData Entries:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]); // Log each entry in FormData
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/post/create',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <form onSubmit={handleSubmit}>
        <input onChange={handleImageUpload} type='file' accept='image/*' />
        <input
          type='text'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Enter some content'
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default App;
