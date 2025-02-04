import{j as o,M as n,T as s,C as p}from"./index-DBhTbI0y.js";import{useMDXComponents as r}from"./index-Do3tYoey.js";import{C as a}from"./CustomArgTypes-Cv9wjJy1.js";import{P as c,D as l}from"./profile.stories-CKaqLd1M.js";import"./iframe-WnRvxJSZ.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-dxGSIiWA.js";import"./chunk-D5ZWXAHU-CGElDDNX.js";import"./v4-CQkTLCs1.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./feature-detection-ONR9WHvu.js";import"./app-bar-profile-button-Bso0FNWk.js";import"./constants-BjnHqKgS.js";import"./base-adapter-CQdYccXX.js";import"./focus-indicator-I_IrwQSK.js";import"./index-BgGCUUFB.js";import"./state-layer-CxIpCmDW.js";import"./index-CbZAylpk.js";import"./icon-Ctzrqx63.js";import"./icon-button-D5fTQ0k5.js";import"./base-button-adapter-BUcmIwIL.js";import"./with-label-aware-DAaZnhel.js";import"./with-default-aria-BcIvJ7-x.js";import"./a11y-utils-BOPvdiVn.js";import"./tooltip-CTpoJPTH.js";import"./overlay-D8lPnEIG.js";import"./with-longpress-listener-S3ft74cg.js";import"./dismissible-stack-Dx1UJAF9.js";import"./badge-CzgFSHGZ.js";import"./menu-C6Z4JBtb.js";import"./list-DjbLwyYT.js";import"./list-dropdown-aware-core-BdubphoD.js";import"./list-dropdown-D4ar2DiO.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-DPUjJFYN.js";import"./popover-C6QnYMTq.js";import"./skeleton-Dfdgg-pt.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-D9tVS5jC.js";import"./avatar-Du1LPt_G.js";import"./button-ClwhnaJK.js";import"./toolbar-Lhya2ayG.js";function i(e){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...e.components};return o.jsxs(o.Fragment,{children:[o.jsx(n,{of:c}),`
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
