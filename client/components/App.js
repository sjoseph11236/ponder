import React, { Component } from 'react';
import Combo from './Combo';
import { Route } from 'react-router-dom';
import Feed from './Feed';
import Nabvbar from './Navbar';

class App extends Component { 
  render() {
    return(
      
    <section className="section">
      <Nabvbar />
      <div className="hero is-warning">
        <div className="hero-body">
          <div className="container">
            <h1 className="title has-text-centered is-1">
                Ponder
            </h1>
          </div>
        </div>
      </div>
      {/* routes */}
      <Route exact path='/' component={Combo} />
      <Route exact path='/feed' component={Feed} />
    </section>
    )
  }
}

export default App;