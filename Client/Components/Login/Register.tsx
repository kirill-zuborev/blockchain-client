import * as React from 'react';
import { RouteComponentProps, Redirect } from "react-router-dom";
import * as StoreModel from '../../Store/ApplicationStore';
import { connect } from "react-redux";
import { register } from '../../Actions/AuthAction';

export type SignProps =
    StoreModel.UserState
    & RouteComponentProps<{}>
    & { register: typeof register }

class Register extends React.Component<SignProps, {}> {
    onRegister(event) {
        event.preventDefault();
        event.stopPropagation();

        let formData = new FormData(event.currentTarget);

        this.props.register(formData);
    }

    render() {
        return this.props.isLogged
            ? <Redirect to={{ pathname: '/' }} />
            : <form onSubmit={e => this.onRegister(e)} >
                <input type="email" name="email" placeholder="Email" />
                <input type="text" name="ethereumAddress" placeholder="Ethereum Address" />
                <input type="password" name="password" placeholder="Password" />
                <input type="password" name="rePassword" placeholder="Repeat password" />
                <input type="submit" name="submit" value="Register" />
            </form>;
    }
}


export default connect(
    (state: StoreModel.ApplicationState) => state.user,
    { register }
)(Register) as typeof Register;
