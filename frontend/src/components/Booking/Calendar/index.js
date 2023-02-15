import React from "react";
import {DayPickerRangeController} from "react-dates";
import 'react-dates/initialize';


const Calendar = () => {
  return (
    <DayPickerRangeController
    startDate={this.state.startDate}
    endDate={this.state.endDate}
    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
    focusedInput={this.state.focusedInput}
    onFocusChange={focusedInput => this.setState({ focusedInput })}
    initialVisibleMonth={() => moment().add(2, "month")}
   />
  );
};

export default Calendar;
