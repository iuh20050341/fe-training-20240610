import React from 'react';
import Radio from './radio.tsx';

interface RadioListProps {
  label: string;
  name: string;
  items: { label: string; value: string }[];
  onChange: (value: string) => void;

}

const RadioList: React.FC<RadioListProps> = ({ label, name, items, onChange  }) => {

  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <div>
    <label style={{ display: 'flex', alignItems: 'center' }}>
        {label}
        {items.map((item, index) => (
            <Radio
            key={index}
            name={name}
            label={item.label}
            value={item.value}
            onChange={handleChange}
            />
        ))}
      </label>
    </div>
  );
};

export default RadioList;
