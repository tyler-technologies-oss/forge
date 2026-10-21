import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-BjnIcTYW.js";import{n as c,t as l}from"./CustomArgTypes-DROUQxDe.js";import{a as u,i as d,n as f,r as p,t as m}from"./Popover.stories-CduzodYJ.js";function h(e){let n={code:`code`,h2:`h2`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(s,{of:d}),`
`,(0,_.jsx)(o,{}),`
`,(0,_.jsx)(n.p,{children:`Popovers are used to display content on top of other content. They are used to show additional information related to the content that is currently
displayed on the screen, and is typically anchored to a specific element or area on the screen that triggered it to open.`}),`
`,(0,_.jsx)(a,{of:m}),`
`,(0,_.jsx)(n.h2,{id:`semantics`,children:`Semantics`}),`
`,(0,_.jsx)(n.p,{children:`Popovers do not have any semantic meaning by default. This means that it's up to the developer to ensure that the content inside the popover is
accessible if it needs to be. This can be done by adding the appropriate ARIA attributes to the popover itself, or the content within it.`}),`
`,(0,_.jsx)(n.h2,{id:`popovers-vs-dialogs`,children:`Popovers vs Dialogs`}),`
`,(0,_.jsx)(n.p,{children:`There is a lot of overlap between popovers and dialogs, and it can be difficult to know when to use one over the other. Here are some guidelines to help
you decide:`}),`
`,(0,_.jsxs)(n.ul,{children:[`
`,(0,_.jsxs)(n.li,{children:[(0,_.jsx)(n.strong,{children:`Popovers`}),` are used to display additional information related to the content that is currently displayed on the screen. They are typically anchored to
a specific element or area on the screen. Popovers are transient and non-modal, meaning that they do not block the user from interacting with the rest
of the page.`]}),`
`,(0,_.jsxs)(n.li,{children:[(0,_.jsx)(n.strong,{children:`Dialogs`}),` are used to display content that requires the user's immediate attention. They are typically modal (but can be non-modal), meaning that they
block the user from interacting with the rest of the page until they are dismissed. Dialogs are typically used for things like confirmation messages,
alerts, and forms.`]}),`
`]}),`
`,(0,_.jsx)(n.p,{children:`There are some cases where you may need to blur these lines a bit (and you can use either component), especially if the design of your application calls
for it. Just be sure to consider the user experience and accessibility implications.`}),`
`,(0,_.jsx)(n.h2,{id:`non-modal-popoverdialog`,children:`Non-modal Popover/Dialog`}),`
`,(0,_.jsxs)(n.p,{children:[`If you need to create a popover that behaves like a dialog (i.e. it is non-modal and does not block the user from interacting with the rest of the page),
you can use the `,(0,_.jsx)(n.code,{children:`<forge-popover>`}),` and add the proper ARIA attributes to make it behave like a dialog.`]}),`
`,(0,_.jsx)(a,{of:p}),`
`,(0,_.jsxs)(n.p,{children:[`In this example, the popover is presented with the `,(0,_.jsx)(n.code,{children:`role="dialog"`}),` and `,(0,_.jsx)(n.code,{children:`aria-modal="false"`}),` attributes. This tells screen readers that the popover is a
dialog, but it is not modal. This specific example will gracefully handle user entry into a form, by ensuring that the user does not lose valuable data
by accidentally closing the popover.`]}),`
`,(0,_.jsx)(n.h2,{id:`distinct-popovers`,children:`Distinct Popovers`}),`
`,(0,_.jsxs)(n.p,{children:[`In some cases, typically when using the `,(0,_.jsx)(n.code,{children:`"hover"`}),` trigger type, you may want to ensure that the popover is distinct from other popovers on the page meaning
that it can be the only popover within a specific group that is open at a time. This can be achieved by using the `,(0,_.jsx)(n.code,{children:`distinct`}),` attribute on
the `,(0,_.jsx)(n.code,{children:`<forge-popover>`}),` element. While you can use the `,(0,_.jsx)(n.code,{children:`distinct`}),` attribute on any popover, this will cause it to use a "default" group. It is most commonly
used with a specific name or group to scope the distinct behavior to a specific set of popovers.`]}),`
`,(0,_.jsx)(a,{of:f}),`
`,(0,_.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,_.jsx)(l,{})]})}function g(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,_.jsx)(n,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;function v(){return(v=e((()=>{_=r(),n(),i(),c(),u()})))()}v();export{g as default};