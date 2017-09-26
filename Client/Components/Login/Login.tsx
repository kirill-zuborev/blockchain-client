import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import * as StoreModel from '../../Store/ApplicationStore';
import { connect } from "react-redux";
import { login } from '../../Actions/AuthAction';
import { Redirect } from "react-router";

export type LoginProps =
    StoreModel.UserState
    & RouteComponentProps<{}>
    & { login: typeof login };

class Login extends React.Component<LoginProps, {}> {
    onLogin(event) {
        event.preventDefault();
        event.stopPropagation();

        let formData = new FormData(event.currentTarget);

        this.props.login(formData);
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }

        return this.props.isLogged
            ? <Redirect to={from} />
            : <form onSubmit={e => this.onLogin(e)}>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <input type="submit" name="submit" value="Login" />
            </form>;
    }
}


export default connect(
    (state: StoreModel.ApplicationState) => state.user,
    { login  }
)(Login) as typeof Login;
