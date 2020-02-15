import React, { Component } from 'react';
import Combo from './Combo';
import { connect } from 'react-redux';
import { postComboThunk } from '../store/reducers/media';
import { Route, Switch, Link } from 'react-router-dom';
import Feed from './Feed';
import Nabvbar from './Navbar';
import { postComboAnnotationThunk, getComboAnnotationsThunk } from '../store/reducers/annotations';


class App extends Component { 
  constructor(props) {
    super(props)
    this.state = { 
      word: '', 
      text: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAnnotationSubmit = this.handleAnnotationSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.postComboThunk(this.state.word);
    this.setState({
      word: ''
    })
  }

  handleAnnotationSubmit(e) { 
    e.preventDefault();
    const { combo, postComboAnnotationThunk } = this.props
    postComboAnnotationThunk(combo.id, this.state.text);
    this.setState({
      text: ''
    })
  }

  componentDidMount() {
    // this.props.getComboAnnotationsThunk(1);
  }
  
  render() {
    const { text } = this.state;
    return(
    <section className="section">
      <Nabvbar handleChange={this.handleChange} handleSubmit={this.handleSubmit} word={this.state.word} error={this.props.error} />
      <div className="hero is-warning">
        <div className="hero-body">
          <div className="container">
          <Link to='/'>
            <h1 className="title has-text-centered is-1">
              Ponder
            </h1>
          </Link>
          </div>
        </div>
      </div>
      {/* routes */}
      <Switch>
        <Route exact path='/' render={()=> <Combo text={text} handleChange={this.handleChange} handleAnnotationSubmit={this.handleAnnotationSubmit}  /> } />
        <Route exact path='/feed' component={Feed} />
      </Switch>
    </section>
    )
  }
}
const mapStateToProps = state => {
  return { 
    error: state.mediaReducer.error,
    combo: state.mediaReducer.combo
  }
}
const mapDispatchToProps = dispatch => { 
  return { 
    postComboThunk: word => dispatch(postComboThunk(word)),
    postComboAnnotationThunk: ( comboId, text ) => dispatch(postComboAnnotationThunk( comboId, text)),
    getComboAnnotationsThunk: comboId => dispatch(getComboAnnotationsThunk(comboId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps )(App);