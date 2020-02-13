import React from 'react';

const Image = ({ medium }) => {
  return ( 
    <div className="tile is-parent">
      <article className="tile is-child notification is-info">
        <p className="title">{medium.title}</p>
        <figure className="image is-4by3">
          <img src={medium.imageUrl}/>
        </figure>
      </article>
    </div>
  );
}

export default Image;