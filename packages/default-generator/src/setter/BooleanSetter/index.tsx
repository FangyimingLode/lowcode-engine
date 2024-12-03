import { SetterProps } from '@lowcode-engine/types';
import { Radio, RadioChangeEvent } from 'antd';
import React from 'react';

type BooleanSetterProps = SetterProps<boolean>;
const BooleanSetter = ({ value, onChange }: BooleanSetterProps) => {
  const handleChange = (event: RadioChangeEvent) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };
  return (
    <Radio.Group value={value} onChange={handleChange}>
      <Radio value={true}> 是</Radio>
      <Radio value={false}>否</Radio>
    </Radio.Group>
  );
};

export default {
  view: BooleanSetter,
  name: 'BooleanSetter',
};
