import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';

class Home extends Component {
  render() {
    return (
      <div className="main">
        <Header></Header>
        <section className="content set-padding-3">
          <div className="main-content set-padding flex-center">
            <pre className="big-code">
              <span className="orange">&lt;</span>
              <span className="light_blue">h1</span>
              <span className="orange">></span>
              <span className="pink">Hola, <br></br>developer</span>
              <span className="orange">&lt;/</span>
              <span className="light_blue">h1</span>
              <span className="orange">></span>
            </pre>
            <pre className="small-code">
              <span className="grey">&lt;</span>
              <span className="yellow">p</span>
              <span className="grey">></span>
              <span className="orange">¿Quieres saber cúal es tu nivel de hype?</span>
              <span className="grey">&lt;/</span>
              <span className="yellow">p</span>
              <span className="grey">></span>
            </pre>
          </div>
        </section>
        <div className="footer">
          <div className="two_stars"><img id="logo" src="two_stars.svg" alt="stars"></img></div>
          <div className="set-padding-6 txt-align-c">
            <Button><Link to="/form">Vamos</Link></Button>
          </div>
          <div className="hipster"><img src="hipster.svg" alt="Hipster free icon" title="Hipster free icon"></img></div>
        </div>
      </div>
    );
  }
}

export default Home;