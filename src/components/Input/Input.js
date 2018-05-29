import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

const styles = theme => ({
  textField: {
    width: "100%"
  }
});

class Input extends React.Component {
  static defaultProps = {
    onChange: event => {},
    errors: {}
  };

  render() {
    const { classes, label, id, errors, helperText, value } = this.props;

    return (
      <FormControl
        error={!!Object.keys(errors).length}
        style={{
          width: "100%"
        }}
        aria-describedby={id}
      >
        <TextField
          id={id}
          label={label}
          className={classes.textField}
          value={value}
          onChange={event => {
            this.props.onChange(id, event.target.value);
          }}
          error={!!Object.keys(errors).length}
          helperText={helperText}
        />

        {!!Object.keys(errors).length &&
          Object.keys(errors).map(key => (
            <FormHelperText id={id} key={key}>
              {errors[key].message}
            </FormHelperText>
          ))}
      </FormControl>
    );
  }
}

Input.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default withStyles(styles)(Input);
