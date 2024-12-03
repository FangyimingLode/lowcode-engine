import { Select } from 'antd';
import { SetterProps } from '@lowcode-engine/types';


interface SelectSetterProps extends SetterProps<string>{
  options?: {label:string, value: string}[];
}

const SelectSetter = ({value, onChange, options}: SelectSetterProps) => {


  const handleChange = (e: string) => {
    if(onChange) {
      onChange(e);
    }
  }

  return (
    <Select
      value={value}
      onChange={handleChange}
      size={'small'}
      options={options}
    />
  )
}


export default {
  view: SelectSetter,
  name: 'SelectSetter',
}
