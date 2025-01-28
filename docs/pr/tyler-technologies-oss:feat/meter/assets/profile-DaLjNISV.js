import{j as o,M as n,T as s,C as p}from"./index-Csoc5hMa.js";import{useMDXComponents as r}from"./index-BoSWM9Lc.js";import{C as a}from"./CustomArgTypes-L6kiB7Yq.js";import{P as c,D as l}from"./profile.stories-CnTxu2Cw.js";import"./iframe-Bi5wsXGt.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-CfUP_kYQ.js";import"./chunk-D5ZWXAHU-CGElDDNX.js";import"./v4-CQkTLCs1.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./feature-detection-ONR9WHvu.js";import"./app-bar-profile-button-CSm9dK8_.js";import"./constants-BjnHqKgS.js";import"./base-adapter-CQdYccXX.js";import"./focus-indicator-R2otSvsR.js";import"./index-BmocOEUj.js";import"./state-layer-B7GOb8iB.js";import"./index-ByifSpfC.js";import"./icon-B5S0VGIT.js";import"./icon-button-DipNuXsM.js";import"./base-button-adapter-OmzAW3c3.js";import"./with-label-aware-DAaZnhel.js";import"./with-default-aria-BcIvJ7-x.js";import"./a11y-utils-BOPvdiVn.js";import"./tooltip-D0ywHBAv.js";import"./overlay-DAcircNE.js";import"./with-longpress-listener-S3ft74cg.js";import"./dismissible-stack-9mJiid_W.js";import"./badge-CzgFSHGZ.js";import"./menu-C_FdmaDG.js";import"./list-CfkU0djA.js";import"./list-dropdown-aware-core-CaA2Y1xF.js";import"./list-dropdown-DebMMgrE.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-DPUjJFYN.js";import"./popover-Dq2OmXS_.js";import"./skeleton-Dfdgg-pt.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-D9tVS5jC.js";import"./avatar-Du1LPt_G.js";import"./button-vPgaRyW5.js";import"./toolbar-Lhya2ayG.js";function i(e){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...e.components};return o.jsxs(o.Fragment,{children:[o.jsx(n,{of:c}),`
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
