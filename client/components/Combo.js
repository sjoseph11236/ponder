import React from 'react';
import Video from './Video';
import { connect } from 'react-redux';
import { getMediaThunk } from '../store/reducers/media';

class Combo extends React.Component{
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getMediaThunk();
  }

  render() {
    return ( 
      <div className='container'>
        <div className="tile is-parent ">
          {this.props.media.media.map( medium => {
            return <Video key={medium.id} medium={medium} />
          })}
        </div>
        <h5 className="title is-5">Next Combo</h5>
        <div className="control">
          <textarea className="textarea is-large" placeholder="Large textarea"></textarea>
        </div>
        <div className="field is-grouped">
          <div className="control is-rght">
            <button className="button is-link">Submit</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    media: state.mediaReducer
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    getMediaThunk: () => dispatch(getMediaThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Combo);