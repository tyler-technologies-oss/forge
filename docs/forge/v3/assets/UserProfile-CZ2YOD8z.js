import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-fd9Z3xSU.js";import{n as c,t as l}from"./CustomArgTypes-Cnceb5ig.js";import{r as u,t as d}from"./ProfileLink.stories-PiCYcWTJ.js";import{n as f,r as p,t as m}from"./UserProfile.stories-BAphC5R6.js";function h(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(s,{of:f}),`
`,(0,_.jsx)(o,{}),`
`,(0,_.jsxs)(n.p,{children:[`The `,(0,_.jsx)(n.code,{children:`<forge-user-profile>`}),` component is a versatile solution adhering to the Forge design language for displaying user
authentication state within an application. When a user is signed in (has a `,(0,_.jsx)(n.code,{children:`full-name`}),` value), it displays an avatar
button that opens a popover containing the user's name, email, and sign out option. When no user is signed in, it displays
a sign-in button instead. It also has support for optional features like a theme toggle and custom link slots.`]}),`
`,(0,_.jsx)(a,{of:m}),`
`,(0,_.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,_.jsxs)(n.p,{children:[`It's important to note that the `,(0,_.jsx)(n.code,{children:`<forge-user-profile>`}),` component is designed to be used within a `,(0,_.jsx)(n.code,{children:`<forge-app-bar>`}),`. This ensures that the user profile is
integrated seamlessly into the application's navigation structure. The component can be placed in the `,(0,_.jsx)(n.code,{children:`end`}),` slot of the `,(0,_.jsx)(n.code,{children:`<forge-app-bar>`}),`, which is
typically reserved for user-related actions.`]}),`
`,(0,_.jsx)(n.h3,{id:`app-bar-theme-mode`,children:`App Bar Theme Mode`}),`
`,(0,_.jsxs)(n.p,{children:[`Due to the `,(0,_.jsx)(n.code,{children:`<forge-user-profile>`}),` being comprised of multiple components, including the `,(0,_.jsx)(n.code,{children:`<forge-popover>`}),`, you need to set the `,(0,_.jsx)(n.code,{children:`theme-mode="scoped"`}),` attribute
on the `,(0,_.jsx)(n.code,{children:`<forge-app-bar>`}),` to ensure that it inherits the correct design and the app bar's theme tokens do not cascade down into the user profile popover. If you
do not set this attribute, the user profile popover may not display correctly.`]}),`
`,(0,_.jsxs)(n.p,{children:[`See the `,(0,_.jsx)(n.a,{href:`https://forge.tylerdev.io/main/?path=/docs/components-app-bar--docs#theme-mode`,rel:`nofollow`,children:`Forge App Bar documentation`}),` for more details on the `,(0,_.jsx)(n.code,{children:`theme-mode`}),` attribute.`]}),`
`,(0,_.jsx)(n.h2,{id:`custom-links`,children:`Custom Links`}),`
`,(0,_.jsxs)(n.p,{children:[`The `,(0,_.jsx)(n.code,{children:`<forge-profile-link>`}),` component is a utility component for rendering accessible, visually consistent links within the
`,(0,_.jsx)(n.code,{children:`<forge-user-profile>`}),` popover. This component is configured to render in the `,(0,_.jsx)(n.code,{children:`link`}),` slot of the `,(0,_.jsx)(n.code,{children:`<forge-user-profile>`}),`. It
supports an optional icon and ensures links are part of a fully accessible list structure.`]}),`
`,(0,_.jsxs)(n.blockquote,{children:[`
`,(0,_.jsx)(n.p,{children:`The optional profile link should appear last in the user profile link list to maintain a consistent design and user experience across all apps`}),`
`]}),`
`,(0,_.jsx)(a,{of:d}),`
`,(0,_.jsx)(n.h2,{id:`theme-toggle`,children:`Theme Toggle`}),`
`,(0,_.jsxs)(n.p,{children:[`You can also include a theme toggle within the user profile popover by specifying the `,(0,_.jsx)(n.code,{children:`theme-toggle`}),` attribute. This allows
users to switch between light and dark themes directly from their profile menu.`]}),`
`,(0,_.jsxs)(n.p,{children:[`The theme toggle will set the `,(0,_.jsx)(n.code,{children:`data-forge-theme`}),` attribute on the `,(0,_.jsx)(n.code,{children:`<html>`}),` element, which you can use CSS to target for styling
and the correct theme.`]}),`
`,(0,_.jsx)(n.h4,{id:`usage-example`,children:`Usage example`}),`
`,(0,_.jsx)(n.pre,{children:(0,_.jsx)(n.code,{className:`language-css`,children:`@use '@tylertech/forge/sass/theme/theme-dark';

html[data-forge-theme='dark'] {
  @include theme-dark.theme-properties;
}
`})}),`
`,(0,_.jsx)(n.h2,{id:`avatar-styling`,children:`Avatar Styling`}),`
`,(0,_.jsxs)(n.p,{children:[`The `,(0,_.jsx)(n.code,{children:`<forge-user-profile>`}),` renders a `,(0,_.jsx)(n.code,{children:`<forge-avatar>`}),` in both the button and the popover. The avatar CSS custom properties
`,(0,_.jsx)(n.code,{children:`--forge-avatar-background`}),` and `,(0,_.jsx)(n.code,{children:`--forge-avatar-color`}),` are applied to both avatars when set on the `,(0,_.jsx)(n.code,{children:`<forge-user-profile>`}),` element
(or any ancestor). When they are not set, the popover avatar uses its own default colors.`]}),`
`,(0,_.jsx)(n.pre,{children:(0,_.jsx)(n.code,{className:`language-css`,children:`forge-user-profile {
  --forge-avatar-background: var(--forge-theme-primary);
  --forge-avatar-color: var(--forge-theme-on-primary);
}
`})}),`
`,(0,_.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,_.jsx)(l,{}),`
`,(0,_.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,_.jsxs)(n.ul,{children:[`
`,(0,_.jsxs)(n.li,{children:[`Ensure you provide appropriate `,(0,_.jsx)(n.code,{children:`button-label`}),` text for the `,(0,_.jsx)(n.code,{children:`aria-label`}),` of the profile button if you need something other than the default.`]}),`
`,(0,_.jsxs)(n.li,{children:[`For internationalization, the `,(0,_.jsx)(n.code,{children:`theme-toggle-aria-label`}),` attribute lets you translate the theme toggle group's ARIA label, and the `,(0,_.jsx)(n.code,{children:`theme-toggle-title`}),`, `,(0,_.jsx)(n.code,{children:`theme-toggle-light-label`}),`, `,(0,_.jsx)(n.code,{children:`theme-toggle-dark-label`}),`, and `,(0,_.jsx)(n.code,{children:`theme-toggle-system-label`}),` slots let you translate the theme toggle's title and option text.`]}),`
`]})]})}function g(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,_.jsx)(n,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;function v(){return(v=e((()=>{_=r(),n(),i(),c(),p(),u()})))()}v();export{g as default};