import React, { CSSProperties, FC, MutableRefObject, useRef, useEffect } from "react";

export const RobotoAnatomy: FC = ({children}) => {
  const containerRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const ascenderLineRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const capHeightRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const xHeightRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const baselineRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const descenderLineRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;

  /**
   * for this component, font-family Roboto is assumed to be constant
   *
   * Before normalization.
   * based on 14px font-size
   * based on 15.3333px line-height
   * offset 1.9166625px
   *
   * top: values
   * ascenderLine           0
   * capHeight              0.55px
   * xHeight                3.05px
   * baseline               10.5px
   * descenderLine          13.45px
   * centerLine             6.725px
   * centerLineHeight       7.66665px
   *
   * center of line-height != center of typography
   * origin of typography is baseline
   *
   * depending on the font-family, offset will need to be applied by:
   * - move center line down by adding offset to scalars
   * - move center line up by subtracting offset from scalars
   * for Roboto the center line is down so we always add */

  const clipHeight = 15; // pixels. runtime inspected
  /**
   * all scalars were runtime inspected. values were normalized with this math function
   * scaler = lineElement.top / ( labelElement.line-height / clip-height ) */
  const scalars = {
    offset:         0.125, // based on storybook canvas zoom.
    ascenderLine:   0,
    capHeight:      0.035869643,
    xHeight:        0.198913476,
    baseline:       0.684784097,
    descenderLine:  0.87717582,
  };

  const renderLine = (div: HTMLDivElement, scalar: number, offset: number, color: string, label: string) => {
    div.style.top = (clipHeight * (scalar + offset)) + 'px';
    div.style.backgroundColor = color;
    div.innerHTML = label;
  }

  /**
   * Note: The calculation currently only works for 14px font-size. 
   * This is far from a perfect calculation, many issues with how it works.
   * There will be rounding errors, differences in browsers, and possibly OS's
   * To avoid rounding errors, try to keep your line-height in units of whole rem;
   * ie: 1rem 2rem 3rem 4rem; */
  const calculateOffset = (lineHeight: number): number => {
    const isClipping = lineHeight < clipHeight;
    const difference = lineHeight - clipHeight;
    const center = difference * 0.5;
    const centerScalar = center / clipHeight;
    const offset = isClipping
      ? scalars.offset
      : centerScalar + scalars.offset;
    return offset;
  }

  useEffect(() => {
    const lineHeight = parseFloat(getComputedStyle(containerRef?.current).lineHeight.slice(0, -2));
    const offset = calculateOffset(lineHeight);
    const innerColor = 'var(--mdc-theme-on-surface, #000000)';
    const outerColor = 'var(--mdc-theme-primary, rgba(0, 255, 255))';

    renderLine(ascenderLineRef.current, scalars.ascenderLine, offset, outerColor, 'ascender-line');
    renderLine(capHeightRef.current, scalars.capHeight, offset, innerColor, 'cap-height');
    renderLine(xHeightRef.current, scalars.xHeight, offset, innerColor, 'x-height');
    renderLine(baselineRef.current, scalars.baseline, offset, innerColor, 'baseline');
    renderLine(descenderLineRef.current, scalars.descenderLine, offset, outerColor, 'descender-line');
  });

  const containerStyle: CSSProperties = {
    display: 'inline-block',
    width: '100%'
  };

  const anatomyStyle: CSSProperties = {
    position: 'relative',
    left: '0',
    top: '0',
    right: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.125)'
  };

  const lineStyle: CSSProperties = {
    position: 'relative',
    left: '0',
    right: '0',
    width: '100%',
    height: '0.1px',
    fontSize: '1px',
    color: 'var(--mdc-theme-on-surface, #000000)',
    opacity: '0.75',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  };

  return <div ref={containerRef} style={containerStyle}>
    <div style={anatomyStyle}>
      <div style={lineStyle} ref={ascenderLineRef}></div>
      <div style={lineStyle} ref={capHeightRef}></div>
      <div style={lineStyle} ref={xHeightRef}></div>
      <div style={lineStyle} ref={baselineRef}></div>
      <div style={lineStyle} ref={descenderLineRef}></div>
    </div>
    <div style={anatomyStyle}>
      {children}
    </div>
  </div>;
}