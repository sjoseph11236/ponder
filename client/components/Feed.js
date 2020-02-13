import React, { Component } from 'react';
import Image from './Image';
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  
  render() { 
    return (  
      <div className="section"> 
        <div className="container">
          <h1 className='title is-1'> Feed</h1>
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-8">
              <div className="tile">
                <Image />
                <Image />
              </div>
              <div className="tile is-parent">
                <article className="tile is-child notification is-danger">
                  <p className="title">Wide tile</p>
                  <p className="subtitle">Aligned with the right tile</p>
                  <div className="content">
              
                  </div>
                </article>
              </div>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child notification is-success">
                <div className="content">
                  <p className="title">Tall tile</p>
                  <p className="subtitle">With even more content</p>
                  <div className="content">
                  
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;