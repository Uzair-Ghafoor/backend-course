import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://www.course-api.com/',
  // withCredentials: true,
});
