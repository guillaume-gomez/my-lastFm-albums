import React from 'react';
import moment from "moment";
import { withStyles } from '@material-ui/core/styles';
import { DatePicker } from "@material-ui/pickers";

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
    const { submitHandler } = this.props;
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
      <div>
        <DatePicker
            color="primary"
            id="date"
            label="from"
            format={"YYYY-MM-DD"}
            value={formattedFrom}
            InputLabelProps={{className: classes.textFieldDateLabel}}
            InputProps={{className: classes.textFieldDate}}
            animateYearScrolling
        />
        <DatePicker
            color="primary"
            id="date"
            label="to"
            format={"YYYY-MM-DD"}
            value={formattedTo}
            onChange={this.onChangeTo}
            InputLabelProps={{className: classes.textFieldDateLabel}}
            InputProps={{className: classes.textFieldDate}}
            animateYearScrolling
        />
      </div>
    );
  }
}

export default withStyles(styles)(DataRangeComponent);