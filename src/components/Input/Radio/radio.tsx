import React, { ChangeEvent } from 'react';

interface RadioProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const Radio: React.FC<RadioProps> = ({ name, label, value, onChange, disabled = false }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <label style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="radio"
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        style={{ marginRight: '8px' }}
      />
      {label}
    </label>
  );
};

export default Radio;
