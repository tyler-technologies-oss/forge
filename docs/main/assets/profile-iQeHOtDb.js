import{j as o}from"./jsx-runtime-BtitPEnk.js";import{u as r}from"./index-CCtpvPld.js";import{ae as n,af as s,ag as p}from"./index-Dabno-nH.js";import{C as a}from"./CustomArgTypes-BNipBnAA.js";import{P as c,D as l}from"./profile.stories-CS26u2F_.js";import"./iframe-CGB4PP8U.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-DxKRhftL.js";import"./index-DrFu-skq.js";import"./utils-DY7h9u6A.js";import"./chunk-454WOBUV-CM0pFb8Z.js";import"./v4-CQkTLCs1.js";import"./lit-element-Dk2-kgKT.js";import"./lit-html-DZH-Jm0H.js";import"./constants-DjE6emXm.js";import"./app-bar-profile-button-cFxi-9cE.js";import"./base-adapter-F7QHxK2H.js";import"./focus-indicator-_fDu4ZqT.js";import"./index-Dh0vMUMR.js";import"./state-layer-DTKAXCUq.js";import"./index-ByifSpfC.js";import"./icon-DHpZ4R73.js";import"./icon-button-XdSjYqUR.js";import"./base-button-adapter-WOmen6Ii.js";import"./with-label-aware-CLWydNrR.js";import"./with-default-aria-DCLjqsVH.js";import"./tooltip-CoCQ3Otm.js";import"./overlay-DWm8nYOy.js";import"./with-longpress-listener-D-8wsf8o.js";import"./dismissible-stack-DoZLb9q6.js";import"./badge-CO5a_--I.js";import"./menu-B7aO8sYr.js";import"./list-C2bUECg8.js";import"./list-dropdown-aware-core-BOk-3RRz.js";import"./list-dropdown-DXeSARaG.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-CcMix19v.js";import"./popover-tgjxHp7t.js";import"./skeleton-Cs99PVGD.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-C6iOaLFP.js";import"./avatar-Cja6atCs.js";import"./button-C5f1g9CL.js";import"./toolbar-CtEd8mqT.js";function i(e){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...e.components};return o.jsxs(o.Fragment,{children:[o.jsx(n,{of:c}),`
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
