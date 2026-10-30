import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-fd9Z3xSU.js";import{n as c,t as l}from"./CustomArgTypes-Cnceb5ig.js";import{i as u,n as d,r as f,t as p}from"./profile.stories-C0I55bzZ.js";function m(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s,{of:u}),`
`,(0,g.jsx)(o,{}),`
`,(0,g.jsxs)(n.p,{children:[`For convenience Forge provides the `,(0,g.jsx)(n.code,{children:`<forge-app-bar-profile-button>`}),` component. This component uses an icon-button (with a predefined avatar), and is responsible for displaying profile information within a popup. The power of this component is that it will ensure a consistent experience for users across all applications that consume it.`]}),`
`,(0,g.jsxs)(n.p,{children:[`If necessary, you can use the `,(0,g.jsx)(n.code,{children:`profileCardBuilder`}),` API to provide custom content within the profile card popup.`]}),`
`,(0,g.jsxs)(n.blockquote,{children:[`
`,(0,g.jsx)(n.p,{children:`It is expected that you place this component in the end slot of the app-bar for consistency and familiarity for users.`}),`
`]}),`
`,(0,g.jsx)(n.h2,{id:`deprecation-notice`,children:`Deprecation notice`}),`
`,(0,g.jsxs)(n.p,{children:[(0,g.jsxs)(n.strong,{children:[`🚨 This component is deprecated and has been replaced by the `,(0,g.jsx)(n.a,{href:`https://tyler-technologies-oss.github.io/forge-extended/v1/?path=/docs/components-user-profile--docs`,rel:`nofollow`,children:`user profile`}),` component in the Tyler Forge™ Extended library.`]}),` This
component will remain in the core library for the foreseeable future, but no new features will be added and it may be removed in a future major release. We recommend that you migrate to the new user profile component when possible.`]}),`
`,(0,g.jsx)(n.h2,{id:`common`,children:`Common`}),`
`,(0,g.jsx)(n.p,{children:`A common usage of the profile button will require you to provide some basic information about the user so that it can properly display the data in a familiar location for users. This information needs to be available prior to the user opening the popup.`}),`
`,(0,g.jsx)(a,{of:p}),`
`,(0,g.jsx)(n.h2,{id:`custom-content`,children:`Custom content`}),`
`,(0,g.jsx)(n.p,{children:`The profile card allows for custom content to be placed within its template. This is provided in the form of a "builder" callback that you can use to generate DOM
that the component will render for you. You will need to use JavaScript to accomplish this.`}),`
`,(0,g.jsx)(a,{of:d}),`
`,(0,g.jsx)(n.p,{children:`The following snippet demonstrates basic usage in vanilla JavaScript, but if you're using this within a framework you can use the same concept, or if you prefer to avoid
using vanilla DOM APIs within framework code you can always create a dynamic framework component and return the element instance from the builder callback.`}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-typescript`,children:`profileButton.profileCardBuilder = () => {
  const listElement = document.createElement('forge-list');
  listElement.addEventListener('forge-list-item-select', ({ detail }) => {
    console.log('[profile-card] Selected custom item:', detail.value);
  });
  listElement.style.setProperty('--forge-list-padding', '0');
  listElement.appendChild(document.createElement('forge-divider'));
  listElement.appendChild(buildListItemElement('My Reports', 'assignment', 'reports'));
  listElement.appendChild(buildListItemElement('My Workflow', 'work_outline', 'workflow'));
  listElement.appendChild(buildListItemElement('My Alerts', 'warning', 'alerts'));
  listElement.appendChild(buildListItemElement('My Preferences', 'settings', 'preferences'));
  return listElement;
};

function buildListItemElement(text: string, icon: string, value: string): HTMLElement {
  const listItemElement = document.createElement('forge-list-item');
  listItemElement.value = value;

  const iconElement = document.createElement('forge-icon');
  iconElement.slot = 'leading';
  iconElement.name = icon;
  listItemElement.appendChild(iconElement);

  const buttonElement = document.createElement('button');
  buttonElement.type = 'button';
  buttonElement.innerText = text;
  listItemElement.appendChild(buttonElement);

  return listItemElement;
}
`})}),`
`,(0,g.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,g.jsx)(l,{}),`
`,(0,g.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,g.jsxs)(n.ul,{children:[`
`,(0,g.jsx)(n.li,{children:`The component will handle adding necessary ARIA attributes for you, as well as ensure the proper color contrast ratio is used.`}),`
`]})]})}function h(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,g.jsx)(n,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;function _(){return(_=e((()=>{g=r(),n(),i(),c(),f()})))()}_();export{h as default};