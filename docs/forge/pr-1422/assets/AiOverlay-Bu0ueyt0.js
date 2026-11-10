import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnEL0lHT.js";import{n as c,t as l}from"./CustomArgTypes-CbY-ITnm.js";import{n as u,r as d,t as f}from"./AiOverlay.stories-B7mYkuGg.js";function p(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:f}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsxs)(n.p,{children:[`A low-level building block that shows content in the browser's top layer, positioned next to an anchor element. It has no styling of its own. For most cases use `,(0,h.jsx)(n.a,{href:`?path=/docs/ai-components-primitives-popover--docs`,children:(0,h.jsx)(n.code,{children:`forge-ai-popover`})}),` or `,(0,h.jsx)(n.a,{href:`?path=/docs/ai-components-primitives-tooltip--docs`,children:(0,h.jsx)(n.code,{children:`forge-ai-tooltip`})}),`, which are built on it. Use the overlay directly only when you need custom positioned content.`]}),`
`,(0,h.jsxs)(n.p,{children:[`It is exported from `,(0,h.jsx)(n.code,{children:`@tylertech/forge-ai/core`}),`.`]}),`
`,(0,h.jsx)(a,{of:u}),`
`,(0,h.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,h.jsxs)(n.p,{children:[`Set `,(0,h.jsx)(n.code,{children:`anchor`}),` to the element to position against, and `,(0,h.jsx)(n.code,{children:`open`}),` to show or hide the overlay.`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-ts`,children:`import '@tylertech/forge-ai/core';

overlay.anchor = button;
overlay.placement = 'bottom-start';
overlay.open = true;
`})}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`placement`}),` is where the overlay sits relative to the anchor, such as `,(0,h.jsx)(n.code,{children:`top`}),`, `,(0,h.jsx)(n.code,{children:`bottom-start`}),` or `,(0,h.jsx)(n.code,{children:`right-end`}),`. It defaults to `,(0,h.jsx)(n.code,{children:`bottom-start`}),`.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`flip`}),` (on by default) moves the overlay to the opposite side when there is not enough room, and `,(0,h.jsx)(n.code,{children:`shift`}),` keeps it inside the viewport.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`offset`}),` moves the overlay away from the anchor. Pass a number, or an object with `,(0,h.jsx)(n.code,{children:`mainAxis`}),`, `,(0,h.jsx)(n.code,{children:`crossAxis`}),` and `,(0,h.jsx)(n.code,{children:`alignmentAxis`}),`.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`auto-size`}),` sets `,(0,h.jsx)(n.code,{children:`--ai-overlay-available-width`}),` and `,(0,h.jsx)(n.code,{children:`--ai-overlay-available-height`}),` so slotted content can shrink to fit the space available.`]}),`
`,(0,h.jsxs)(n.li,{children:[`With `,(0,h.jsx)(n.code,{children:`dismiss-mode="auto"`}),` (default) the overlay closes on an outside click or Escape. With `,(0,h.jsx)(n.code,{children:`manual`}),` it only closes when you set `,(0,h.jsx)(n.code,{children:`open`}),` to `,(0,h.jsx)(n.code,{children:`false`}),`.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`forge-ai-overlay-toggle`}),` fires when the overlay opens or closes, with `,(0,h.jsx)(n.code,{children:`open`}),`, `,(0,h.jsx)(n.code,{children:`newState`}),` and `,(0,h.jsx)(n.code,{children:`oldState`}),` in its detail.`]}),`
`]}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};