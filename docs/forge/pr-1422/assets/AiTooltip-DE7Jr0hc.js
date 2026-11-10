import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-Dp_o0sTV.js";import{n as c,t as l}from"./CustomArgTypes-_m-okSqZ.js";import{i as u,n as d,r as f,t as p}from"./AiTooltip.stories-BNkY78K9.js";function m(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s,{of:p}),`
`,(0,g.jsx)(o,{}),`
`,(0,g.jsxs)(n.p,{children:[`A short label that appears next to an element on hover or focus. Use it to name icon-only buttons or add a brief hint. It is built on `,(0,g.jsx)(n.a,{href:`?path=/docs/ai-components-primitives-overlay--docs`,children:(0,g.jsx)(n.code,{children:`forge-ai-overlay`})}),` and exported from `,(0,g.jsx)(n.code,{children:`@tylertech/forge-ai/core`}),`.`]}),`
`,(0,g.jsx)(a,{of:f}),`
`,(0,g.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,g.jsxs)(n.p,{children:[`Give the anchor element an `,(0,g.jsx)(n.code,{children:`id`}),` and point the tooltip at it with `,(0,g.jsx)(n.code,{children:`for`}),`. Set the content with `,(0,g.jsx)(n.code,{children:`text`}),`, or slot in markup instead.`]}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-html`,children:`<button id="save">Save</button>
<forge-ai-tooltip for="save" text="Save your changes"></forge-ai-tooltip>
`})}),`
`,(0,g.jsxs)(n.ul,{children:[`
`,(0,g.jsxs)(n.li,{children:[(0,g.jsx)(n.code,{children:`placement`}),` is where the tooltip sits relative to the anchor. It defaults to `,(0,g.jsx)(n.code,{children:`top`}),`, and the tooltip flips or shifts to stay in view.`]}),`
`,(0,g.jsxs)(n.li,{children:[(0,g.jsx)(n.code,{children:`trigger`}),` is `,(0,g.jsx)(n.code,{children:`hover`}),` (default), `,(0,g.jsx)(n.code,{children:`focus`}),`, `,(0,g.jsx)(n.code,{children:`click`}),` or `,(0,g.jsx)(n.code,{children:`manual`}),`. The default also shows on keyboard focus, and Escape closes an open tooltip.`]}),`
`,(0,g.jsxs)(n.li,{children:[(0,g.jsx)(n.code,{children:`delay`}),` (default 500ms) and `,(0,g.jsx)(n.code,{children:`hide-delay`}),` (default 0) control how long the tooltip waits before showing and hiding.`]}),`
`,(0,g.jsxs)(n.li,{children:[`Call `,(0,g.jsx)(n.code,{children:`show()`}),`, `,(0,g.jsx)(n.code,{children:`hide()`}),` or `,(0,g.jsx)(n.code,{children:`toggle()`}),`, or set `,(0,g.jsx)(n.code,{children:`open`}),`, to control it from code.`]}),`
`,(0,g.jsxs)(n.li,{children:[(0,g.jsx)(n.code,{children:`forge-ai-tooltip-toggle`}),` fires when the tooltip opens or closes, with `,(0,g.jsx)(n.code,{children:`open`}),`, `,(0,g.jsx)(n.code,{children:`newState`}),` and `,(0,g.jsx)(n.code,{children:`oldState`}),` in its detail.`]}),`
`]}),`
`,(0,g.jsx)(n.p,{children:`When closed, the tooltip content is hidden visually but remains available to screen readers.`}),`
`,(0,g.jsx)(a,{of:d}),`
`,(0,g.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,g.jsx)(l,{})]})}function h(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,g.jsx)(n,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;function _(){return(_=e((()=>{g=r(),n(),i(),c(),u()})))()}_();export{h as default};