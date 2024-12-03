import { Radio, RadioChangeEvent } from 'antd';
import { SetterProps } from '@lowcode-engine/types';

interface RadioGroupSetterProps extends SetterProps<string> {
  options?: { label: string; value: string }[];
}

const RadioGroupSetter = ({
  value,
  onChange,
  options,
}: RadioGroupSetterProps) => {
  const handleChange = (e: RadioChangeEvent) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  return (
    <Radio.Group value={value} onChange={handleChange} size="small">
      {(options || []).map((option) => (
        <Radio key={option.label} value={option.value}>
          {option.label}
        </Radio>
      ))}
    </Radio.Group>
  );
};

export default {
  view: RadioGroupSetter,
  name: 'RadioGroupSetter',
};
