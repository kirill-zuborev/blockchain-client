import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Moment from 'moment';

export type DateRangePickerProps = {
    minDate?: string,
    maxDate?: string,
    onMinDateChanged?: (date: string) => {},
    onMaxDateChanged?: (date: string) => {},
}

export class DateRangePicker extends React.Component<DateRangePickerProps, {}> {
    onMinDateChanged(date: Moment.Moment) {
        this.props.onMinDateChanged && this.props.onMinDateChanged(date.toISOString());
    }

    onMaxDateChanged(date: Moment.Moment) {
        this.props.onMaxDateChanged && this.props.onMaxDateChanged(date.toISOString());
    }

    render() {
        let minDate = this.props.minDate && Moment(this.props.minDate); 
        let maxDate = this.props.maxDate && Moment(this.props.maxDate); 

        return <div>
            <DatePicker
                selected={minDate}
                onChange={this.onMinDateChanged.bind(this)} />
            <DatePicker
                selected={maxDate}
                onChange={this.onMaxDateChanged.bind(this)} />
        </div>
    }
}