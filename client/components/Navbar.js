import React from 'react';

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
        <p className="level-item"><strong>Home</strong></p>
        <p className="level-item"><a>Feed</a></p>
        <p className="level-item"><a className="button is-success">New</a></p>
      </div>
    </nav>
  );
}

export default Navbar;