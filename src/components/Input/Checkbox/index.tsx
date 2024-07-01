import React, { ChangeEvent } from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, disabled = false }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        style={{ marginRight: '8px' }}
      />
      {label}
    </label>
  );
};

export default Checkbox;
