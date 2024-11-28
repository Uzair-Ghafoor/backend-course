// import { useMutation } from '@tanstack/react-query';
// import axios from 'axios';
// import React, { useState } from 'react';

// const App = () => {
//   const [image, setImage] = useState(null);
//   const [content, setContent] = useState('');
//   // const [formData, setFormData] = useState({});

//   const { mutate, data } = useMutation({
//     mutationFn: async (formData) => {
//       const data = await axios.post('/api/v1/post/create', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return data;
//     },
//     onSuccess: () => {},
//     onError: {},
//   });
//   console.log(data);
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('imageUrl', image);
//     formData.append('content', content);
//     console.log(formData);
//     mutate(formData);

//     // try {
//     //   const response = await axios.post('/api/v1/post/create', formData, {
//     //     headers: {
//     //       'Content-Type': 'multipart/form-data',
//     //     },
//     //   });
//     //   console.log('Response:', response.data);
//     // } catch (error) {
//     //   console.error('Error:', error);
//     // }
//   };

//   return (
//     <div className='flex items-center justify-center h-screen'>
//       <form onSubmit={handleSubmit}>
//         <input onChange={handleImageUpload} type='file' accept='image/*' />
//         <input
//           type='text'
//           value={content}
//           name='content'
//           onChange={(e) => setContent(e.target.value)}
//           placeholder='Enter some content'
//         />
//         <button type='submit'>Submit</button>
//       </form>
//     </div>
//   );
// };

// export default App;

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth';

import React from 'react';
import axios from 'axios';
import { app } from '../utils/firebase';

const App = () => {
  const handleGoogleAuth = async (e) => {
    e.preventDefault();

    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);
    console.log(result);

    const response = await axios.post('/auth/google', {
      username: user.displayName,
      email: user.email,
      avatar: user.photoURL,
    });
    console.log(response);
  };

  return (
    <div>
      <button onClick={handleGoogleAuth}>click</button>
    </div>
  );
};

export default App;
