// import React from 'react';
// import Radio from './radio.tsx';

// interface RadioListProps {
//   label: string;
//   name: string;
//   items: { label: string; value: string }[];
//   onChange: (value: string) => void;

// }

// const RadioList: React.FC<RadioListProps> = ({ label, name, items, onChange  }) => {

//   const handleChange = (value: string) => {
//     onChange(value);
//   };

//   return (
//     <div>
//     <label style={{ display: 'flex', alignItems: 'center' }}>
//         {label}
//         {items.map((item, index) => (
//             <Radio
//             key={index}
//             name={name}
//             label={item.label}
//             value={item.value}
//             onChange={handleChange}
//             />
//         ))}
//       </label>
//     </div>
//   );
// };

// export default RadioList;
// RadioList.tsx
import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const RadioList = ({ label, name, items, onChange, value }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        aria-label={name}
        name={name}
        value={value} // Giá trị được chọn từ props
        onChange={(event) => onChange(event.target.value)}
      >
        {items.map((item) => (
          <FormControlLabel
            key={item.value}
            value={item.value}
            control={<Radio />}
            label={item.label}
            checked={value === item.value} // Kiểm tra xem giá trị này có phải là giá trị được chọn không
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioList;
