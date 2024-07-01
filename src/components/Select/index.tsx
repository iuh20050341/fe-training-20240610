import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

interface Item {
  name: string;
}

interface BasicSelectProps {
  label: string;
  id: string;
  data: Item[];
  value: string;
  action: (event: SelectChangeEvent<string>) => void; //(event: React.ChangeEvent<{ value: unknown }>) => void;
}

const BasicSelect: React.FC<BasicSelectProps> = ({ label, id, data, value, action }) => {
  return (
    <>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={value}
        onChange={action}
      >
        {data.map((item, index) => (
          <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
        ))}
      </Select>
    </>
  );
}

export default BasicSelect;
