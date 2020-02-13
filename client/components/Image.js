import React from 'react';

const Image = () => {
  return ( 
    <div className="tile is-parent">
      <article className="tile is-child notification is-info">
        <p className="title">Middle tile</p>
        <p className="subtitle">With an image</p>
        <figure className="image is-4by3">
          <img src="https://bulma.io/images/placeholders/640x480.png"/>
        </figure>
      </article>
    </div>
  );
}

export default Image;