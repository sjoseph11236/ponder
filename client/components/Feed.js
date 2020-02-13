import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAnnotationsThunk } from '../store/reducers/annotations';
import Image from './Image';
import AnnotationCard from './AnnotationCard';
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount() {
    this.props.getAnnotationsThunk();
  }
  
  render() { 
    console.log("PROS ", this.props);
    return (  
      <div className="section"> 
        <div className="container">
          <h1 className='title is-1'> Feed</h1>
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-8">
              <div className="tile">
                <Image />
                <Image />
              </div>
            {this.props.annotations.annotations.map(annotation => {
              return <AnnotationCard key={annotation.id} annotation={annotation} />
            })}
            </div>
            <div className="tile is-parent">
              <article className="tile is-child notification is-success">
                <div className="content">
                  <p className="title">Annotation 1</p>
                  <p className="subtitle">With even more content</p>
                  <div className="content">
                  </div>
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
    annotations : state.annotationsReducer
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    getAnnotationsThunk: () => dispatch(getAnnotationsThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);