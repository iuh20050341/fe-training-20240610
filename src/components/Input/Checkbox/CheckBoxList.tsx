import React, { useState } from 'react';
import Checkbox from './index.tsx';

interface CheckboxListProps {
  items: string[];
}

const CheckboxList: React.FC<CheckboxListProps> = ({ items }) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(items.map(() => false));

  const handleCheckboxChange = (index: number) => (checked: boolean) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = checked;
    setCheckedItems(newCheckedItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <Checkbox
          key={index}
          label={item}
          checked={checkedItems[index]}
          onChange={handleCheckboxChange(index)}
        />
      ))}
    </div>
  );
};

export default CheckboxList;
