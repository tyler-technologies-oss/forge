import React, { CSSProperties, FC, MutableRefObject, useEffect, useRef } from "react";

export interface IGuideline {
  axis: Axis;
  px: number;
  label?: string;
  lineWidth?: number;
}
type Axis = 'x' | 'y';

export const Guideline: FC<{lines: IGuideline[]}> = ({children, lines}) => {
  const containerRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const containerStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-block'
  };
  let elements: HTMLElement[] = [];

  useEffect(() => {
    elements.forEach(c => containerRef?.current?.removeChild(c));
    elements = [];
    
    lines.forEach(l => {
      const lineEl = document.createElement('div');
      const value = l.px != 0 ? `${l.px}px` : '0';
      const stroke = l.lineWidth !== undefined ? l.lineWidth + 'px' : '0.1px';
      lineEl.style.position = 'absolute';
      lineEl.style.backgroundColor = 'var(--mdc-theme-error, rgb(150, 0, 0))';
      lineEl.style.top = l.axis === 'y' ? value : '0';
      lineEl.style.left = l.axis === 'x' ? value : '0';
      lineEl.style.width = l.axis === 'x' ? stroke : '100%';
      lineEl.style.height = l.axis === 'y' ? stroke : '100%';
      lineEl.style.pointerEvents = 'none';
      lineEl.style.fontSize = '1px';
      lineEl.style.color = 'var(--mdc-theme-on-surface, #000000)';
      lineEl.style.opacity = '0.5';
      lineEl.style.display = 'flex';
      lineEl.style.alignItems = 'center';
      lineEl.style.justifyContent = 'center';
      lineEl.style.whiteSpace = 'nowrap';
      lineEl.innerHTML = l.label ? `${l.px}px - ${l.label}` : `${l.px}px`;
      elements.push(lineEl);
      containerRef?.current?.append(lineEl);
    });

    return () => {
      elements.forEach(c => containerRef?.current?.removeChild(c));
      elements = [];
    }
  });

  return <div ref={containerRef} style={containerStyle}>
    {children}
  </div>;
}