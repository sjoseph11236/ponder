import React from 'react'

const FullView = ({ information }) => {
  return ( 
    <article className="tile is-child notification ">
    <div className="content">
      <p className="title">{information.id ? `Annotation #${information.id}` : null}</p>
      <div className="content">{information.info ? information.info : null }</div>
      <p className="title">{information.title ? information.title : null }</p>
      <div className="content">{information.description ? information.description : null }</div>
    </div>
  </article>
  );
}

export default FullView;