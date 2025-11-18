import{j as e,M as c,T as l,C as s}from"./blocks-B43Fs-NA.js";import{useMDXComponents as t}from"./index-C5m_VsjC.js";import{S as d,D as o,B as h,a,W as x,b as j,C as p,N as u,P as g,R as m,I as b}from"./Secret.stories-BQK9Xq6p.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CSGc-9i1.js";import"./utils-CW5S_tZJ.js";import"./service-adapter-CffG5Lhq.js";import"./secret-CHGnbafv.js";import"./base-lit-element-BEmpEGH7.js";import"./query-assigned-nodes-DwurYzgD.js";import"./class-map-DYGyln6N.js";import"./directive-CJw_OlP2.js";import"./a11y-utils-Dj08p-2z.js";import"./feature-detection-B-sRDmdg.js";import"./utils-Bd6MGx91.js";import"./focus-indicator-D44tT1xv.js";import"./icon-8E01u_jy.js";import"./constants-DzQy6WDX.js";import"./base-adapter-C8aSF3nG.js";import"./index-5CPwzmQS.js";import"./state-layer-BEEsPoZf.js";import"./tooltip-B59ljHGY.js";import"./overlay-B5pGv-rV.js";import"./with-longpress-listener-DtGZwA0v.js";import"./dismissible-stack-TpzCxM2R.js";import"./with-default-aria-6GN_uk1I.js";function i(r){const n={code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:d}),`
`,e.jsx(l,{}),`
`,e.jsx(n.p,{children:"The Secret component conceals inline content with a visual effect (blur or dots), revealing it on user interaction. It's designed for sensitive information that should be hidden by default."}),`
`,e.jsx(n.h2,{id:"features",children:"Features"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Two visual variants"}),": Blur or dots effect for concealing content"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Accessible"}),": Full keyboard support and screen reader announcements"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Interactive feedback"}),": Uses Forge state-layer and focus-indicator"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Hover reveal"}),": Optional reveal on hover/focus"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Radio group behavior"}),": Multiple secrets with the same name act as a group"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Inline display"}),": Wraps content inline with surrounding text"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Customizable"}),": Slots for custom icons and labels"]}),`
`]}),`
`,e.jsx(n.h2,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(s,{of:o}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-secret icon>Secret content</forge-secret>
`})}),`
`,e.jsx(n.h2,{id:"variants",children:"Variants"}),`
`,e.jsx(n.h3,{id:"blur-variant",children:"Blur Variant"}),`
`,e.jsx(n.p,{children:"The default variant applies a blur effect to conceal the content."}),`
`,e.jsx(s,{of:h}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-secret variant="blur" icon>This content is blurred when hidden</forge-secret>
`})}),`
`,e.jsx(n.h3,{id:"dots-variant",children:"Dots Variant"}),`
`,e.jsx(n.p,{children:"The dots variant replaces the content with a dot pattern."}),`
`,e.jsx(s,{of:a}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-secret variant="dots" icon>This content is replaced by dots when hidden</forge-secret>
`})}),`
`,e.jsx(n.h2,{id:"with-label",children:"With Label"}),`
`,e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"label"})," slot to add a label before the secret content."]}),`
`,e.jsx(s,{of:x}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-secret icon>
  <span slot="label">Password: </span>
  my_secret_password
</forge-secret>
`})}),`
`,e.jsx(n.h2,{id:"show-on-hover",children:"Show on Hover"}),`
`,e.jsxs(n.p,{children:["Enable ",e.jsx(n.code,{children:"show-on-hover"})," to reveal content on hover or focus in addition to click."]}),`
`,e.jsx(s,{of:j}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-secret show-on-hover icon>Hover over me to reveal</forge-secret>
`})}),`
`,e.jsx(n.h2,{id:"custom-icons",children:"Custom Icons"}),`
`,e.jsxs(n.p,{children:["Override the default eye/eye_off icons using the ",e.jsx(n.code,{children:"visible-icon"})," and ",e.jsx(n.code,{children:"hidden-icon"})," slots."]}),`
`,e.jsx(s,{of:p}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-secret icon>
  <span slot="hidden-icon">🔒</span>
  <span slot="visible-icon">🔓</span>
  Secret with custom icons
</forge-secret>
`})}),`
`,e.jsx(n.h2,{id:"without-icon",children:"Without Icon"}),`
`,e.jsx(n.p,{children:"The icon is optional. Without it, the entire surface is still clickable."}),`
`,e.jsx(s,{of:u}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-secret>Secret without visible icon</forge-secret>
`})}),`
`,e.jsx(n.h2,{id:"programmatic-control",children:"Programmatic Control"}),`
`,e.jsxs(n.p,{children:["Control visibility programmatically using the ",e.jsx(n.code,{children:"visible"})," property."]}),`
`,e.jsx(s,{of:g}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`const secret = document.querySelector('forge-secret');
secret.visible = true; // Reveal
secret.visible = false; // Conceal
`})}),`
`,e.jsx(n.h2,{id:"radio-group-behavior",children:"Radio Group Behavior"}),`
`,e.jsxs(n.p,{children:["Multiple secrets with the same ",e.jsx(n.code,{children:"name"})," act as a radio group - only one can be visible at a time."]}),`
`,e.jsx(s,{of:m}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-secret name="credentials" icon>john_doe</forge-secret>
<forge-secret name="credentials" icon>my_secret_password</forge-secret>
<forge-secret name="credentials" icon>sk_test_1234567890abcdef</forge-secret>
`})}),`
`,e.jsx(n.h2,{id:"inline-usage",children:"Inline Usage"}),`
`,e.jsx(n.p,{children:"The component is designed to work inline with surrounding text."}),`
`,e.jsx(s,{of:b}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<p>
  The user's email is <forge-secret icon>user@example.com</forge-secret>
  and their phone number is <forge-secret icon variant="dots">555-1234</forge-secret>.
</p>
`})}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Property"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"visible"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Whether the secret content is currently visible"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"variant"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'blur' | 'dots'"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'blur'"})}),e.jsx(n.td,{children:"The visual effect variant to apply when content is hidden"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"showOnHover"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Whether to reveal content on hover/focus in addition to click"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"noLabel"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Whether to hide the label"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"name"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"''"})}),e.jsx(n.td,{children:"Group name for radio-like behavior. Only one secret with the same name can be visible at a time"})]})]})]}),`
`,e.jsx(n.h2,{id:"events",children:"Events"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Event"}),e.jsx(n.th,{children:"Detail"}),e.jsx(n.th,{children:"Description"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"forge-secret-change"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"{ visible: boolean }"})}),e.jsx(n.td,{children:"Dispatched when the visible state changes"})]})})]}),`
`,e.jsx(n.h2,{id:"slots",children:"Slots"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Slot"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"(default)"}),e.jsx(n.td,{children:"The secret content (displayed inline after label)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"label"})}),e.jsx(n.td,{children:"Optional label displayed inline before the secret content"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"visible-icon"})}),e.jsx(n.td,{children:"Custom icon to show when content is visible (replaces default eye_off)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"hidden-icon"})}),e.jsx(n.td,{children:"Custom icon to show when content is hidden (replaces default eye)"})]})]})]}),`
`,e.jsx(n.h2,{id:"css-custom-properties",children:"CSS Custom Properties"}),`
`,e.jsx(n.p,{children:"The component uses the following design tokens which can be customized:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Token"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--forge-secret-blur"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"spacing.variable(xsmall)"})}),e.jsx(n.td,{children:"The blur intensity for the blur variant"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--forge-secret-button-shape"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"shape.variable(medium)"})}),e.jsx(n.td,{children:"The shape of the button"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--forge-secret-label-background"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"theme.variable(surface-inverse)"})}),e.jsx(n.td,{children:"Background color of the label"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--forge-secret-label-color"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"theme.variable(on-surface-inverse)"})}),e.jsx(n.td,{children:"Text color of the label"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--forge-secret-label-padding"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"spacing.variable(xxxsmall) spacing.variable(xsmall)"})}),e.jsx(n.td,{children:"Padding around the label"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--forge-secret-label-shape"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"shape.variable(full)"})}),e.jsx(n.td,{children:"The shape of the label"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--forge-secret-icon-size"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"typography.font-size-relative('1000')"})}),e.jsx(n.td,{children:"Size of the icon"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--forge-secret-transition-duration"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"animation.variable(duration-short4)"})}),e.jsx(n.td,{children:"Animation duration for reveal/conceal transitions"})]})]})]}),`
`,e.jsx(n.h2,{id:"css-parts",children:"CSS Parts"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Part"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"root"})}),e.jsx(n.td,{children:"The root container span"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"content"})}),e.jsx(n.td,{children:"The content container"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"button"})}),e.jsx(n.td,{children:"The overlay button"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"label"})}),e.jsx(n.td,{children:"The label container"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"icon"})}),e.jsx(n.td,{children:"The icon container"})]})]})]}),`
`,e.jsx(n.h2,{id:"css-states",children:"CSS States"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"State"}),e.jsx(n.th,{children:"Description"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:":state(visible)"})}),e.jsx(n.td,{children:"Applied when the content is visible"})]})})]}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(n.p,{children:"The Secret component follows accessibility best practices:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Uses a ",e.jsx(n.code,{children:"<button>"})," overlay with proper ARIA attributes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"aria-expanded"})," reflects the visible state"]}),`
`,e.jsxs(n.li,{children:["Content is marked ",e.jsx(n.code,{children:"inert"})," when hidden to prevent interaction"]}),`
`,e.jsxs(n.li,{children:["Screen reader announcements via ",e.jsx(n.code,{children:"aria-live"})," region when content is revealed"]}),`
`,e.jsx(n.li,{children:"Full keyboard support (Enter/Space to toggle)"}),`
`,e.jsx(n.li,{children:"Forge focus-indicator provides clear focus styling"}),`
`,e.jsx(n.li,{children:"Forge state-layer provides interaction feedback"}),`
`]}),`
`,e.jsx(n.h2,{id:"use-cases",children:"Use Cases"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Sensitive Information"}),": Passwords, API keys, tokens, personal data"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Privacy Protection"}),": Email addresses, phone numbers, account numbers"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Form Fields"}),": Credit card numbers, SSN, security codes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Documentation"}),": Example credentials, test data"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Educational Content"}),": Spoilers, quiz answers, hidden hints"]}),`
`]}),`
`,e.jsx(n.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Always use meaningful context"}),": Provide labels or surrounding text so users understand what's hidden"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Consider icon usage"}),": Show icons for better discoverability, especially for first-time users"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Use radio groups wisely"}),": Group related secrets to prevent multiple sensitive items being visible simultaneously"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Test with screen readers"}),": Ensure announcements are clear and helpful"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Don't overuse"}),': Reserve for truly sensitive content to avoid "alert fatigue"']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Provide visual hints"}),": Use icons or styling to indicate interactive elements"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Consider hover behavior"}),": Use ",e.jsx(n.code,{children:"show-on-hover"})," for quick peeks, but ensure click still works for mobile"]}),`
`]}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"credential-display",children:"Credential Display"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<div>
  <strong>Username:</strong>
  <forge-secret name="creds" icon>john_doe</forge-secret>
</div>
<div>
  <strong>Password:</strong>
  <forge-secret name="creds" icon>my_secret_password</forge-secret>
</div>
`})}),`
`,e.jsx(n.h3,{id:"api-key-with-copy",children:"API Key with Copy"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<div>
  <forge-secret icon>
    <span slot="label">API Key: </span>
    sk_test_1234567890abcdef
  </forge-secret>
  <button onclick="copyToClipboard()">Copy</button>
</div>
`})}),`
`,e.jsx(n.h3,{id:"conditional-styling",children:"Conditional Styling"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`/* Style based on visible state */
forge-secret:state(visible) {
  background-color: var(--mdc-theme-surface-variant);
  padding: 2px 4px;
  border-radius: 4px;
}
`})}),`
`,e.jsx(n.h3,{id:"custom-blur-intensity",children:"Custom Blur Intensity"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-secret icon style="--forge-secret-blur-amount: 16px;">
  Very sensitive content
</forge-secret>
`})})]})}function q(r={}){const{wrapper:n}={...t(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{q as default};
