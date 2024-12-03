import { SetterProps } from '@lowcode-engine/types';
import React from 'react';


interface TextSetterProps extends SetterProps<string>{
  style?: React.CSSProperties;
  // [arr: string]: any;
}
const TextSetter = ({style, value}: TextSetterProps) => {
  return <div style={style}>{value}</div>
}


export default  {
  name: 'TextSetter',
  view: TextSetter,
}
