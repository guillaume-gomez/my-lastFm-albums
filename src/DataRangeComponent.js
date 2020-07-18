import React from 'react';
import moment from "moment";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';

/* eslint-disable */
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
// pick utils
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import DatePicker from 'material-ui-pickers/DatePicker';


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
      fromDate: from,
      toDate: to
    };
    this.updateDataRange = this.updateDataRange.bind(this);
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { dateRange } = this.props;
    const { from, to } = dateRange;

    if(from !== nextProps.dateRange.from || to !== nextProps.dateRange.to) {
      this.setState({fromDate: nextProps.dateRange.from, toDate: nextProps.dateRange.to})
    }
  }

  updateDataRange() {
    const { submitHandler, dateRange } = this.props;
    const { fromDate, toDate} = this.state;
    submitHandler(fromDate, toDate);
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

    const formattedFrom = moment(fromDate).format("YYYY-MM-DD");
    const formattedTo = moment(toDate).format("YYYY-MM-DD");

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          color="white"
          id="date"
          label="from"
          value={formattedFrom}
          format={"YYYY-MM-DD"}
          onChange={this.onChangeFrom}
          InputLabelProps={{className: classes.textFieldDateLabel}}
          InputProps={{className: classes.textFieldDate}}
        />
        <DatePicker
          color="white"
          id="date"
          label="to"
          format={"YYYY-MM-DD"}
          value={formattedTo}
          onChange={this.onChangeTo}
          InputLabelProps={{className: classes.textFieldDateLabel}}
          InputProps={{className: classes.textFieldDate}}
        />
        <Button variant="extendedFab" aria-label="Submit" className={classes.button} onClick={this.updateDataRange}>
          <NavigationIcon className={classes.extendedIcon} />
          Update
        </Button>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(styles)(DataRangeComponent);