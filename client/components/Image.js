import React from 'react';

const Image = ({ medium, selectInformation }) => {
  return ( 
    <div className="tile is-parent" onClick={()=> selectInformation({title: medium.title, description: medium.description}) }>
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