import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export default function BasicSelect({label, id , data, value, action}) {

  return (
    <React.Fragment>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
      labelId={label}
      id={id}
      value={value}
      onChange={action}
      >
      {data.map(book =>(
          <MenuItem value={book.name}>{book.name}</MenuItem>

      ))}

      </Select>
    </React.Fragment>

  );
}
