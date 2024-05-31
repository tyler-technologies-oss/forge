import{j as o}from"./jsx-runtime-DI3XmsCR.js";import{u as r}from"./index-CflxlLEm.js";import{M as n,T as s,C as p}from"./index-AWKMogpE.js";import{C as a}from"./CustomArgTypes-DsaaUzfp.js";import{P as c,D as l}from"./profile.stories-B0finey5.js";import"./iframe--Enx9szo.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./constants-CaaYAYhg.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./app-bar-profile-button-DrF4W9LF.js";import"./utils-_KxxXSob.js";import"./base-adapter-Cmik15XS.js";import"./state-layer-N_JMWZZ9.js";import"./focus-indicator-CdKfJ-GE.js";import"./index-Dh0vMUMR.js";import"./index-Co64lOVc.js";import"./icon-ZtLYap3k.js";import"./icon-button-CaFbApbt.js";import"./base-button-adapter-8-SDZ-0h.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-BQMwmQhD.js";import"./event-utils-CtHj37Lc.js";import"./tooltip-DlgtNMKO.js";import"./overlay-ClUFN0zg.js";import"./with-longpress-listener-CM31vaDW.js";import"./dismissible-stack-CQalC8SW.js";import"./badge-BSPvru8c.js";import"./menu-XcHRHUYW.js";import"./list-DK5vrFJV.js";import"./list-dropdown-aware-foundation-BYeNx1g0.js";import"./list-dropdown-BWqXgU7w.js";import"./linear-progress-DV1dgauc.js";import"./popover-Btr5MfHK.js";import"./skeleton-CqBX_3mC.js";import"./event-utils-C1SDeUaq.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-C_miPeVZ.js";import"./avatar-DQ-oKIiT.js";import"./button-zOfPl3up.js";import"./toolbar-i6ueUp2q.js";function i(e){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...e.components};return o.jsxs(o.Fragment,{children:[o.jsx(n,{of:c}),`
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
`]})]})}function io(e={}){const{wrapper:t}={...r(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(i,{...e})}):i(e)}export{io as default};
