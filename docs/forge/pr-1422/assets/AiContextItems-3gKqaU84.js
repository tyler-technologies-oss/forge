import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnEL0lHT.js";import{n as c,t as l}from"./CustomArgTypes-CbY-ITnm.js";import{i as u,n as d,r as f,t as p}from"./AiContextItems.stories-BCjc3BG2.js";function m(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...t(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s,{of:p}),`
`,(0,g.jsx)(o,{}),`
`,(0,g.jsxs)(n.p,{children:[`A wrapping row of `,(0,g.jsx)(n.a,{href:`?path=/docs/ai-components-input-context-context-chip--docs`,children:(0,g.jsx)(n.code,{children:`forge-ai-context-chip`})}),` elements. Use it to show the records and files that will be sent as context with a prompt.`]}),`
`,(0,g.jsx)(a,{of:d}),`
`,(0,g.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,g.jsxs)(n.p,{children:[`Set the `,(0,g.jsx)(n.code,{children:`items`}),` property to an array of context items. The component renders nothing when the array is empty.`]}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-ts`,children:`import '@tylertech/forge-ai/ai-context-items';
import type { ContextItem } from '@tylertech/forge-ai/types';

const element = document.querySelector('forge-ai-context-items');
element.items = [
  { id: 'case-1', label: 'Case CASE-123' },
  { id: 'file-1', label: 'quarterly-report.pdf', sublabel: '2.4 MB', type: 'file' }
] satisfies ContextItem[];
`})}),`
`,(0,g.jsxs)(n.p,{children:[`Each item takes an `,(0,g.jsx)(n.code,{children:`id`}),` and `,(0,g.jsx)(n.code,{children:`label`}),`, plus optional `,(0,g.jsx)(n.code,{children:`sublabel`}),`, `,(0,g.jsx)(n.code,{children:`type`}),` (`,(0,g.jsx)(n.code,{children:`'file'`}),` or `,(0,g.jsx)(n.code,{children:`'context'`}),`), `,(0,g.jsx)(n.code,{children:`loading`}),`, and `,(0,g.jsx)(n.code,{children:`removable`}),` (defaults to `,(0,g.jsx)(n.code,{children:`true`}),`). See the chip for how each is displayed.`]}),`
`,(0,g.jsx)(a,{of:f}),`
`,(0,g.jsx)(n.h3,{id:`removing`,children:`Removing`}),`
`,(0,g.jsxs)(n.p,{children:[`Clicking a remove button fires `,(0,g.jsx)(n.code,{children:`forge-ai-context-items-remove`}),` with the item's `,(0,g.jsx)(n.code,{children:`id`}),` and the `,(0,g.jsx)(n.code,{children:`item`}),`. The list does not remove anything itself, so assign a new `,(0,g.jsx)(n.code,{children:`items`}),` array without that item.`]}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-ts`,children:`element.addEventListener('forge-ai-context-items-remove', evt => {
  element.items = element.items.filter(item => item.id !== evt.detail.id);
});
`})}),`
`,(0,g.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,g.jsx)(l,{})]})}function h(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,g.jsx)(n,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;function _(){return(_=e((()=>{g=r(),n(),i(),c(),u()})))()}_();export{h as default};