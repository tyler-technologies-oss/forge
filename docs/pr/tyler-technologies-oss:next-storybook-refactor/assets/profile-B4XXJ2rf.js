import{j as o}from"./jsx-runtime-crLg0hz4.js";import{u as r}from"./index-CZ2QFZCc.js";import{M as n,T as s,C as p}from"./index-KlXqu8cq.js";import{C as a}from"./CustomArgTypes-3ju-zpvx.js";import{P as c,D as l}from"./profile.stories-DP6e2H0r.js";import"./iframe-C_2JhCym.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./constants-CYeMfgsl.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./app-bar-profile-button-B0TiQh2k.js";import"./utils-_KxxXSob.js";import"./base-adapter-BhMU2jjH.js";import"./state-layer-02o5UE3p.js";import"./focus-indicator-Cam4qI9V.js";import"./index-Dh0vMUMR.js";import"./index-Dd7dh6lc.js";import"./icon-Cl4LFQNy.js";import"./icon-button-DHRKLwKL.js";import"./base-button-adapter-By6KisQg.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-HK1DN-B0.js";import"./event-utils-gODbtzKd.js";import"./tooltip-COJUfLm7.js";import"./overlay-Dg3gyJj4.js";import"./with-longpress-listener-C7tRQ3Nu.js";import"./dismissible-stack-DXt6aUkq.js";import"./badge-Da6Drx_1.js";import"./menu-CYy-Hi3i.js";import"./list-AKznUQR6.js";import"./list-dropdown-aware-foundation-BJh0PPyV.js";import"./list-dropdown-DI0wnNC6.js";import"./linear-progress-Cj7EgNE2.js";import"./popover-BYOA7f1d.js";import"./skeleton-DlZvZ332.js";import"./event-utils-C1SDeUaq.js";import"./a11y-BxM9_46k.js";import"./profile-card-BdBFdg5g.js";import"./base-component-delegate-BqwlC0a7.js";import"./button-Cmiqf2xE.js";import"./avatar-ByAsihq0.js";import"./toolbar-HMjG0A1I.js";function i(e){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...e.components};return o.jsxs(o.Fragment,{children:[o.jsx(n,{of:c}),`
`,o.jsx(s,{}),`
`,o.jsxs(t.p,{children:["For convenience Forge provides the ",o.jsx(t.code,{children:"<forge-app-bar-profile-button>"})," component. This component uses an icon-button (with a predefined avatar), and is responsible for displaying profile information within a popup. The power of this component is that it will ensure a consistent experience for users across all applications that consume it."]}),`
`,o.jsxs(t.p,{children:["If necessary, you can use the ",o.jsx(t.code,{children:"profileCardBuilder"})," API to provide custom content within the profile card popup."]}),`
`,o.jsxs(t.blockquote,{children:[`
`,o.jsx(t.p,{children:"It is expected that you place this component in the end slot of the app-bar for consistency and familiarity for users."}),`
`]}),`
`,o.jsx(t.h2,{id:"common",children:"Common"}),`
`,o.jsx(t.p,{children:"A common usage of the profile button will require you to provide some basic information about the user so that it can properly display the data in a familiar location for users. This information needs to be available prior to the user opening the popup."}),`
`,o.jsx(p,{of:l}),`
`,o.jsx(t.h2,{id:"custom-content",children:"Custom content"}),`
`,o.jsx(t.p,{children:"The profile card allows for custom content to be placed within its template. This is provided in the form of a callback that you can use to generate DOM that the component will render for you. You will need to use JavaScript to accomplish this."}),`
`,o.jsx(t.p,{children:"The following snippet demonstrates basic usage in vanilla JavaScript. You could alternatively dynamically created an Angular component for instance and return a reference to its host element to render within the profile card. Don't forget to clean up the element to avoid memory leaks in this scenario."}),`
`,o.jsx(t.pre,{children:o.jsx(t.code,{className:"language-typescript",children:`profileButton.profileCardBuilder = () => {
  const list = document.createElement('forge-list');
  // ...
  return list;
};
`})}),`
`,o.jsx(t.h2,{id:"api",children:"API"}),`
`,o.jsx(a,{}),`
`,o.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,o.jsxs(t.ul,{children:[`
`,o.jsx(t.li,{children:"The component will handle adding necessary ARIA attributes for you, as well as ensure the proper color contrast ratio is used."}),`
`]})]})}function ro(e={}){const{wrapper:t}={...r(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(i,{...e})}):i(e)}export{ro as default};
