import{j as o,M as n,T as s,C as p}from"./index-C5oQh66E.js";import{useMDXComponents as r}from"./index-Cz-aMoug.js";import{C as a}from"./CustomArgTypes-3V8ZLuE6.js";import{P as c,D as l}from"./profile.stories-BSqDHeqY.js";import"./iframe-DkEz2W7v.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-D5U1kRmx.js";import"./chunk-D5ZWXAHU-CGElDDNX.js";import"./v4-CQkTLCs1.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./feature-detection-DRCh51Sa.js";import"./app-bar-profile-button-BOf6bRP3.js";import"./constants-9n5_0r7k.js";import"./base-adapter-B6TJxM93.js";import"./focus-indicator-DzT8BbE-.js";import"./index-BmocOEUj.js";import"./state-layer-IxmMcKDT.js";import"./index-ByifSpfC.js";import"./icon-DB7kP3Ec.js";import"./icon-button-Cj-mvUQ9.js";import"./base-button-adapter-CyoupZ7K.js";import"./with-label-aware-OEbK3wHg.js";import"./with-default-aria-B0dk5gj8.js";import"./a11y-utils-DJ_tX8xT.js";import"./tooltip-BEr6TQlq.js";import"./overlay-es9tef1H.js";import"./with-longpress-listener-BdUe1dXe.js";import"./dismissible-stack-C80072oY.js";import"./badge-Dp1fyGkw.js";import"./menu-C3nn2V7z.js";import"./list-ByS02Pjt.js";import"./list-dropdown-aware-core-DOBtjiRo.js";import"./list-dropdown-DfIaHUdb.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-CqfIuBkR.js";import"./popover-CUMSy1gT.js";import"./skeleton-D2S3-1Sc.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-DxN3g8BM.js";import"./avatar-D_XGi29H.js";import"./state-_w7_zNwI.js";import"./style-map-C9nPWcxA.js";import"./directive-CF8sV3Lr.js";import"./class-map-D55lQyt8.js";import"./button-DaDzbT7D.js";import"./toolbar-DrgqBcwu.js";function i(e){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...e.components};return o.jsxs(o.Fragment,{children:[o.jsx(n,{of:c}),`
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
`]})]})}function po(e={}){const{wrapper:t}={...r(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(i,{...e})}):i(e)}export{po as default};
