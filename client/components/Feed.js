import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAnnotationsThunk } from '../store/reducers/annotations';
import Image from './Image';
import AnnotationCard from './AnnotationCard';
import { getMediaThunk } from '../store/reducers/media';
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount() {
    this.props.getAnnotationsThunk();
    this.props.getMediaThunk();
  }
  
  render() { 
    return (  
      <div className="section"> 
        <div className="container">
          <h1 className='title is-1'> Feed</h1>
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-8">
              <div className="tile">
                {this.props.media.map(medium => {
                  return <Image key={medium.id} medium={medium} /> 
                })}
              </div>
            {this.props.annotations.map(annotation => {
              return <AnnotationCard key={annotation.id} annotation={annotation} />
            })}
            </div>
            <div className="tile is-parent">
              <article className="tile is-child notification is-success">
                <div className="content">
                  <p className="title">Annotation 1</p>
                  <div className="content">{this.props.annotations.length ? this.props.annotations[0].info  : '' }</div>
                </div>
              </article>
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
    media: state.mediaReducer.media,
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    getAnnotationsThunk: () => dispatch(getAnnotationsThunk()),
    getMediaThunk: ()=> dispatch(getMediaThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);