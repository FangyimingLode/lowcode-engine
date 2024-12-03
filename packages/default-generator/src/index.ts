import StringSetter from './setter/StringSetter';
import BooleanSetter from './setter/BooleanSetter';

export * from './lib/default-generator';


export const defaultSetter  = [
  StringSetter,
  BooleanSetter,
]
