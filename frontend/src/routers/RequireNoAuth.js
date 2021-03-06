import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import browserHistory from '../utils/historyUtils';

export default function(ComposedComponent) {
    class NotAuthentication extends Component {
        componentWillMount() {
            if (this.props.authenticated) {
                browserHistory.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if (nextProps.authenticated) {
                browserHistory.push('/');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    NotAuthentication.propTypes = {authenticated: PropTypes.bool};

    function mapStateToProps(state) {
        return {authenticated: state.auth.isAuthenticated};
    }

    return connect(mapStateToProps)(NotAuthentication);
}
