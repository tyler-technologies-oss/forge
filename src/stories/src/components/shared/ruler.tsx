import React, { CSSProperties, FC, MutableRefObject, useEffect, useRef } from "react";

type Axis = 'x' | 'y';

export const Ruler: FC<{axis: Axis, px: number}> = ({children, axis, px}) => {
  const containerRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  let elements: HTMLElement[] = [];

  useEffect(() => {
    elements.forEach(c => containerRef?.current?.removeChild(c));
    elements = [];
    const length = axis === 'x'
      ? parseFloat(getComputedStyle(containerRef?.current)?.width.slice(0, -2))
      : parseFloat(getComputedStyle(containerRef?.current)?.height.slice(0, -2));
    const value = px != 0 ? `${px}px` : '0';
    if (length > 1) {
      for(let i = 0; i < length + 1; i++) {
        const unit = document.createElement('div');
        unit.style.position = 'absolute';
        unit.style.backgroundColor = 'red';
        unit.style.top = axis === 'y' ? i !== 0 ? `${i}px` : '0' : value;
        unit.style.left = axis === 'x' ? i !== 0 ? `${i}px` : '0' : value;
        unit.style.height = axis === 'y' ? '0.1px' : '1px';
        unit.style.width = axis === 'x' ? '0.1px' : '1px';
        if (i % 10 === 0) {
          if (axis === 'x') {
            unit.style.height = '4px';
          } else {
            unit.style.width = '4px';
          }
        } else if (i % 5 === 0) {
          if (axis === 'x') {
            unit.style.height = '2px';
          } else {
            unit.style.width = '2px';
          }
        } else {
          if (axis === 'x') {
            unit.style.height = '1px';
          } else {
            unit.style.width = '1px';
          }
        }
        elements.push(unit);
        containerRef?.current?.append(unit);
      }
    }

    return () => {
      elements.forEach(c => containerRef?.current?.removeChild(c));
      elements = [];
    }
  });

  const containerStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-block'
  };

  return <div ref={containerRef} style={containerStyle}>{children}</div>;
}