import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Box, TextField, Button } from '@mui/material';

// Định nghĩa kiểu cho từng field
interface Field {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}

// Định nghĩa kiểu cho props
interface FormProps {
  onSave: (formState: Record<string, any>) => void;
  entityToEdit?: Record<string, any>;
  fields: Field[];
  title: string;
  button: string;
}

const Form: React.FC<FormProps> = ({ onSave, entityToEdit, fields, title, button }) => {
  const [formState, setFormState] = useState<Record<string, any>>(() => 
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  useEffect(() => {
    if (entityToEdit) {
      setFormState(entityToEdit);
    } else {
      setFormState(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
    }
  }, [entityToEdit, fields]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
      <h2>{title}</h2>
      {fields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          name={field.name}
          value={formState[field.name]}
          type={field.type || 'text'}
          onChange={handleChange}
          required={field.required || false}
          fullWidth
          autoComplete={field.autoComplete || 'off'}
        />
      ))}
      <Button type="submit" variant="contained" color="primary">
        {button}
      </Button>
    </Box>
  );
};

export default Form;
