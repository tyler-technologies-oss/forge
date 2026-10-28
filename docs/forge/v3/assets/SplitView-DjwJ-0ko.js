import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-Byzp6JFn.js";import{n as c,t as l}from"./CustomArgTypes-QAslgvtG.js";import{n as u,r as d,t as f}from"./SplitView.stories-D2yndL8V.js";function p(e){let n={code:`code`,h2:`h2`,li:`li`,p:`p`,ul:`ul`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:u}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsxs)(n.p,{children:[`The split view component presents `,(0,h.jsx)(n.code,{children:`<forge-split-view-panel>`}),` elements side-by-side as resizable panels. This is useful in situations where a user may want to adjust how much screen space is devoted to part of the interface. For example, you could consider displaying a map or image viewer within a split view.`]}),`
`,(0,h.jsxs)(n.p,{children:[`A split view configuration typically consists of one or more `,(0,h.jsx)(n.code,{children:`resizable`}),` panels as well as at least one non-resizable panel. Resizable panels are defined by the resizable attribute, which can be set to `,(0,h.jsx)(n.code,{children:`'start'`}),` or `,(0,h.jsx)(n.code,{children:`'end'`}),` to reflect which direction they expand into. Non-resizable panels are not interactive on their own, but automatically expand to fill in the space left by their sibling panels.`]}),`
`,(0,h.jsxs)(n.p,{children:[`The split view panel component consists of two basic parts: its content, and a handle to resize it. Each handle is linked to its content by accessibility attributes, providing an accessible label and size information for assistive technology. The handle's position in relation to the content is determined by the `,(0,h.jsx)(n.code,{children:`resizable`}),` value. When it's '`,(0,h.jsx)(n.code,{children:`start'`}),` the handle appears before the content, or after the content when it's `,(0,h.jsx)(n.code,{children:`'end'`}),`.`]}),`
`,(0,h.jsx)(a,{of:f}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{}),`
`,(0,h.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[`Verify that all content slotted into a panel is responsive and can resize fluidly.`,`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[`If a panel's content is inaccessible under or over a certain size, be sure to set the `,(0,h.jsx)(n.code,{children:`min`}),` and `,(0,h.jsx)(n.code,{children:`max`}),` properties accordingly.`]}),`
`]}),`
`]}),`
`,(0,h.jsxs)(n.li,{children:[`Be sure to include a unique `,(0,h.jsx)(n.code,{children:`accessibleLabel`}),` property value for each panel that describes its content.`]}),`
`,(0,h.jsxs)(n.li,{children:[`If the user can close a panel, provide an easy way for them to reopen it.`,`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[`Set `,(0,h.jsx)(n.code,{children:`aria-controls`}),` and `,(0,h.jsx)(n.code,{children:`aria-expanded`}),` on the element that controls the open state.`]}),`
`]}),`
`]}),`
`]})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};