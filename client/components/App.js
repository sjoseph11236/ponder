import React, { Component } from 'react';
import Combo from './Combo';
import { Route } from 'react-router-dom';

class App extends Component { 
  render() {
    return(
    <section className="section">
      <div className="hero is-warning">
        <div class="hero-body">
          <div class="container">
            <h1 class="title is-1">
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