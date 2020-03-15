import React from 'react';
import moment from "moment";
import { format, differenceInWeeks } from 'date-fns';
import { withStyles } from '@material-ui/core/styles';
import { DatePicker } from "@material-ui/pickers";
import Grid from '@material-ui/core/Grid';

const styles = {
  textFieldDate: {
    color: "white"
  },
  textFieldDateLabel: {
    color: "white",
    shrink: true,
  }
};

class DataRangeComponent extends React.Component {

  constructor(props) {
    super(props);

    const { dateRange } = props;
    const { from, to } = dateRange;

    this.state = {
      fromDate: new Date(from),
      toDate: new Date(to)
    };
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { from, to } = prevState;
    if(from !== nextProps.dateRange.from || to !== nextProps.dateRange.to) {
      return ({ fromDate: new Date(nextProps.dateRange.from), toDate: new Date(nextProps.dateRange.to) });
    }
    return null;
  }

  onChangeFrom(fromDate) {
    const { fromChange } = this.props;
    this.setState({ fromDate: fromDate.valueOf()})
    fromChange(fromDate.valueOf());
  }

  onChangeTo(toDate) {
    const { toChange } = this.props;
    this.setState({ toDate: toDate.valueOf() });
    toChange(toDate.valueOf());
  }

  render() {
    const { classes } = this.props;
    const { fromDate, toDate } = this.state;

    return (
      <Grid container item justify="space-between">
        <DatePicker
            color="primary"
            id="date"
            label="from"
            format={"YYYY-MM-DD"}
            value={fromDate}
            onChange={this.onChangeFrom}
            InputLabelProps={{className: classes.textFieldDateLabel}}
            InputProps={{className: classes.textFieldDate}}
            animateYearScrolling
        />
        <DatePicker
            color="primary"
            id="date"
            label="to"
            format={"YYYY-MM-DD"}
            value={toDate}
            onChange={this.onChangeTo}
            InputLabelProps={{className: classes.textFieldDateLabel}}
            InputProps={{className: classes.textFieldDate}}
            animateYearScrolling
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(DataRangeComponent);