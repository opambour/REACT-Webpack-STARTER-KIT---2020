import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Content extends Component {
    render() {
        // props
        const { children } = this.props;

        return <main>{children}</main>;
    }
}

// validation types
Content.propTypes = {
    children: PropTypes.node.isRequired
};

export default Content;
