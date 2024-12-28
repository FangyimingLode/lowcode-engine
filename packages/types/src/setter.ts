import { ElementType } from 'react';

export interface SetterProps<T> {
  value: T
  onChange?: (val: T) => void;
}

export interface RegisteredSetter {
  view: ElementType<SetterProps<any> & {[attr: string]: any}>
  name: string
}

export interface SetterStore {
  setters: Map<string, RegisteredSetter>
  register: (name: string, setter: RegisteredSetter) => void
  removeSetter: (name: string) => void
}
