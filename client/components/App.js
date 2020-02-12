import React, { Component } from 'react';
import Video from './video';

class App extends Component { 
  render() {
    return(
    <section className="section">
      <div className="tile is-parent ">
          <Video />
          <Video />
      </div>
      <div className="control">
        <textarea className="textarea is-large" placeholder="Large textarea"></textarea>
      </div>
    </section>
    )
  }
}

export default App;