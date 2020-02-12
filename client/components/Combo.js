import React from 'react';
import Video from './video';
const Combo = () => {
  return ( 
    <div className='container'>
      <div className="tile is-parent ">
          <Video />
          <Video />
      </div>
      <h5 className="title is-5">Next Combo</h5>
      <div className="control">
        <textarea className="textarea is-large" placeholder="Large textarea"></textarea>
      </div>
      <div class="field is-grouped">
        <div class="control is-rght">
          <button class="button is-link">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Combo;