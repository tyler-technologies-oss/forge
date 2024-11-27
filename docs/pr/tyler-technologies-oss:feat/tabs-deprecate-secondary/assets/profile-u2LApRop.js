import{ae as o,af as n,ag as s,ah as a}from"./index-DIw8LtQ4.js";import{u as r}from"./index-DOho0HQz.js";import{C as p}from"./CustomArgTypes-nTA0WxTg.js";import{P as c,D as l}from"./profile.stories-OFKDXR7o.js";import"./iframe-aj2zi5yJ.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-DzsNAH9x.js";import"./chunk-D5ZWXAHU-CGElDDNX.js";import"./v4-CQkTLCs1.js";import"./lit-element-CgJqSpuc.js";import"./lit-html-paDGiEfB.js";import"./constants-CFf81ck9.js";import"./app-bar-profile-button-TQNmMNfI.js";import"./base-adapter-Dh44vCkH.js";import"./focus-indicator-DesOnyyZ.js";import"./index-BmocOEUj.js";import"./state-layer-COSQHCpS.js";import"./index-ByifSpfC.js";import"./icon-FszQmWVN.js";import"./icon-button-DxSYWoFH.js";import"./base-button-adapter-BS886vuU.js";import"./with-label-aware-CjYHyB6d.js";import"./with-default-aria-CAIVLMQ_.js";import"./tooltip-ClBWJcYu.js";import"./overlay-DUpFUxF7.js";import"./with-longpress-listener-B4oujpK4.js";import"./dismissible-stack-DVth9mRg.js";import"./badge-CflmfcPU.js";import"./menu-CNDrq6h_.js";import"./list-CZ9CZlmI.js";import"./list-dropdown-aware-core-CAUNISDm.js";import"./list-dropdown-BD7Ph7Qn.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-DKZR2TB_.js";import"./popover-CFhwSXnG.js";import"./skeleton-RPu_OG0b.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-rOUUL8H7.js";import"./avatar-BlmOt8Ln.js";import"./button-CVZhEkBO.js";import"./toolbar-CKT6WFUk.js";function i(e){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...e.components};return o.jsxs(o.Fragment,{children:[o.jsx(n,{of:c}),`
`,o.jsx(s,{}),`
`,o.jsxs(t.p,{children:["For convenience Forge provides the ",o.jsx(t.code,{children:"<forge-app-bar-profile-button>"})," component. This component uses an icon-button (with a predefined avatar), and is responsible for displaying profile information within a popup. The power of this component is that it will ensure a consistent experience for users across all applications that consume it."]}),`
`,o.jsxs(t.p,{children:["If necessary, you can use the ",o.jsx(t.code,{children:"profileCardBuilder"})," API to provide custom content within the profile card popup."]}),`
`,o.jsxs(t.blockquote,{children:[`
`,o.jsx(t.p,{children:"It is expected that you place this component in the end slot of the app-bar for consistency and familiarity for users."}),`
`]}),`
`,o.jsx(t.h2,{id:"common",children:"Common"}),`
`,o.jsx(t.p,{children:"A common usage of the profile button will require you to provide some basic information about the user so that it can properly display the data in a familiar location for users. This information needs to be available prior to the user opening the popup."}),`
`,o.jsx(a,{of:l}),`
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
`,o.jsx(p,{}),`
`,o.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,o.jsxs(t.ul,{children:[`
`,o.jsx(t.li,{children:"The component will handle adding necessary ARIA attributes for you, as well as ensure the proper color contrast ratio is used."}),`
`]})]})}function eo(e={}){const{wrapper:t}={...r(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(i,{...e})}):i(e)}export{eo as default};
