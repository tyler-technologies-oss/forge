import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnEL0lHT.js";import{n as c,t as l}from"./CustomArgTypes-CbY-ITnm.js";import{i as u,n as d,r as f,t as p}from"./AiToolCall.stories-CmtIbAId.js";function m(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s,{of:p}),`
`,(0,g.jsx)(o,{}),`
`,(0,g.jsxs)(n.p,{children:[`Renders the custom UI for a tool call. Give it a `,(0,g.jsx)(n.code,{children:`toolCall`}),` and the `,(0,g.jsx)(n.code,{children:`toolDefinition`}),` that describes the tool, and it displays that definition's `,(0,g.jsx)(n.code,{children:`renderer`}),`. Use it to show the result of a tool, such as a table or a map, in your own chat interface.`]}),`
`,(0,g.jsx)(a,{of:d}),`
`,(0,g.jsxs)(n.p,{children:[`It is exported from `,(0,g.jsx)(n.code,{children:`@tylertech/forge-ai/ai-tool-call`}),`.`]}),`
`,(0,g.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-ts`,children:`import '@tylertech/forge-ai/ai-tool-call';

const element = document.querySelector('forge-ai-tool-call');
element.toolDefinition = definition;
element.toolCall = toolCall;
`})}),`
`,(0,g.jsxs)(n.p,{children:[`Nothing is rendered when the tool definition has no `,(0,g.jsx)(n.code,{children:`renderer`}),`, or until the call is ready to show. A call is ready once its `,(0,g.jsx)(n.code,{children:`status`}),` is `,(0,g.jsx)(n.code,{children:`complete`}),`. Set `,(0,g.jsx)(n.code,{children:`renderOnStart: true`}),` on the definition to render while the call is still `,(0,g.jsx)(n.code,{children:`parsing`}),` or `,(0,g.jsx)(n.code,{children:`executing`}),`.`]}),`
`,(0,g.jsx)(a,{of:f}),`
`,(0,g.jsx)(n.h2,{id:`custom-renderers`,children:`Custom renderers`}),`
`,(0,g.jsxs)(n.p,{children:[`A tool's `,(0,g.jsx)(n.code,{children:`renderer`}),` is either a `,(0,g.jsx)(n.code,{children:`render`}),` function or the tag name of a custom element. Use `,(0,g.jsx)(n.code,{children:`createToolRenderer`}),` to build one.`]}),`
`,(0,g.jsxs)(n.p,{children:[(0,g.jsx)(n.strong,{children:`Function:`}),` return an element or fragment for the given tool call. It runs again when the `,(0,g.jsx)(n.code,{children:`toolCall`}),` or `,(0,g.jsx)(n.code,{children:`toolDefinition`}),` changes.`]}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-ts`,children:`import { createToolRenderer } from '@tylertech/forge-ai/ai-tool-call';

const getCurrentWeather = {
  name: 'getCurrentWeather',
  renderer: createToolRenderer({
    render: toolCall => {
      const element = document.createElement('p');
      element.textContent = \`\${toolCall.args.location}: \${toolCall.result?.condition}\`;
      return element;
    }
  })
};
`})}),`
`,(0,g.jsxs)(n.p,{children:[(0,g.jsx)(n.strong,{children:`Element:`}),` register a custom element and pass its tag. The tool call is assigned to its `,(0,g.jsx)(n.code,{children:`toolCall`}),` property, and the same element is updated in place as the call changes.`]}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-ts`,children:`const getCurrentWeather = {
  name: 'getCurrentWeather',
  renderer: createToolRenderer({ elementTag: 'my-weather-card' })
};
`})}),`
`,(0,g.jsxs)(n.p,{children:[`Type the element with `,(0,g.jsx)(n.code,{children:`IToolRenderer`}),` from `,(0,g.jsx)(n.code,{children:`@tylertech/forge-ai/types`}),` to declare the `,(0,g.jsx)(n.code,{children:`toolCall`}),` property.`]}),`
`,(0,g.jsx)(n.h3,{id:`built-in-renderers`,children:`Built-in renderers`}),`
`,(0,g.jsxs)(n.p,{children:[`Ready-made element renderers are available from `,(0,g.jsx)(n.code,{children:`@tylertech/forge-ai/tools`}),`:`]}),`
`,(0,g.jsxs)(n.ul,{children:[`
`,(0,g.jsx)(n.li,{children:(0,g.jsx)(n.a,{href:`?path=/docs/ai-components-tools-reasoning-tool-steps--docs`,children:`Tool Steps`})}),`
`,(0,g.jsx)(n.li,{children:(0,g.jsx)(n.a,{href:`?path=/docs/ai-components-tools-reasoning-data-table--docs`,children:`Data Table`})}),`
`]}),`
`,(0,g.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,g.jsx)(l,{})]})}function h(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,g.jsx)(n,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;function _(){return(_=e((()=>{g=r(),n(),i(),c(),u()})))()}_();export{h as default};