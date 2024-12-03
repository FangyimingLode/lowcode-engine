export interface SetterProps<T> {
  value: T
  onChange?: (val: T) => void;
}
