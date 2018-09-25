import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
      <div className="text-center text-warning">
        <img className="my-4" src="/static/404.png" alt="404 Error Logo" />
        <h1>
          Page Not Found
        </h1>
        <div>
          <Link className="text-link text-white-50" to='/'>Back to Homepage</Link>
        </div>
      </div>
    );
}

export default PageNotFound;