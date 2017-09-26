import * as React from 'react';
import debounce = require('lodash/debounce');
import { stringify, parse } from '../../Utils/QueryParser';

export class SandBox extends React.Component<{ name: string }, {}> {
    onKeyDown(e) {
        e.persist();

        console.log(e.target);

        this.delayCallback(e);
    }

    delayCallback = debounce((e) => {
        console.log(e.target);
    }, 1000);

    componentWillMount() {
    }

    render() {
        return <div>
            <input
                type="text"
                value={this.props.name}
                onKeyDown={this.onKeyDown.bind(this)}
            />
        </div>
    }
}