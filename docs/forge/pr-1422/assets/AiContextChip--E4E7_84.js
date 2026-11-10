import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-Dp_o0sTV.js";import{n as c,t as l}from"./CustomArgTypes-_m-okSqZ.js";import{a as u,i as d,n as f,r as p,t as m}from"./AiContextChip.stories-BSJcbwH2.js";function h(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(s,{of:m}),`
`,(0,_.jsx)(o,{}),`
`,(0,_.jsxs)(n.p,{children:[`A small chip that shows one piece of context, such as a selected record or an attached file, that will be sent along with a prompt. Use `,(0,_.jsx)(n.a,{href:`?path=/docs/ai-components-input-context-context-items--docs`,children:(0,_.jsx)(n.code,{children:`forge-ai-context-items`})}),` to show a list of them.`]}),`
`,(0,_.jsx)(a,{of:f}),`
`,(0,_.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,_.jsx)(n.pre,{children:(0,_.jsx)(n.code,{className:`language-html`,children:`<forge-ai-context-chip id="file-1" label="quarterly-report.pdf" sublabel="2.4 MB" type="file"></forge-ai-context-chip>
`})}),`
`,(0,_.jsxs)(n.ul,{children:[`
`,(0,_.jsxs)(n.li,{children:[`Set `,(0,_.jsx)(n.code,{children:`type="file"`}),` for a document icon. Any other value uses the default context icon.`]}),`
`,(0,_.jsxs)(n.li,{children:[`The `,(0,_.jsx)(n.code,{children:`sublabel`}),` is secondary text after the label. It is replaced by a spinner while `,(0,_.jsx)(n.code,{children:`loading`}),` is set.`]}),`
`,(0,_.jsx)(n.li,{children:`Long labels are truncated, and the full label appears in a tooltip.`}),`
`]}),`
`,(0,_.jsx)(a,{of:p}),`
`,(0,_.jsx)(n.h3,{id:`removing`,children:`Removing`}),`
`,(0,_.jsxs)(n.p,{children:[`The remove button is shown unless `,(0,_.jsx)(n.code,{children:`removable`}),` is `,(0,_.jsx)(n.code,{children:`false`}),`. Clicking it fires `,(0,_.jsx)(n.code,{children:`forge-ai-context-chip-remove`}),` with the chip's `,(0,_.jsx)(n.code,{children:`id`}),` and a snapshot of its properties as `,(0,_.jsx)(n.code,{children:`item`}),`. The chip does not remove itself, so remove it from your own data in response to the event.`]}),`
`,(0,_.jsx)(n.pre,{children:(0,_.jsx)(n.code,{className:`language-ts`,children:`chip.addEventListener('forge-ai-context-chip-remove', evt => {
  console.log(evt.detail.id);
});
`})}),`
`,(0,_.jsx)(n.h3,{id:`loading`,children:`Loading`}),`
`,(0,_.jsx)(a,{of:d}),`
`,(0,_.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,_.jsx)(l,{})]})}function g(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,_.jsx)(n,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;function v(){return(v=e((()=>{_=r(),n(),i(),c(),u()})))()}v();export{g as default};