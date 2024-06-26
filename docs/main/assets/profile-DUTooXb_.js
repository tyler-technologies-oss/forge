import{j as o}from"./jsx-runtime-BOxXCiH9.js";import{u as r}from"./index-DuPH5XzU.js";import{M as n,T as s,C as p}from"./index-DqH3OTA9.js";import{C as a}from"./CustomArgTypes-G8i2MET4.js";import{P as c,D as l}from"./profile.stories-IH5DOuiN.js";import"./iframe-Dl2z-e7R.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./utils-Dtr3SQvK.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./constants-ngK8be3i.js";import"./app-bar-profile-button-DfQ-kIqS.js";import"./base-adapter-uOfGA2wD.js";import"./focus-indicator-C4Z5XP1c.js";import"./index-Dh0vMUMR.js";import"./state-layer-BisR_hRI.js";import"./index-CIZ3m0iD.js";import"./icon-DHVNhAh1.js";import"./icon-button-DNIpFQC2.js";import"./base-button-adapter-DTaQearl.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-Bw3nCsY-.js";import"./tooltip-FbyHcKsY.js";import"./overlay-D7ruZE35.js";import"./with-longpress-listener-CJlfUm7c.js";import"./dismissible-stack-jVokvGcY.js";import"./badge-BZranFcT.js";import"./menu-B33KPFUT.js";import"./list-w9uxrOZD.js";import"./list-dropdown-aware-core-Ds6ig2oG.js";import"./list-dropdown-CY0Yj7Hn.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-5Vpr-9_G.js";import"./popover-CnzyzWS6.js";import"./skeleton-Cvltx7WE.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-M6o0GgAf.js";import"./avatar-CwCdFbd4.js";import"./button-GqT3ELiS.js";import"./toolbar-tzLxhWM8.js";function i(e){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...e.components};return o.jsxs(o.Fragment,{children:[o.jsx(n,{of:c}),`
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
`]})]})}function eo(e={}){const{wrapper:t}={...r(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(i,{...e})}):i(e)}export{eo as default};
