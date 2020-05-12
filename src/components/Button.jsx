import React, { Component } from 'react';
import PropTypes from 'prop-types';

// functional or stateless component
// function ButtonComponent(props) {
//     const { buttonName } = props;

//     return <button>{buttonName}</button>;
// }

// class component
export default class Button extends Component {
    render() {
        // structure props
        const { buttonType, name, color, bgColor, handleClick } = this.props;

        return (
            <button
                type={buttonType}
                className="button"
                style={{ backgroundColor: bgColor, color }}
                onClick={handleClick}
            >
                {name}
            </button>
        );
    }
}

// default proptypes
Button.defaultProps = {
    bgColor: 'green',
    color: 'white',
    handleClick: () => {}
};

Button.propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    buttonType: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired,
    color: PropTypes.string,
    bgColor: PropTypes.string,
    handleClick: PropTypes.func
};
