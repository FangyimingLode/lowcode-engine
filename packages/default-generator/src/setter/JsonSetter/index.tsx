import { useLayoutEffect, useState } from 'react';
import { MonacoEditorModal } from '../../lib/MonacoEditorModal';

interface JsonSetterProps {
  value: string | undefined | object;
  onChange?: (value: {
    type: 'JSFunction';
    // 字符串形式的函数
    value: string;
  }) => void;
  isOpen?: boolean;
}

const JsonSetter = ({ value: propsValue, onChange, isOpen }: JsonSetterProps) => {
  const [value, setValue] = useState('');
  const handleChange = (value: string) => {
    if (onChange) {
      let newVal = undefined;
      try {
        newVal = typeof propsValue === 'object' ? JSON.parse(value) : value;
      } catch (error) {
        console.error(error);
      }
      onChange(newVal);
    }
  };
  useLayoutEffect(() => {
    if(propsValue && typeof propsValue == 'object') {
      setValue(JSON.stringify(propsValue, null, 2));
    } else {
      setValue(propsValue || '');
    }
  }, [propsValue]);

  return (
    <MonacoEditorModal
      isOpen={isOpen}
      language={'json'}
      value={value}
      onChange={handleChange}
      title={''}
    />
  );
};

export default {
  view: JsonSetter,
  name: 'JsonSetter',
};
