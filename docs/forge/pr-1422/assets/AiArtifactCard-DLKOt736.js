import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-Dp_o0sTV.js";import{n as c,t as l}from"./CustomArgTypes-_m-okSqZ.js";import{a as u,i as d,n as f,o as p,r as m,t as h}from"./AiArtifactCard.stories-KLvXEpae.js";function g(e){let n={code:`code`,h2:`h2`,li:`li`,p:`p`,ul:`ul`,...t(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(s,{of:f}),`
`,(0,v.jsx)(o,{}),`
`,(0,v.jsx)(n.p,{children:`A compact, clickable card for something an agent produced, such as a query result, report or generated document. Use it in a conversation to let users open the artifact.`}),`
`,(0,v.jsxs)(n.p,{children:[`The card is presentational. Activating it emits `,(0,v.jsx)(n.code,{children:`forge-ai-artifact-card-open`}),` with the card's `,(0,v.jsx)(n.code,{children:`assetId`}),`, and your code decides what opens.`]}),`
`,(0,v.jsx)(a,{of:d}),`
`,(0,v.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,v.jsxs)(n.ul,{children:[`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`title-text`}),` and `,(0,v.jsx)(n.code,{children:`subtitle-text`}),` each truncate to one line.`]}),`
`,(0,v.jsxs)(n.li,{children:[`Slot an `,(0,v.jsx)(n.code,{children:`icon`}),` to replace the default artifact glyph.`]}),`
`,(0,v.jsxs)(n.li,{children:[`For several results at once, place cards in a `,(0,v.jsx)(n.code,{children:`forge-ai-artifact-card-group`}),`.`]}),`
`]}),`
`,(0,v.jsx)(n.h2,{id:`active-state`,children:`Active state`}),`
`,(0,v.jsxs)(n.p,{children:[`Set `,(0,v.jsx)(n.code,{children:`active`}),` on the card for the artifact currently being viewed. It gets an accent border and ring, and its arrow hides since there is nothing left to open. You control when a card is active.`]}),`
`,(0,v.jsx)(a,{of:h}),`
`,(0,v.jsx)(n.h2,{id:`collapsing-on-a-second-activation`,children:`Collapsing on a second activation`}),`
`,(0,v.jsxs)(n.p,{children:[`An active card still emits `,(0,v.jsx)(n.code,{children:`forge-ai-artifact-card-open`}),`, so you can treat a second activation as "collapse". Set `,(0,v.jsx)(n.code,{children:`action-label`}),` so assistive technology hears what activation now does, and slot an `,(0,v.jsx)(n.code,{children:`action-icon`}),`, which stays visible while active.`]}),`
`,(0,v.jsx)(a,{of:m}),`
`,(0,v.jsx)(n.h2,{id:`distinguishing-card-types`,children:`Distinguishing card types`}),`
`,(0,v.jsx)(n.p,{children:`When you render more than one kind of artifact, lead the subtitle with the type ("Report · 4 charts"). The icon is decorative, so the subtitle is the only place the type reaches screen reader users.`}),`
`,(0,v.jsx)(a,{of:u}),`
`,(0,v.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,v.jsx)(l,{}),`
`,(0,v.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,v.jsxs)(n.ul,{children:[`
`,(0,v.jsxs)(n.li,{children:[`The whole card is one native `,(0,v.jsx)(n.code,{children:`<button>`}),`. Its accessible name is the card text, with `,(0,v.jsx)(n.code,{children:`action-label`}),` appended when set.`]}),`
`,(0,v.jsxs)(n.li,{children:[`The icon and action glyph are `,(0,v.jsx)(n.code,{children:`aria-hidden`}),`.`]}),`
`,(0,v.jsxs)(n.li,{children:[`The active card sets `,(0,v.jsx)(n.code,{children:`aria-current="true"`}),`; visually it also gets the outer ring, not just a color change.`]}),`
`]})]})}function _(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,v.jsx)(n,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;function y(){return(y=e((()=>{v=r(),n(),i(),c(),p()})))()}y();export{_ as default};