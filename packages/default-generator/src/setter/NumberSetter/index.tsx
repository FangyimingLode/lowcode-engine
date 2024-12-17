import { InputNumber } from 'antd';
import { SetterProps } from '@lowcode-engine/types';

interface NumberSetterProps extends SetterProps<number | undefined> {
  step?: number;
}
const NumberSetter = ({ value, onChange, step }: NumberSetterProps) => {
  const handleChange = (value: number | null) => {
    onChange && onChange(value ? value : undefined);
  };
  return (
    <InputNumber
      value={value}
      onChange={handleChange}
      size={'small'}
      step={step}
    />
  );
};

export default {
  name: 'NumberSetter',
  view: NumberSetter,
};
