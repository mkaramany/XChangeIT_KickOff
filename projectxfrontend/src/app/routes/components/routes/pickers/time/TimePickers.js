import React, { Component } from "react";
import moment from "moment";
import { TimePicker } from "material-ui-pickers";

export default class TimePickers extends Component {
  state = {
    selectedDate: this.props.value ? this.props.value : null,
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      this.props.onUpdate(this.state.selectedDate);
    }
  }

  render() {
    const { selectedDate } = this.state;
    return (
      <TimePicker
        label={this.props.label}
        fullWidth
        ampm={this.props.ampm}
        value={selectedDate}
        onChange={this.handleDateChange}
      />
    );
  }
}
