import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnEL0lHT.js";import{n as c,t as l}from"./CustomArgTypes-CbY-ITnm.js";import{i as u,n as d,r as f,t as p}from"./AiDisclaimer.stories-B3l8H-xB.js";function m(e){let n={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...t(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s,{of:p}),`
`,(0,g.jsx)(o,{}),`
`,(0,g.jsx)(n.p,{children:`A panel for terms of service, privacy notices, or other disclosures that the user must accept before continuing. It shows scrollable content with an optional icon and a pinned footer with Agree and Disagree buttons.`}),`
`,(0,g.jsx)(a,{of:f}),`
`,(0,g.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,g.jsx)(n.p,{children:`Place the disclosure content in the default slot and handle the agree and disagree events. It works well inside a dialog or sidebar to gate access to an assistant.`}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-html`,children:`<forge-ai-disclaimer>
  <svg slot="icon" viewBox="0 0 24 24"><!-- icon path --></svg>
  <h2>Terms of Service</h2>
  <p>By using this AI assistant, you agree to our terms...</p>
</forge-ai-disclaimer>
`})}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-js`,children:`const disclaimer = document.querySelector('forge-ai-disclaimer');
disclaimer.addEventListener('forge-ai-disclaimer-agree', () => {
  /* grant access */
});
disclaimer.addEventListener('forge-ai-disclaimer-disagree', () => {
  /* dismiss */
});
`})}),`
`,(0,g.jsx)(n.h3,{id:`custom-button-text`,children:`Custom button text`}),`
`,(0,g.jsxs)(n.p,{children:[`Use the `,(0,g.jsx)(n.code,{children:`agree-button-text`}),` and `,(0,g.jsx)(n.code,{children:`disagree-button-text`}),` slots to replace the default labels.`]}),`
`,(0,g.jsx)(a,{of:d}),`
`,(0,g.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,g.jsx)(l,{})]})}function h(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,g.jsx)(n,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;function _(){return(_=e((()=>{g=r(),n(),i(),c(),u()})))()}_();export{h as default};