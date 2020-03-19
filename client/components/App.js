import React, { Component } from 'react';
import Combo from './Combo';
import { connect } from 'react-redux';
import { postComboThunk, getComboThunk, getNextComboThunk, getCombosThunk } from '../store/reducers/media';
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
      information: {},
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectInformation = this.selectInformation.bind(this);
    this.handleAnnotationSubmit = this.handleAnnotationSubmit.bind(this);
    this.handleNextCombo = this.handleNextCombo.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.props.postComboThunk(this.state.word);
    this.props.getCombosThunk(this.state.word);
    this.setState({
      word: '',
      information: {}
    })
  }

  handleAnnotationSubmit(e) { 
    e.preventDefault();
    const { combo, postComboAnnotationThunk } = this.props;
    postComboAnnotationThunk(combo.id, this.state.text);
    this.setState({
      text: ''
    })
  }

  selectInformation(information) {
    return this.setState({
      information: information
    });
  }

  handleNextCombo(e) {
    e.preventDefault();
    const { combo, getNextComboThunk, getComboAnnotationsThunk } = this.props;
    getNextComboThunk(combo.id);
    this.selectInformation({});
    let id = combo.id - 1; 
    if(!id) id = 1; 
    getComboAnnotationsThunk(id);
  }

  async componentDidMount() {
    await this.props.getComboThunk();
    await this.props.getComboAnnotationsThunk(this.props.combo.id);
  }
  
  render() {
    const { text } = this.state;
    return(
    <section className="section">
      <Nabvbar handleChange={this.handleChange} handleSubmit={this.handleSubmit} word={this.state.word} error={this.props.error} />
      <div className="hero is-primary is-bold">
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
        <Route exact path='/' render={() => <Combo 
          text={text} 
          handleChange={this.handleChange} 
          handleAnnotationSubmit={this.handleAnnotationSubmit} 
          selectInformation={this.selectInformation} 
          handleNextCombo={this.handleNextCombo}  /> } />
        <Route exact path='/feed' render={() => <Feed 
          information={this.state.information} 
          selectInformation={this.selectInformation} 
          handleNextCombo={this.handleNextCombo} />} />
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
    getComboThunk: () => dispatch(getComboThunk()),
    getCombosThunk: word => dispatch(getCombosThunk(word)),
    postComboThunk: word => dispatch(postComboThunk(word)),
    postComboAnnotationThunk: ( comboId, text ) => dispatch(postComboAnnotationThunk( comboId, text)),
    getComboAnnotationsThunk: comboId => dispatch(getComboAnnotationsThunk(comboId)),
    getNextComboThunk: currComboId => dispatch(getNextComboThunk(currComboId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps )(App);