import * as React from 'react';
import * as SignActions from '../../Actions/SignAction';
import { connect } from 'react-redux';
import * as SignAction from '../../Actions/SignAction'
import { Link, RouteComponentProps } from 'react-router-dom';
import * as StoreModel from '../../Store/ApplicationStore';

export type SignProps =
    StoreModel.SignState 
    & RouteComponentProps<{}>
    & typeof SignActions.SignAction;

class Sign extends React.Component<SignProps, {}> {
    public uploadFile(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();

        let formData = new FormData(event.currentTarget);

        this.props.create(formData);
    }

    componentWillMount() {
        this.props.getSigns(this.props.isMySignSelected);
    }

    componentWillReceiveProps(nextProps: StoreModel.SignState) {
        this.props.getSigns(this.props.isMySignSelected);
    }

    handleSignLoad(isMySign: boolean) {
        this.props.getSigns(isMySign);
    }

    renderList() {
        return <ul>
            {
                this.props.signs.map((val, index) => {
                    return <li key={index}>val</li>;
                })
            }
        </ul>;
    }

    render() {
        return <div>
            <div>
                <input name="createSign" value="Create Sign" onClick={e => { this.props.history.push("/createSign") }} />
            </div>
            <div>
                <input name="mySign" value="My Sign" onClick={e => { this.handleSignLoad(true) }} />
                <button name="toSign" value="To Sign" onClick={e => { this.handleSignLoad(false) }} />
            </div>
            {this.renderList()}
        </div>;
    }
}

export default connect(
    (state: StoreModel.ApplicationState) => state.sign,
    SignAction.SignAction
)(Sign) as typeof Sign;
