import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";

const ProjectRoutes = () => {
    // const { token, isLoggedIn } = useSelector((state) => state.authToken);
  
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default ProjectRoutes;