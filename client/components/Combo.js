import React from 'react';
import Video from './Video';
import { connect } from 'react-redux';
import { postComboThunk } from '../store/reducers/media';

class Combo extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    const { text, handleChange, handleAnnotationSubmit, handleNextCombo } = this.props;
    
    return ( 
      <div className='container'>
        <div className="tile is-parent ">
          {this.props.combo.combo && this.props.combo.combo.map( medium => {
            return <Video key={medium.id} medium={medium} />
          })}
        </div>
        <h5 className="title has-text-centered is-5" onClick={ e => handleNextCombo(e)}>
          <u>
              Next Combo
          </u>
        </h5>
        <div className="control">
          <textarea className="textarea is-large" placeholder="Ponder away..." name='text' type='text' value={text}onChange={handleChange}></textarea>
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
    combo: state.mediaReducer.combo
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    postComboThunk: word => dispatch(postComboThunk(word))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Combo);