import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingPage = () => {
  const navigate = useNavigate()
    
    useEffect(() => {
        if (!localStorage.getItem('token')){
            navigate('/login')
        }
    })
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#F13A2E] mb-4"></div>
        <p className="text-[#F13A2E] font-medium text-xl">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
