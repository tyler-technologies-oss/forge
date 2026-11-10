import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-Dp_o0sTV.js";import{n as c,t as l}from"./CustomArgTypes-_m-okSqZ.js";import{i as u,n as d,r as f,t as p}from"./AiPopover.stories-1Zo4lQQ8.js";function m(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s,{of:p}),`
`,(0,g.jsx)(o,{}),`
`,(0,g.jsxs)(n.p,{children:[`A styled floating panel, with a shadow, rounded corners and an enter animation, that opens next to an anchor element. Use it for menus, forms and other small pieces of content that should appear on demand. It is built on `,(0,g.jsx)(n.a,{href:`?path=/docs/ai-components-primitives-overlay--docs`,children:(0,g.jsx)(n.code,{children:`forge-ai-overlay`})}),` and exported from `,(0,g.jsx)(n.code,{children:`@tylertech/forge-ai/core`}),`.`]}),`
`,(0,g.jsx)(a,{of:d}),`
`,(0,g.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,g.jsxs)(n.p,{children:[`Set `,(0,g.jsx)(n.code,{children:`anchor`}),` to the element to position against, and `,(0,g.jsx)(n.code,{children:`open`}),` to show or hide the popover. Slot in any content.`]}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-ts`,children:`import '@tylertech/forge-ai/core';

popover.anchor = button;
popover.open = true;
`})}),`
`,(0,g.jsxs)(n.ul,{children:[`
`,(0,g.jsxs)(n.li,{children:[(0,g.jsx)(n.code,{children:`placement`}),` is where the popover sits relative to the anchor. It defaults to `,(0,g.jsx)(n.code,{children:`bottom-start`}),`.`]}),`
`,(0,g.jsxs)(n.li,{children:[(0,g.jsx)(n.code,{children:`flip`}),` and `,(0,g.jsx)(n.code,{children:`shift`}),` are off by default. Turn on `,(0,g.jsx)(n.code,{children:`flip`}),` to move the popover to the opposite side when it does not fit, and `,(0,g.jsx)(n.code,{children:`shift`}),` to keep it inside the viewport.`]}),`
`,(0,g.jsxs)(n.li,{children:[(0,g.jsx)(n.code,{children:`offset`}),` moves the popover away from the anchor. Pass a number, or an object with `,(0,g.jsx)(n.code,{children:`mainAxis`}),`, `,(0,g.jsx)(n.code,{children:`crossAxis`}),` and `,(0,g.jsx)(n.code,{children:`alignmentAxis`}),`.`]}),`
`,(0,g.jsxs)(n.li,{children:[(0,g.jsx)(n.code,{children:`arrow`}),` adds an arrow that points at the anchor.`]}),`
`,(0,g.jsxs)(n.li,{children:[`With `,(0,g.jsx)(n.code,{children:`dismiss-mode="auto"`}),` (default) the popover closes on an outside click or Escape. With `,(0,g.jsx)(n.code,{children:`manual`}),` it only closes when you set `,(0,g.jsx)(n.code,{children:`open`}),` to `,(0,g.jsx)(n.code,{children:`false`}),`.`]}),`
`,(0,g.jsxs)(n.li,{children:[(0,g.jsx)(n.code,{children:`forge-ai-popover-toggle`}),` fires when the popover opens or closes, with `,(0,g.jsx)(n.code,{children:`open`}),`, `,(0,g.jsx)(n.code,{children:`newState`}),` and `,(0,g.jsx)(n.code,{children:`oldState`}),` in its detail. The `,(0,g.jsx)(n.code,{children:`open`}),` property is kept in sync when the popover closes itself.`]}),`
`]}),`
`,(0,g.jsx)(a,{of:f}),`
`,(0,g.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,g.jsx)(l,{})]})}function h(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,g.jsx)(n,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;function _(){return(_=e((()=>{g=r(),n(),i(),c(),u()})))()}_();export{h as default};