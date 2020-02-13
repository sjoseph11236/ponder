import React from 'react'

const AnnotationCard = ({ annotation }) => {
  return ( 
    <div className="tile is-parent">
      <article className="tile is-child notification is-danger">
        <p className="title">{`Annotation ${annotation.id}`}</p>
        <div className="content">{annotation.info.slice(0,80)}</div>
      </article>
    </div>
  );
}

export default AnnotationCard;