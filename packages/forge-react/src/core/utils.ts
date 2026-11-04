import { ForwardedRef, Ref } from 'react';

export function setRef(ref: ForwardedRef<any> | Ref<any> | undefined, value: any): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref != null) {
    (ref as React.MutableRefObject<any>).current = value;
  }
}
