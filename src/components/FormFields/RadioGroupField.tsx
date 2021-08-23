import { FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';


export interface RadioOption {
  label?: string;
  value: number | string;
}

export interface IRadioGroupFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: RadioOption[]
}

export function RadioGroupField ({name, control, label, disabled, options }: IRadioGroupFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error }
  } = useController({
    name,
    control
  })
  return (
    <FormControl disabled={disabled} component="fieldset" error={invalid}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={onChange} onBlur={onBlur}>
        {options.map(option=> (
          <FormControlLabel
            key={option.value}
            value={option.value} 
            label={option.label}
            control={<Radio />}  />
        ))}
      </RadioGroup>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
