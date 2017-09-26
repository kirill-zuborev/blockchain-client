import * as React from 'react';
import * as SignActions from '../../Actions/SignAction';
import { connect } from 'react-redux';
import * as SignAction from '../../Actions/SignAction'
import { Link, RouteComponentProps } from 'react-router-dom';
import * as StoreModel from '../../Store/ApplicationStore';
import { Async } from 'react-select';

export type SignDetailsProps =
    StoreModel.SignState
    & RouteComponentProps<{}>
    & typeof SignActions.SignAction;

class SignDetails extends React.Component<SignDetailsProps, {}> {
    onChange(value) {
        this.setState({
            usersToSign: value,
        });
    }

    componentWillMount() {
        this.props.getSigns(this.props.isMySignSelected);
    }

    componentWillReceiveProps(nextProps: StoreModel.SignState) {
        this.props.getSigns(this.props.isMySignSelected);
    }

    render() {
        let sign = this.props.selectedSign;

        return (
            <div>
                <ul>
                    {sign.toSign.map((val, index) => {
                        return <li key={val.id}>
                            <div>
                                Name: {val.name}, Is signed: {sign.signed.some(c => c.id == val.id)}
                            </div>
                        </li>;
                    })}
                </ul>
                <input type="button" name="download" onClick={() => { this.props.download(sign.manifest) }} />
            </div>
        );
    }
}

export default connect(
    (state: StoreModel.ApplicationState) => state.sign,
    SignAction.SignAction
)(SignDetails) as typeof SignDetails;
