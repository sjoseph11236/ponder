import React from 'react';
import {Link } from 'react-router-dom';

const Navbar = ({ handleChange, handleSubmit, word, error }) => {
  return ( 
    <nav className="level">
      <div className="level-left">
        <div className="level-item">
          <div className="field has-addons">
            <p className="control">
              <input className="input" name='word' type="text" placeholder="Create a new combo" onChange={handleChange} value={word}/>
            </p>
            <p className="control">
              <button className="button" onClick={(e)=> handleSubmit(e)} disabled={ word ? false : true }>
                Search
              </button>
            </p>
          </div>
        </div>
        <p>{error ? <strong>try different word </strong> : '' }</p>
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