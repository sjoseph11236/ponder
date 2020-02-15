import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAnnotationsThunk, getComboAnnotationsThunk } from '../store/reducers/annotations';
import Image from './Image';
import AnnotationCard from './AnnotationCard';
import { getMediaThunk } from '../store/reducers/media';
import FullView from './FullView';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }



  render() { 
    const { information, selectInformation } = this.props;
    return (  
      <div className="section"> 
        <div className="container">
          <h1 className='title is-1'> Feed</h1>
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-8">
              <div className="tile">
                {this.props.combo.combo && this.props.combo.combo.map(medium => {
                  return <Image key={medium.id} medium={medium}  selectInformation={selectInformation }/> 
                })}
              </div>
            {this.props.annotations && this.props.annotations.map(annotation => {
              return <AnnotationCard key={annotation.id} annotation={annotation} selectInformation={selectInformation}/>
            })}
            </div>
            <div className="tile is-parent">
              { information.id || information.title ? <FullView information={information} /> : null } 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    annotations : state.annotationsReducer.annotations,
    combo: state.mediaReducer.combo
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    getAnnotationsThunk: () => dispatch(getAnnotationsThunk()),
    getComboAnnotationsThunk: comboId => dispatch(getComboAnnotationsThunk(comboId)),
    getMediaThunk: ()=> dispatch(getMediaThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);