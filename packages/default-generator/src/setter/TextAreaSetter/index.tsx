import { SetterProps } from '@lowcode-engine/types';
import { Input } from 'antd';
import { ChangeEvent } from 'react';


const { TextArea } = Input

type TextAreaSetterProps = SetterProps<string>

const TextAreaSetter = ({value, onChange}: TextAreaSetterProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if(onChange) {
      onChange(e.target.value);
    }
  }
  return (
    <TextArea
      rows={2}
      autoSize={true}
      value={value}
      onChange={handleChange}
      size={'small'}
    />
  );
}

export default {
  view: TextAreaSetter,
  name: 'TextAreaSetter',
}
