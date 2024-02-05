# Forge Style Guide

## SCSS

### Ordering declarations

Group related style declarations together with empty lines between groups to enhance the clarity of styles. Follow this ordering whenever possible.

1. **SASS Inheritance**
   - `@extend`
   - `@mixin`
2. **Generated Content**
   - `content`
3. **Position and Layout**
   - `position`
   - `z-index`
   - `inset` / `top`, `bottom`, `left`, `right`
   - `Flexbox properties`
   - `float`
   - `clear`
4. **Display and Visibility**
   - `display`
   - `opacity`
   - `transform`
5. **Overflow and Clip**
   - `overflow`
   - `clip`
6. **Animation**
   - `animation`
   - `transition`
7. **Box Model (from outside in)**
   - `margin`
   - `box-shadow`
   - `border`
   - `border-radius`
   - `box-sizing`
   - `width` / `inline-size`
   - `height` / `block-size`
   - `padding`
8. **Background**
   - `background`
   - `cursor`
9. **Typography**
   - `font-size`
   - `line-height`
   - `font-family`
   - `font-weight`
   - `font-style`
   - `text-align`
   - `text-transform`
   - `word-spacing`
   - `color`
10. **Pseudo-Classes and Pseudo-Elements (nested rules)**
    - `:hover`
    - `:focus`
    - `:active`
    - `:before`
    - `:after`
    - `:first-child`
    - `:last-child`

Adapted from [9Elements](https://9elements.com/css-rule-order/)

### Concentric ordering

#### Concentric-CSS-Overview {
  display: ;    /* Directions about where and how the box is placed */
  position: ;
  float: ;
  clear: ;

  visibility: ; /* Next: can the box be seen? */
  opacity: ;
  z-index: ;

  margin: ;     /* Layers of the box model, from outside to inside */
  outline: ;
  border: ;
  background: ; /* (padding and content BOTH get the background color) */
  padding: ;

  width: ;      /* Content dimensions and scrollbars */
  height: ;
  overflow: ;

  color: ;      /* Textual content */
  text: ;
  font: ;
}

