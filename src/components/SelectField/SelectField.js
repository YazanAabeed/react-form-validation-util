import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

const SelectField = ({
  label,
  errors,
  id,
  value,
  placeholder,
  helperText,
  onChange,
  style,
  items
}) => {
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
        value={value}
        label={label}
        placeholder={placeholder}
        error={!!Object.keys(errors).length}
        select
        helperText={helperText}
        onChange={event => onChange(id, event.target.value)}
        style={style}
      >
        {items.map(item => (
          <MenuItem key={item.id} value={item.code}>
            {item.value}
          </MenuItem>
        ))}
      </TextField>

      {!!Object.keys(errors).length &&
        Object.keys(errors).map(key => (
          <FormHelperText key={key} id={id}>
            {errors[key].message}
          </FormHelperText>
        ))}
    </FormControl>
  );
};

SelectField.defaultProps = {
  errors: {}
};

export default SelectField;
