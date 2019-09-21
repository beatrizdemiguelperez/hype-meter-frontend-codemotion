import React, { Component } from 'react';
import './thermometer.css';
import { Profiles } from '../api/resources/profiles';
import Loader from '../components/Loader';

const LEVEL_TEXTS = {
    0: (name) => `Meh, se podría mejorar ${name}`,
    1: (name) => `Ok, ok ${name} no está mal`,
    2: (name) => `Cool, eso está bastante bien ${name}`,
    3: (name) => `Wow, eres super cool ${name}`
};

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '', fillStyle: {} };
        this.top = React.createRef();
    }

    componentDidMount() {
        this.fetchData().then(result => {
            const { level, name } = result.data;
            this.setLevel(level)
            this.setState({ text: LEVEL_TEXTS[parseInt(level*3)](name), name, loaded: true });
        }).catch(() => {
            window.alert('Ups...Algo salió mal. Recarga y vuelve a intentar');
        })
    }

    fetchData() {
        const id = this.props.match.params.id;
        return Profiles.getScores(id);
    }

    setLevel(level) {
        const height = parseFloat(getComputedStyle(this.top.current, null).height.replace('px', ''));
        const fillHeight = level * height;
        const fillStyle = { height: `${12 + fillHeight}px` };
        this.setState({ level, fillStyle });
    }

    render() {
        return (
            <div className="main">
                <section>
                    <div className="flex-center">
                        <div id="thermometer" className="thermometer-container">
                            <div className="meter">
                                <div className="top">
                                    <ul className="left">
                                        <li className="percent light"><strong>WOW</strong></li>
                                        <li className="percent dark selected"><strong>COOL</strong></li>
                                        <li className="percent light"><strong>OK</strong></li>
                                        <li className="percent dark"><strong>MEH</strong></li>
                                    </ul>
                                    <div id="thermometer-top" ref={this.top}>
                                        <div id="thermometer-fill" style={this.state.fillStyle}></div>
                                    </div>
                                    <ul className="right">
                                        <li className="percent light"><strong>WOW</strong></li>
                                        <li className="percent dark selected"><strong>COOL</strong></li>
                                        <li className="percent light"><strong>OK</strong></li>
                                        <li className="percent dark"><strong>MEH</strong></li>
                                    </ul>
                                </div>
                                <div id="thermometer-bottom">
                                    <span className="hide"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="set-padding-3 txt-align-c">
                    <p className="result">{this.state.text}</p>
                </div>
                <div className="footer">
                    <div className="two_stars">
                        <img id="logo" src="../two_stars.svg" alt="stars"></img>
                    </div>

                    <div className="hipster"><img src="../hipster.svg" alt="Hipster free icon" title="Hipster free icon"></img></div>
                </div>
                {this.state.loaded ?
                    <div></div>
                    : <Loader />}
            </div>
        );
    }
}

export default Result;