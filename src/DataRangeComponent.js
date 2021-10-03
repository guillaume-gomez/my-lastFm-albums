import React from 'react';
import moment from "moment";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

/* eslint-disable */
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
// pick utils
import MomentUtils from '@date-io/moment';


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
      <Box border="2px solid white" borderRadius="6px" padding="0.5rem">
        <Grid container item spacing={3} justifyContent="space-between" alignItems="center">
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid item>
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
            </Grid>
            <Grid item>
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
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" aria-label="Submit" onClick={this.updateDataRange}>
                <NavigationIcon className={classes.extendedIcon} />
                Update
              </Button>
             </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </Box>
    );
  }
}

export default withStyles(styles)(DataRangeComponent);