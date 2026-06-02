import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="text-center py-5">
      <h1 className="display-6">404</h1>
      <p>Page not found.</p>
      <Link to="/" className="btn btn-primary">Back to home</Link>
    </main>
  );
}

export default NotFound;
