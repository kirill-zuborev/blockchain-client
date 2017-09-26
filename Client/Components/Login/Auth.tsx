import * as React from 'react';
import { RouteComponentProps, Link } from "react-router-dom";
import * as StoreModel from '../../Store/ApplicationStore';
import { connect } from "react-redux";
import { logout } from '../../Actions/AuthAction';
import { Redirect } from "react-router";

export type AuthProps =
    StoreModel.UserState
    & RouteComponentProps<{}>
    & { logout: typeof logout };

class Auth extends React.Component<AuthProps, {}> {
    onLogout() {
        this.props.logout();
    }

    renderLogged() {
        return <li>
                <label>
                    Hello {this.props.user.email}
                </label>
                <Link to='/' onClick={this.onLogout.bind(this)}>
                    Logout
                </Link>
            </li>;
    }

    renderLogin() {
        return <li>
            <Link to='/login'>
                Login
            </Link>
        </li>;
    }

    renderRegister() {
        return <li>
            <Link to='/register'>
                Register
            </Link>
        </li>;
    }

    renderUnlogged() {
        return (
            this.renderLogin(),
            this.renderRegister()
            );
    }

    render() {
        return this.props.isLogged ? this.renderLogged() : this.renderUnlogged();
    }
}


export default connect(
    (state: StoreModel.ApplicationState) => state.user,
    { logout }
)(Auth);
