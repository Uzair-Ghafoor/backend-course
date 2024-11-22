import axios from 'axios';
import React, { useState } from 'react';

const App = () => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  // const [formData, setFormData] = useState({});

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log current state values before creating FormData
    console.log('Current Content:', content);

    // Create FormData and append image and content
    const formData = new FormData();
    formData.append('imageUrl', image);
    formData.append('content', content);

    // const handleChange = (e) => {
    //   setFormData({ ...formData, [e.target.id]: e.target.value });
    // };

    try {
      const response = await axios.post('/api/v1/post/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
