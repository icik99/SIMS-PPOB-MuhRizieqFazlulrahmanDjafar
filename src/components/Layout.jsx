import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!localStorage.getItem('token')){
            navigate('/login')
        }
    })
  return (
    <div>
      <Navbar />
      <main className="pt-24 pb-10 px-4 sm:px-10 md:px-20 lg:px-40 xl:px-60">
        {children}
      </main>
    </div>

  );
};

export default Layout;
