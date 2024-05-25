import { MultiValue, SingleValue } from 'react-select';

export interface ISelectItem<T> {
  label: string;
  value: T;
}
export type ISelectItemString = ISelectItem<string>;

export type ReactSelectOnChangeType = (
  newValue: MultiValue<ISelectItemString> | SingleValue<ISelectItemString>,
) => void;
