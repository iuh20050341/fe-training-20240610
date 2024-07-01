import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useFormContext, Controller } from 'react-hook-form';

type InputFieldProps = {
  name: string;
  label: string;
  type?: string;
  rules?: any;
};

const InputField: React.FC<InputFieldProps> = ({ name, label, type = 'text', rules }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          variant="outlined"
          margin="normal"
          fullWidth
          error={!!errors[name]}
          helperText={errors[name]?.message}
        />
      )}
    />
  );
};

export default InputField;
