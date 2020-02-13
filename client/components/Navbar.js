import React from 'react';
import {Link } from 'react-router-dom';

const Navbar = () => {
  return ( 
    <nav className="level">
      <div className="level-left">
        <div className="level-item">
          <div className="field has-addons">
            <p className="control">
              <input className="input" type="text" placeholder="Create a new combo" />
            </p>
            <p className="control">
              <button className="button">
                Search
              </button>
            </p>
          </div>
        </div>
      </div>
        
      {/*Right Side  */}
      <div className="level-right">
        <p className="level-item">
          <Link to="/">
            <strong>Home</strong>
          </Link>
        </p>
        <p className="level-item">
          <Link to="/feed">Feed</Link>
        </p>
      </div>
    </nav>
  );
}

export default Navbar;