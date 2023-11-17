import React from "react";
import "../styles/notFound.scss";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page Not Found</p>

      <button onClick={() => navigate("/")}>Return to Home</button>
    </div>
  );
};

export default NotFound;
