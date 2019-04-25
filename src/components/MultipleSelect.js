import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { handleChange, getLabelsData } from "./../actions/IssueActions";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "white"
  },

  formControl: {
    borderTop: "solid 3px orange",
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 9 + ITEM_PADDING_TOP,
      minHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
      width: "85"
    }
  }
};

let names = [];
class MultipleSelect extends React.Component {
  componentDidMount() {
    this.props.getLabelsData();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple">Labels</InputLabel>
          <Select
            multiple
            value={this.props.name}
            onChange={this.props.handleChange}
            input={<Input id="select-multiple" />}
            MenuProps={MenuProps}
          >
            {
              (names = this.props.labels.reduce((acc, val) => {
                acc.push(val.name);
                return acc;
              }, []))
            }
            {names.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  if (state !== undefined) {
    return {
      name: state.issues.name,
      labels: state.issues.labels
    };
  }
};

export default connect(
  mapStateToProps,
  { handleChange, getLabelsData }
)(withStyles(styles, { withTheme: true })(MultipleSelect));
