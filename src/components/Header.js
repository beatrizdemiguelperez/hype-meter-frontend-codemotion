import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="header-main">
                <div className="header-main__content">
                    <img id="logo" src="codemotion_orange_white.png" alt="codemotion logo"></img>
                </div>
            </header>
        );
    }
}

export default Header;