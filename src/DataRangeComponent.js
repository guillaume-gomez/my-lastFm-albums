import React from 'react';
import moment from "moment";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NavigationIcon from '@material-ui/icons/Navigation';

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
    this.convertDateToMilliseconds = this.convertDateToMilliseconds.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { dateRange } = this.props;
    const { from, to } = dateRange;

    if(from !== nextProps.dateRange.from || to !== nextProps.dateRange.to) {
      this.setState({fromDate: nextProps.dateRange.from, toDate: nextProps.dateRange.to})
    }
  }

  convertDateToMilliseconds(date) {
    return moment(date).valueOf();
  }

  updateDataRange() {
    const { submitHandler, dateRange } = this.props;
    const { fromDate, toDate} = this.state;
    submitHandler(this.convertDateToMilliseconds(fromDate), this.convertDateToMilliseconds(toDate));
  }

  onChangeFrom(e) {
    const { fromChange } = this.props;
    const newDate = this.convertDateToMilliseconds(e.target.value);
    this.setState({ fromDate: newDate})
    fromChange(newDate);
  }

  onChangeTo(e) {
    const { toChange } = this.props;
    const newDate = this.convertDateToMilliseconds(e.target.value);
    this.setState({ toDate: newDate });
    toChange(newDate);
  }

  render() {
    const { classes } = this.props;
    const { fromDate, toDate } = this.state;

    const formattedFrom = moment(fromDate).format("YYYY-MM-DD");
    const formattedTo = moment(toDate).format("YYYY-MM-DD");

    return (
      <React.Fragment>
        <TextField
          color="white"
          id="date"
          label="from"
          type="date"
          value={formattedFrom}
          onChange={this.onChangeFrom}
          InputLabelProps={{className: classes.textFieldDateLabel}}
          InputProps={{className: classes.textFieldDate}}
        />
        <TextField
          id="date"
          label="to"
          type="date"
          value={formattedTo}
          onChange={this.onChangeTo}
          InputLabelProps={{className: classes.textFieldDateLabel}}
          InputProps={{className: classes.textFieldDate}}
        />
        <Button variant="extendedFab" aria-label="Submit" className={classes.button} onClick={this.updateDataRange}>
          <NavigationIcon className={classes.extendedIcon} />
          Update
        </Button>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(DataRangeComponent);