import React from 'react';

const Video = ({ medium }) => {
  return ( 
    <div className="tile is-parent">
    <article className="tile is-child notification">
      <iframe width="560" height="315" src={medium.url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </article>
  </div>
  );
}

export default Video;