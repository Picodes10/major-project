import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">MyApp</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/prediction">Prediction</a></li>
        <li><a href="/result">Result</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
