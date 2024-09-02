import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>404 - Page Not Found</h1>
            <p>We're sorry, but the page you were looking for doesn't exist.</p>
            <Link to="/">Go Home</Link>
        </div>
    );
};

export default NotFound;