#### Concentric-CSS-Complete {
  /* All CSS properties, in roughly the order I use when being careful */

  /* all */
  all: ;

  /* box-sizing */
  /* [content-box|border-box|inherit|initial|unset]*/ ;
  box-sizing: ;

  /* position */
  display: ;
  position: ;
  top: ;
  right: ;
  bottom: ;
  left: ;

  /* float */
  float: ;
  clear: ;

  /* flex */
  flex: ;
  flex-basis: ;
  flex-direction: ;
  flex-flow: ;
  flex-grow: ;
  flex-shrink: ;
  flex-wrap: ;

  /* grid */
  grid: ;
  grid-area: ;
  grid-template: ;
  grid-template-areas: ;
  grid-template-rows: ;
  grid-template-columns: ;
  grid-row: ;
  grid-row-start: ;
  grid-row-end: ;
  grid-column: ;
  grid-column-start: ;
  grid-column-end: ;
  grid-auto-rows: ;
  grid-auto-columns: ;
  grid-auto-flow: ;
  grid-gap: ;
  grid-row-gap: ;
  grid-column-gap: ;

  /* align-content */
  align-content: ;
  align-items: ;
  align-self: ;

  /* justify-content */
  justify-content: ;
  justify-items: ;
  justify-self: ;

  /* order */
  order: ;

  /* columns */
  columns: ;
  column-gap: ;
  column-fill: ;
  column-rule: ;
  column-rule-width: ;
  column-rule-style: ;
  column-rule-color: ;
  column-span: ;
  column-count: ;
  column-width: ;

  /* transform */
  backface-visibility: ;
  perspective: ;
  perspective-origin: ;
  transform: ;
  transform-origin: ;
  transform-style: ;

  /* transitions */
  transition: ;
  transition-delay: ;
  transition-duration: ;
  transition-property: ;
  transition-timing-function: ;

  /* visibility */
  visibility: ;
  opacity: ;
  z-index: ;

  /* margin */
  margin: ;
  margin-top: ;
  margin-right: ;
  margin-bottom: ;
  margin-left: ;

  /* outline */
  outline: ;
  outline-offset: ;
  outline-width: ;
  outline-style: ;
  outline-color: ;

  /* border */
  border: ;
  border-top: ;
  border-right: ;
  border-bottom: ;
  border-left: ;
  border-width: ;
  border-top-width: ;
  border-right-width: ;
  border-bottom-width: ;
  border-left-width: ;

  /* border-style */
  border-style: ;
  border-top-style: ;
  border-right-style: ;
  border-bottom-style: ;
  border-left-style: ;

  /* border-radius */
  border-radius: ;
  border-top-left-radius: ;
  border-top-right-radius: ;
  border-bottom-left-radius: ;
  border-bottom-right-radius: ;

  /* border-color */
  border-color: ;
  border-top-color: ;
  border-right-color: ;
  border-bottom-color: ;
  border-left-color: ;

  /* border-image */
  border-image: ;
  border-image-source: ;
  border-image-width: ;
  border-image-outset: ;
  border-image-repeat: ;
  border-image-slice: ;

  /* box-shadow */
  box-shadow: ;

  /* background */
  background: ;
  background-attachment: ;
  background-clip: ;
  background-color: ;
  background-image: ;
  background-origin: ;
  background-position: ;
  background-repeat: ;
  background-size: ;

  /* cursor */
  cursor: ;

  /* padding */
  padding: ;
  padding-top: ;
  padding-right: ;
  padding-bottom: ;
  padding-left: ;

  /* width */
  width: ;
  min-width: ;
  max-width: ;

  /* height */
  height: ;
  min-height: ;
  max-height: ;

  /* overflow */
  overflow: ;
  overflow-x: ;
  overflow-y: ;
  resize: ;

  /* list-style */
  list-style: ;
  list-style-type: ;
  list-style-position: ;
  list-style-image: ;
  caption-side: ;

  /* tables */
  table-layout: ;
  border-collapse: ;
  border-spacing: ;
  empty-cells: ;

  /* animation */
  /* animation-[[name] [duration] [timing-function] [delay] [iteration-count] [direction] [fill-mode] [play-state]]*/
  animation: ;
  animation-name: ;
  animation-duration: ;
  animation-timing-function: ;
  animation-delay: ;
  animation-iteration-count: ;
  animation-direction: ;
  animation-fill-mode: ;
  animation-play-state: ;

  /* vertical-alignment */
  vertical-align: ;

  /* text-alignment & decoration */
  direction: ;
  tab-size: ;
  text-align: ;
  text-align-last: ;
  text-justify: ;
  text-indent: ;
  text-transform: ;
  text-decoration: ;
  text-decoration-color: ;
  text-decoration-line: ;
  text-decoration-style: ;
  text-rendering: ;
  text-shadow: ;
  text-overflow: ;

  /* text-spacing */
  line-height: ;
  word-spacing: ;
  letter-spacing: ;
  white-space: ;
  word-break: ;
  word-wrap: ;
  color: ;

  /* font */
  font: ;
  font-family: ;
  font-size: ;
  font-size-adjust: ;
  font-stretch: ;
  font-weight: ;
  font-smoothing: ;
  osx-font-smoothing: ;
  font-variant: ;
  font-style: ;

  /* content */
  content: ;
  quotes: ;

  /* counters */
  counter-reset: ;
  counter-increment: ;

  /* breaks */
  page-break-before: ;  /* [NOTE]: to be changed for <tt>break-[before|after]</tt>; */
  page-break-after: ;
  page-break-inside: ;

  Adapted from [Concentric-CSS](https://github.com/brandon-rhodes/Concentric-CSS)
