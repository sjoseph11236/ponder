import React from 'react';
import Video from './Video';
import { connect } from 'react-redux';
import { getComboThunk } from '../store/reducers/media';

class Combo extends React.Component{
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // ADD METHOD: getRandomComboThunk();
  }

  render() {
    const { text, handleChange, handleAnnotationSubmit } = this.props;
    return ( 
      <div className='container'>
        <div className="tile is-parent ">
          {this.props.combo && this.props.combo.map( medium => {
            return <Video key={medium.id} medium={medium} />
          })}
        </div>
        <h5 className="title has-text-centered is-5">Next Combo</h5>
        <div className="control">
          <textarea className="textarea is-large" placeholder="Ponder away..." name='text' type='text' onChange={handleChange}></textarea>
        </div>
        <div className="field is-grouped">
          <div className="control is-rght">
            <button className="button is-link" onClick={(e) => handleAnnotationSubmit(e)}   disabled={ text ? false : true }>Submit</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    combo: state.mediaReducer.combo.combo
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    getComboThunk: (word) => dispatch(getComboThunk(word))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Combo);