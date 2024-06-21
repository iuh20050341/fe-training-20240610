import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
const Form = ({ onSave, entityToEdit, fields, title, button }) => {
  const [formState, setFormState] = useState(() => fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));

  useEffect(() => {
    if (entityToEdit) {
      setFormState(entityToEdit);
    } else {
      setFormState(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
    }
  }, [entityToEdit, fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', justifyContent: 'center'}}>
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
                <button>{button}</button>

            </Box>
  );
};

export default Form;
