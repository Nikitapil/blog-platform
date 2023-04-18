// Redux actions
export type TReduxAction<T> = {
  type: string;
  payload: T;
};

export type TButtonColorType = 'primary' | 'success' | 'danger' | 'transparent';
