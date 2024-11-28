import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { axiosInstance } from '../utils/axios';

// const url = 'https://www.course-api.com/react-tours-project';

const Query = () => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['tours', userId],
    queryFn: async () => {
      const data = await axiosInstance.get('/react-tours-project');
      return data.data;
    },
    staleTime: 5000,
    // enabled:!!data
    retry: 3,
  });
  if (isLoading) {
    return <div>loading.....</div>;
  }

  if (isError) {
    return <p>{error.response.data.msg}</p>;
  }

  return <div>Query</div>;
};

export default Query;
