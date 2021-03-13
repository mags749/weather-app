import React, { FC } from 'react';

interface iDropDownProps {
  name: string;
  options?: string[];
  onChange(e: any): void;
  label: string;
  defaultValue?: string;
}

const DropDown: FC<iDropDownProps> = ({ label, name, options, onChange, defaultValue }) => (
  <div className="drop-down">
    <label className="drop-down-label">{label}</label>
    <select
      name={name}
      onChange={onChange}
      defaultValue={defaultValue ? defaultValue : ''}
      className="drop-down-select"
    >
      {defaultValue && defaultValue === '' && <option value=""></option>}
      {options &&
        options.map((optName: string, index: number) => (
          <option value={optName} key={index}>
            {optName}
          </option>
        ))}
    </select>
  </div>
);

export default DropDown;
