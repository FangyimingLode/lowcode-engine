import { Input } from 'antd';
import React from 'react';
import { SetterProps } from '@lowcode-engine/types';

type StringSetterProps = SetterProps<string>;

const StringSetter = ({ value, onChange }: StringSetterProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };
  return <Input value={value} onChange={handleChange} size={'small'} />;
};

export default {
  view: StringSetter,
  name: 'StringSetter',
};
