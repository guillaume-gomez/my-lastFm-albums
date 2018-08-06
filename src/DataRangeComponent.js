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
    this.updateQuery = this.updateQuery.bind(this);
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

  updateQuery() {
    const { submitHandler, dateRange } = this.props;
    const { fromDate, toDate} = this.state;
    submitHandler(fromDate, toDate);
  }

  onChangeFrom(e) {
    const { fromChange } = this.props;
    this.setState({ fromDate: e.target.value})
    fromChange(e.target.value);
  }

  onChangeTo(e) {
    const { toChange } = this.props;
    this.setState({ toDate: e.target.value });
    toChange(e.target.value)
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
        <Button variant="extendedFab" aria-label="Delete" className={classes.button}>
          <NavigationIcon className={classes.extendedIcon} />
          Update
        </Button>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(DataRangeComponent);