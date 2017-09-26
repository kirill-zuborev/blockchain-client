import * as React from 'react';
import { RouteComponentProps, Link } from "react-router-dom";
import Auth from './Login/Auth';
import { logout } from '../Actions/AuthAction';
import { connect } from "react-redux";
import * as StoreModel from '../Store/ApplicationStore';

export type NavigationProps =
    StoreModel.UserState
    & RouteComponentProps<{}>
    & { logout: typeof logout };

export class Navigation extends React.Component<NavigationProps, {}> {
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

    renderUnlogged() {
        return [
            <li>
                <Link to='/login'>
                    Login
                </Link>
            </li>,
            <li>
                <Link to='/register'>
                    Register
                </Link>
            </li>
        ];
    }

    renderAuth() {
        return this.props.isLogged ? this.renderLogged() : this.renderUnlogged();
    }

    render() {
        return <ul className='nav navbar-nav'>
            <li>
                <Link to='/'>
                    Home
                </Link>
            </li>
            <li>
                <Link to='/notes'>
                    Notes
                </Link>
            </li>
            <li>
                <Link to='/sign'>
                    Sign
                </Link>
            </li>
            <li>
                <Link to='/dev'>
                    SandBox
                </Link>
            </li>
            { this.renderAuth() }
        </ul>
    }
}

export default connect(
    (state: StoreModel.ApplicationState) => state.user,
    { logout }
)(Navigation);
