import * as React from 'react';
import * as SignActions from '../../Actions/SignAction';
import { connect } from 'react-redux';
import * as SignAction from '../../Actions/SignAction'
import { Link, RouteComponentProps } from 'react-router-dom';
import * as StoreModel from '../../Store/ApplicationStore';
import { Async } from 'react-select';

export type CreateSignProps =
    {}
    & RouteComponentProps<{}>
    & typeof SignActions.SignAction;

export type CreateSignState = {
        usersToSign: { id: string, name: string }[]
    }

class CreateSign extends React.Component<CreateSignProps, CreateSignState> {
    constructor() {
        super();

        this.state = {
            usersToSign: []
        };
    }

    public uploadFile(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();

        let formData = new FormData(event.currentTarget);
        formData.append("usersToSign", this.state.usersToSign.map(c => c.id) as any);

        this.props.create(formData);
    }

    onChange(value) {
        this.setState({
            usersToSign: value,
        });
    }

    getUsers(input) {
        if (!input) {
            return Promise.resolve({ options: [] });
        }

        return fetch(`http://${window.location.host}/api/user/${input}`)
            .then((response) => response.json())
            .then((json) => {
                return { options: json };
            });
    }

    render() {
        return <form
            onSubmit={this.uploadFile.bind(this)}
            encType="multipart/form-data">
            <input type="file" name="files" />
            <Async
                multi
                value={this.state.usersToSign}
                onChange={this.onChange.bind(this)}
                valueKey="id"
                labelKey="name"
                loadOptions={this.getUsers.bind(this)}
            />
            <input type="password" name="password" />
            <button type="submit">Upload file</button>
        </form>;
    }
}

export default connect(
    (state: StoreModel.ApplicationState) => { return {}; },
    SignAction.SignAction
)(CreateSign) as typeof CreateSign;
