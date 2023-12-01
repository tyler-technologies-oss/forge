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
