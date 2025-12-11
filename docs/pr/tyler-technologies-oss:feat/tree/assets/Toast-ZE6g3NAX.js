import{j as e,M as r,T as a,C as o}from"./blocks-CVgyvBAc.js";import{useMDXComponents as n}from"./index-DIB8FTYC.js";import{C as c}from"./CustomArgTypes-dii0vyj4.js";import{T as l,D as m,a as p}from"./Toast.stories-CmKCYSgp.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-aLJo785t.js";import"./utils-CWNZ6DqN.js";import"./style-map-B_8c-ch3.js";import"./directive-CJw_OlP2.js";import"./ref-BX54oCOp.js";import"./service-adapter-CffG5Lhq.js";import"./toast--n02z_kK.js";import"./constants-DzQy6WDX.js";import"./feature-detection-B-sRDmdg.js";import"./base-adapter-C8aSF3nG.js";import"./icon-Uwxy940_.js";import"./index-DTwfV0k0.js";import"./button-CAXl3FKc.js";import"./focus-indicator-BYHHNw4I.js";import"./property-Btdv5Qza.js";import"./base-lit-element-DUSJv6CV.js";import"./utils-Bd6MGx91.js";import"./state-layer-BEEsPoZf.js";import"./base-button-adapter-DnQ_SE31.js";import"./with-label-aware-C7up74QW.js";import"./with-default-aria-6GN_uk1I.js";import"./a11y-utils-Dj08p-2z.js";import"./dismissible-stack-TpzCxM2R.js";import"./dialog-Dkd2fYmF.js";import"./backdrop-BDRZVysw.js";import"./icon-button-B9l1618B.js";import"./overlay-DbqVLn-W.js";function i(t){const s={a:"a",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l}),`
`,e.jsx(a,{}),`
`,e.jsx(s.p,{children:"Toasts are non-modal notifications that appear in response to user interactions. They can optionally provide a dismissible button, but automatically dismiss after a set duration."}),`
`,e.jsx(o,{of:m}),`
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
`,e.jsx(s.h2,{id:"api",children:"API"}),`
`,e.jsx(c,{}),`
`,e.jsx(s.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Ensure that the dismiss button is accessible by keyboard."}),`
`,e.jsx(s.li,{children:"If color conveys important information, provide additional cues for users with color perception deficiencies."}),`
`]})]})}function z(t={}){const{wrapper:s}={...n(),...t.components};return s?e.jsx(s,{...t,children:e.jsx(i,{...t})}):i(t)}export{z as default};
