import React, { Component } from 'react';
import Combo from './Combo';
import { connect } from 'react-redux';
import { getComboThunk } from '../store/reducers/media';
import { Route, Switch, Link } from 'react-router-dom';
import Feed from './Feed';
import Nabvbar from './Navbar';


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
    this.props.getComboThunk(this.state.word);
    this.setState({
      word: ''
    })
  }

  handleAnnotationSubmit(e) { 
    e.preventDefault();
    console.log('clicked', this.state.text)
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
    error: state.mediaReducer.error
  }
}
const mapDispatchToProps = dispatch => { 
  return { 
    getComboThunk: (word)=> dispatch(getComboThunk(word))
  }
}
export default connect(mapStateToProps, mapDispatchToProps )(App);