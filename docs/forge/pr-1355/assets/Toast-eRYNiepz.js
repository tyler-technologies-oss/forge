import{u as r,j as e,M as n,T as a,C as s}from"./blocks-o3aE32Cc.js";import{C as l}from"./CustomArgTypes-Dh-zw8TI.js";import{T as c,D as p,a as d}from"./Toast.stories-BL0qRILU.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DCOfJTyw.js";import"./iframe-BJl9WzyY.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BIy79ypG.js";import"./ref-xGGPVyN5.js";import"./async-directive-B9HypnBE.js";import"./directive-CwRn8Fwj.js";import"./style-map-BOTmrNYG.js";import"./service-adapter-8tADcN_b.js";import"./button-CDo-p3Lo.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./property-cnzUGw6c.js";import"./class-map-Bqw-tANk.js";import"./utils-srtmqB2N.js";import"./focus-indicator-spyGQm32.js";import"./floating-ui.dom-DaMtbvS2.js";import"./base-lit-element-PWcytbnJ.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./icon-4j55E3iS.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./state-layer-oVncPkRT.js";import"./custom-element-DR9AFpIK.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-CG4WlmkL.js";import"./dom-utils-DExKgbbf.js";import"./base-component-BFu9bkgC.js";import"./base-button-CGcQbB-W.js";import"./tyler-icons-6f2n3B-C.js";import"./state-DPSRFZRB.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-D_hXjxHZ.js";import"./button-constants-DRqTH6Pv.js";import"./toast-BZ7VSbr7.js";import"./with-element-internals-DChZslLI.js";import"./dismissible-stack-j9Qzt-d1.js";import"./dialog-BNJo_hP-.js";import"./backdrop-ngk7d2eo.js";import"./icon-button-BjiGUEcN.js";import"./icon-button-constants-JHHxiN9v.js";import"./overlay-CP97VZFA.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";function i(o){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:c}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:"Toasts are non-modal notifications that appear in response to user interactions. They can optionally provide a dismissible button, but automatically dismiss after a set duration."}),`
`,e.jsx(s,{of:p}),`
`,e.jsx(t.h2,{id:"dismissible",children:"Dismissible"}),`
`,e.jsxs(t.p,{children:["Toasts can be dismissed by the user when setting ",e.jsx(t.code,{children:"dismissible"})," to ",e.jsx(t.code,{children:"true"}),"."]}),`
`,e.jsx(s,{of:d}),`
`,e.jsx(t.h2,{id:"dynamic-usage",children:"Dynamic Usage"}),`
`,e.jsx(t.p,{children:"Toasts are typically created dynamically in response to user interactions. The following example demonstrates how to create a toast from JavaScript."}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`ToastComponent.present({ message: 'Save successful' });
`})}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:["Toasts will automatically dismiss after the ",e.jsx(t.code,{children:"duration"})," elapses and remove themselves from the DOM."]}),`
`]}),`
`,e.jsx(t.h2,{id:"declarative-usage",children:"Declarative Usage"}),`
`,e.jsxs(t.p,{children:["Toasts can also be used inline declaratively in your HTML and toggled via the ",e.jsx(t.code,{children:"open"})," property/attribute."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-toast open>Save successful</forge-toast>
`})}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:["Inline toasts do not automatically remove themselves from the DOM. You must toggle the ",e.jsx(t.code,{children:"open"})," attribute to hide the toast."]}),`
`]}),`
`,e.jsx(t.h2,{id:"angular-usage",children:"Angular Usage"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.a,{href:"?path=/docs/frameworks-angular--docs",children:"Angular adapter"})," provides a ",e.jsx(t.code,{children:"ToastService"})," that can be used to show toasts from your Angular components."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-typescript",children:`import { ToastService } from '@tylertech/forge-angular';

@Component({
  selector: 'app-my-component',
  template: \`<button (click)="showToast()">Show Toast</button>\`
})
export class MyComponent {
  constructor(private toastService: ToastService) {}

  showToast() {
    this.toastService.show({ message: 'Save successful' });
  }
}
`})}),`
`,e.jsx(t.h2,{id:"usage-with-dialogs",children:"Usage with Dialogs"}),`
`,e.jsxs(t.p,{children:["By default, a dismissible toast presented while a ",e.jsx(t.code,{children:"<forge-dialog>"})," is open will not be interactive, as the underlying ",e.jsx(t.code,{children:"<dialog>"})," makes outside elements ",e.jsx(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog",rel:"nofollow",children:"inert"}),"."]}),`
`,e.jsxs(t.p,{children:["To handle this, pass ",e.jsx(t.code,{children:"topLayer: true"})," to ",e.jsx(t.code,{children:"ToastComponent.present()"})," or the Angular adapter's ",e.jsx(t.code,{children:"ToastService.show()"}),", which appends the toast to the topmost open dialog and keeps it interactive."]}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure that the dismiss button is accessible by keyboard."}),`
`,e.jsx(t.li,{children:"If color conveys important information, provide additional cues for users with color perception deficiencies."}),`
`]})]})}function de(o={}){const{wrapper:t}={...r(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(i,{...o})}):i(o)}export{de as default};
