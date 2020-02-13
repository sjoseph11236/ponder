import React, { Component } from 'react';
import Combo from './Combo';
import { Route } from 'react-router-dom';

class App extends Component { 
  render() {
    return(
    <section className="section">
      <div className="hero is-warning">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">
                Ponder
            </h1>
          </div>
        </div>
      </div>
      <Route path='/combo' component={Combo} />
    </section>
    )
  }
}

export default App;