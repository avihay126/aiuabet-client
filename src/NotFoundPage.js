import React from "react";
import { useNavigate } from "react-router-dom";


function NotFoundPage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">404 - Page Not Found</h1>
                <p className="not-found-description">Sorry, the page you are looking for does not exist.</p>
                <button className="not-found-button" onClick={handleClick}>Go to Homepage</button>
            </div>
        </div>
    );
}

export default NotFoundPage;
