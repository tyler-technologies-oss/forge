import{u as n,j as e,M as r,T as a,C as o}from"./blocks-D80V3pa1.js";import{C as l}from"./CustomArgTypes-BNqTz2Fd.js";import{T as c,D as d,a as p}from"./Toast.stories-CIQmF5JU.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CjzVpfqS.js";import"./utils-Bqf6WcF-.js";import"./ref-DDjPIlcr.js";import"./base-lit-element-D28pwoeu.js";import"./directive-CwRn8Fwj.js";import"./style-map-BHakPK_e.js";import"./service-adapter-8tADcN_b.js";import"./button-RZbwlICz.js";import"./focus-indicator-DHikC1Y8.js";import"./utils-DU-9AqTO.js";import"./tyler-icons-J8-UQPDE.js";import"./utils-CjYv_z18.js";import"./constants-scFqwPpP.js";import"./feature-detection-CvbR5w2Z.js";import"./state-layer-BCX73D4o.js";import"./base-component-CYrqcnEP.js";import"./dom-utils-D0uG6d5z.js";import"./base-adapter-Dc6xHI12.js";import"./base-button-BqGhclOZ.js";import"./base-Dnf9m7-Y.js";import"./query-assigned-elements-BiGvSZm7.js";import"./a11y-utils-BtLz16ul.js";import"./class-map-BraAMXTq.js";import"./toast-D6dYB9u_.js";import"./with-default-aria-Bs3XhyPE.js";import"./dismissible-stack-xq-0Rg1q.js";import"./dialog-MGs1MZzZ.js";import"./backdrop-CxI4uXvH.js";import"./icon-button-Y8A9ultm.js";import"./overlay-BUaUM1sf.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";function i(t){const s={a:"a",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c}),`
`,e.jsx(a,{}),`
`,e.jsx(s.p,{children:"Toasts are non-modal notifications that appear in response to user interactions. They can optionally provide a dismissible button, but automatically dismiss after a set duration."}),`
`,e.jsx(o,{of:d}),`
`,e.jsx(s.h2,{id:"dismissible",children:"Dismissible"}),`
`,e.jsxs(s.p,{children:["Toasts can be dismissed by the user when setting ",e.jsx(s.code,{children:"dismissible"})," to ",e.jsx(s.code,{children:"true"}),"."]}),`
`,e.jsx(o,{of:p}),`
`,e.jsx(s.h2,{id:"dynamic-usage",children:"Dynamic Usage"}),`
`,e.jsx(s.p,{children:"Toasts are typically created dynamically in response to user interactions. The following example demonstrates how to create a toast from JavaScript."}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-javascript",children:`ToastComponent.present({ message: 'Save successful' });
`})}),`
`,e.jsxs(s.blockquote,{children:[`
`,e.jsxs(s.p,{children:["Toasts will automatically dismiss after the ",e.jsx(s.code,{children:"duration"})," elapses and remove themselves from the DOM."]}),`
`]}),`
`,e.jsx(s.h2,{id:"declarative-usage",children:"Declarative Usage"}),`
`,e.jsxs(s.p,{children:["Toasts can also be used inline declaratively in your HTML and toggled via the ",e.jsx(s.code,{children:"open"})," property/attribute."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<forge-toast open>Save successful</forge-toast>
`})}),`
`,e.jsxs(s.blockquote,{children:[`
`,e.jsxs(s.p,{children:["Inline toasts do not automatically remove themselves from the DOM. You must toggle the ",e.jsx(s.code,{children:"open"})," attribute to hide the toast."]}),`
`]}),`
`,e.jsx(s.h2,{id:"angular-usage",children:"Angular Usage"}),`
`,e.jsxs(s.p,{children:["The ",e.jsx(s.a,{href:"?path=/docs/frameworks-angular--docs",children:"Angular adapter"})," provides a ",e.jsx(s.code,{children:"ToastService"})," that can be used to show toasts from your Angular components."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-typescript",children:`import { ToastService } from '@tylertech/forge-angular';

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
`,e.jsx(s.h2,{id:"usage-with-dialogs",children:"Usage with Dialogs"}),`
`,e.jsxs(s.p,{children:["By default, a dismissible toast presented while a ",e.jsx(s.code,{children:"<forge-dialog>"})," is open will not be interactive, as the underlying ",e.jsx(s.code,{children:"<dialog>"})," makes outside elements ",e.jsx(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog",rel:"nofollow",children:"inert"}),"."]}),`
`,e.jsxs(s.p,{children:["To handle this, pass ",e.jsx(s.code,{children:"topLayer: true"})," to ",e.jsx(s.code,{children:"ToastComponent.present()"})," or the Angular adapter's ",e.jsx(s.code,{children:"ToastService.show()"}),", which appends the toast to the topmost open dialog and keeps it interactive."]}),`
`,e.jsx(s.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(s.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Ensure that the dismiss button is accessible by keyboard."}),`
`,e.jsx(s.li,{children:"If color conveys important information, provide additional cues for users with color perception deficiencies."}),`
`]})]})}function V(t={}){const{wrapper:s}={...n(),...t.components};return s?e.jsx(s,{...t,children:e.jsx(i,{...t})}):i(t)}export{V as default};
