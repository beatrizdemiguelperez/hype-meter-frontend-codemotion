import React, { Component } from 'react';

const DEFAULT_THEME = 'submit';

class Button extends Component {
    render() {
        const { onClick, type, disabled } = this.props;
        const className = `button-default button-${type || DEFAULT_THEME}`;
        return (
            <button
                className={className}
                type={type}
                aria-disabled={Boolean(disabled).toString()}
                onClick={onClick}>
                <span className="button__content">
                    <b className="button__text">{this.props.children}</b>
                </span>
            </button>
        );
    }
}

export default Button;
