import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnEL0lHT.js";import{n as c,t as l}from"./CustomArgTypes-CbY-ITnm.js";import{a as u,i as d,n as f,r as p,t as m}from"./AiFilePicker.stories-Dqs-x4pw.js";function h(e){let n={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...t(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(s,{of:m}),`
`,(0,_.jsx)(o,{}),`
`,(0,_.jsx)(n.p,{children:`A button that lets the user choose files to upload, either through the file dialog or by dropping files onto it. Use it to add attachments to a prompt or conversation. It validates each file and reports the result with events, and your app handles the files.`}),`
`,(0,_.jsx)(a,{of:p}),`
`,(0,_.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,_.jsx)(n.pre,{children:(0,_.jsx)(n.code,{className:`language-html`,children:`<forge-ai-file-picker accept=".pdf,.txt" multiple></forge-ai-file-picker>
`})}),`
`,(0,_.jsx)(n.h3,{id:`events`,children:`Events`}),`
`,(0,_.jsxs)(n.p,{children:[(0,_.jsx)(n.code,{children:`forge-ai-file-picker-change`}),` fires once for each accepted file. Its detail is `,(0,_.jsx)(n.code,{children:`{ file, timestamp }`}),`, where `,(0,_.jsx)(n.code,{children:`file`}),` is the `,(0,_.jsx)(n.code,{children:`File`}),` and `,(0,_.jsx)(n.code,{children:`timestamp`}),` is when it was selected. Without `,(0,_.jsx)(n.code,{children:`multiple`}),`, only the first file from a selection or drop is considered.`]}),`
`,(0,_.jsxs)(n.p,{children:[(0,_.jsx)(n.code,{children:`forge-ai-file-picker-error`}),` fires for each rejected file. Its detail is `,(0,_.jsx)(n.code,{children:`{ type, message, filename }`}),`, where `,(0,_.jsx)(n.code,{children:`type`}),` is `,(0,_.jsx)(n.code,{children:`'size'`}),` (over `,(0,_.jsx)(n.code,{children:`maxSize`}),`) or `,(0,_.jsx)(n.code,{children:`'duplicate'`}),` (the name is in `,(0,_.jsx)(n.code,{children:`selectedFiles`}),`).`]}),`
`,(0,_.jsxs)(n.p,{children:[`The picker does not track what has been chosen. Pass the names you have already accepted to `,(0,_.jsx)(n.code,{children:`selectedFiles`}),` to have repeats rejected.`]}),`
`,(0,_.jsx)(n.h3,{id:`variants`,children:`Variants`}),`
`,(0,_.jsxs)(n.p,{children:[`The default `,(0,_.jsx)(n.code,{children:`icon-button`}),` variant shows a plus icon with an "Add file(s)" tooltip. Use the `,(0,_.jsx)(n.code,{children:`icon`}),` slot to replace the icon. The `,(0,_.jsx)(n.code,{children:`button`}),` variant shows a text button and uses the default slot for its label.`]}),`
`,(0,_.jsx)(a,{of:f}),`
`,(0,_.jsx)(n.h3,{id:`restrictions`,children:`Restrictions`}),`
`,(0,_.jsxs)(n.p,{children:[(0,_.jsx)(n.code,{children:`accept`}),` limits the file types, and `,(0,_.jsx)(n.code,{children:`maxSize`}),` is in bytes (10 MB by default).`]}),`
`,(0,_.jsx)(a,{of:d}),`
`,(0,_.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,_.jsx)(l,{})]})}function g(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,_.jsx)(n,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;function v(){return(v=e((()=>{_=r(),n(),i(),c(),u()})))()}v();export{g as default};