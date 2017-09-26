import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import * as NotesActions from '../../Actions/NotesAction'
import { Note } from './Note';
import * as StoreModel from '../../Store/ApplicationStore';
import * as models from '../../Api/models';
import { stringify, parse, QueryShema } from '../../Utils/QueryParser';
import debounce = require('lodash/debounce');
import { DateRangePicker } from '../Shared/DateRangePicker';

type NotesProps =
    StoreModel.NotesState
    & typeof NotesActions.notesAction
    & RouteComponentProps<models.NotesFilter>;

function getQueryShema(): QueryShema {
    return [
        { name: 'onlyWithComments', type: 'boolean' },
        { name: 'page', type: 'number' },
        { name: 'count', type: 'number' }
    ];
}

class Notes extends React.Component<NotesProps, {}> {
    getFilter(queryString: string): models.NotesFilter {
        let query = parse<models.NotesFilter>(queryString, getQueryShema());

        query = {
            dateRange: {
                maxDate: query.dateRange && query.dateRange.maxDate,
                minDate: query.dateRange && query.dateRange.minDate
            },
            pager: {
                count: query.pager ? query.pager.count : 10,
                page: query.pager ? query.pager.page : 0,
            },
            nameFilter: query.nameFilter,
            onlyWithComments: query.onlyWithComments
        };

        return query;
    }

    updateQuery(callback: (query: models.NotesFilter) => void) {
        let query = JSON.parse(JSON.stringify(this.props.filter)) as models.NotesFilter;

        callback(query);

        this.props.history.push({ pathname: '/notes', search: stringify(query) });
    }

    // #region Overrided methods

    componentWillMount() {
        let filter = this.getFilter(this.props.location.search);

        this.props.getNotes(filter);
    }

    componentWillReceiveProps(nextProps: NotesProps) {
        let filter = this.getFilter(nextProps.location.search);

        this.props.getNotes(filter);
    }

    // #endregion
    
    // #region Handlers

    onInputChanged(event) {
        this.updateQuery(c => {
            c.onlyWithComments = event.target.checked;
        });
    };

    onNameFilterChanged(event) {
        event.persist();

        this.debounceNameFilter(event);
    };

    onMinDateChanged(date) {
        this.updateQuery(c => {
            c.dateRange.minDate = date;
        });
    }

    onMaxDateChanged(date) {
        this.updateQuery(c => {
            c.dateRange.maxDate = date;
        });
    }

    onNextClick() {
        this.updateQuery(c => {
            c.pager.page = c.pager.page + 1;
        });
    }

    onPrevClick() {
        this.updateQuery(c => {
            if (c.pager.page > 0) {
                c.pager.page = c.pager.page - 1;
            }
        });
    }

    onStartClick() {
        this.updateQuery(c => {
            c.pager.page = 0;
        });
    }

    private debounceNameFilter = debounce((event) => {
        this.updateQuery(c => {
            c.nameFilter = event.target.value;
        });
    }, 1000);

    // #endregion

    // #region RenderSection

    renderFilters() {
        let onlyWithComments = this.props.filter && <div>
            <input
                name="onlyWithComments"
                type="checkbox"
                checked={this.props.filter.onlyWithComments}
                onChange={this.onInputChanged.bind(this)} />
            <label>Only with comments</label>
        </div>;

        let nameFilter = this.props.filter && <input
            type="text"
            label="NameFilter"
            defaultValue={this.props.filter.nameFilter}
            onChange={this.onNameFilterChanged.bind(this)}
        />

        let dateRangePicker = this.props.filter && <DateRangePicker
            minDate={this.props.filter.dateRange && this.props.filter.dateRange.minDate}
            maxDate={this.props.filter.dateRange && this.props.filter.dateRange.maxDate}
            onMinDateChanged={this.onMinDateChanged.bind(this)}
            onMaxDateChanged={this.onMaxDateChanged.bind(this)}
        />

        return <div>
            {onlyWithComments}
            {nameFilter}
            {dateRangePicker}
        </div>;
    }

    public render() {
        return <div>
            {this.renderFilters()}
            {this.props.notes.map(c => <Note data={c.name} key={c.id} />)}
            {this.props.isLoading ? "Loading" : "Loading complete"}
            <button onClick={this.onPrevClick.bind(this)}>Prev</button>
            <button onClick={this.onStartClick.bind(this)}>Start</button>
            <button onClick={this.onNextClick.bind(this)}>Next</button>
        </div>;
    }

    // #endregion
}

export default connect(
    (state: StoreModel.ApplicationState) => state.notes,
    NotesActions.notesAction
)(Notes) as typeof Notes;

