import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { App } from './Components/App';
import { Home } from './Components/Home';
import Notes from './Components/Notes/Notes';
import { SandBox } from './Components/SandBox/SandBox';
import Sign from './Components/Sign/Sign';
import CreateSign from './Components/Sign/CreateSign';
import Register from './Components/Login/Register';
import Login from './Components/Login/Login';
import { connect } from "react-redux";
import { ApplicationState } from "./Store/ApplicationStore";

class PrivateRouteClass extends React.Component<any, any> {
    render() {
        const { component: Component, ...rest } = this.props;

        return (
            <Route {...rest} render={props => (
                this.props.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }} />
                    )
            )} />
        );
    }
}

function mapStateToProps(state: ApplicationState) {
    return { isAuthenticated: state.user.isLogged }
}

const PrivateRoute = connect(
    mapStateToProps, null, null, {
        pure: false
    }
)(PrivateRouteClass) as typeof PrivateRouteClass;

export const routes = (
    <switch>
        <App>
            <Route exact path='/' component={Home} />
            <PrivateRoute path='/notes' component={Notes} />
            <PrivateRoute exact path='/sign' component={Sign} />
            <Route exact path='/dev' component={SandBox} />
            <Route exact path='/createSign' component={CreateSign} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
        </App>
    </switch>
);

