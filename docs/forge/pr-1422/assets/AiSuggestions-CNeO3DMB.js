import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-Dp_o0sTV.js";import{n as c,t as l}from"./CustomArgTypes-_m-okSqZ.js";import{n as u,r as d,t as f}from"./AiSuggestions.stories-DbCsNBV4.js";function p(e){let n={code:`code`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:f}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsxs)(n.p,{children:[`A list of suggested prompts the user can pick from, such as on an empty chat. Pass `,(0,h.jsx)(n.code,{children:`suggestions`}),` as `,(0,h.jsx)(n.code,{children:`{ text, value }`}),` objects and listen for `,(0,h.jsx)(n.code,{children:`forge-ai-suggestions-select`}),`. The event detail carries the chosen `,(0,h.jsx)(n.code,{children:`text`}),` and `,(0,h.jsx)(n.code,{children:`value`}),`.`]}),`
`,(0,h.jsx)(a,{of:u}),`
`,(0,h.jsxs)(n.p,{children:[`Use `,(0,h.jsx)(n.code,{children:`variant="inline"`}),` for a single scrolling row, or `,(0,h.jsx)(n.code,{children:`variant="block"`}),` for a stacked list. Text that doesn't fit is truncated and shown in a tooltip.`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-ts`,children:`suggestions.suggestions = [{ text: 'Summarize a document', value: 'summarize' }];
suggestions.addEventListener('forge-ai-suggestions-select', evt => {
  const { text, value } = evt.detail;
});
`})}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};