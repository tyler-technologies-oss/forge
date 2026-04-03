import{j as e,M as r,T as a,C as o}from"./blocks-BW6tMW00.js";import{useMDXComponents as n}from"./index-CdZgOk8d.js";import{C as c}from"./CustomArgTypes-DzMvS4ML.js";import{T as l,D as m,a as p}from"./Toast.stories-BlPoaVw9.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-1amZ02A4.js";import"./utils-s6uih_-r.js";import"./ref-DjoxsuPm.js";import"./directive-jorct-Oe.js";import"./style-map-DhE_eh_-.js";import"./service-adapter-CoGDs2_3.js";import"./button-YbSFJWqY.js";import"./base-component-JqFhTqNN.js";import"./feature-detection-C7YyUy0w.js";import"./base-adapter-BuRgNRgk.js";import"./tyler-icons-CzoCbVaa.js";import"./index-DTwfV0k0.js";import"./focus-indicator-C5TEsO7E.js";import"./property-B9voTIv9.js";import"./base-lit-element-Ck1SVZB_.js";import"./utils-DU-9AqTO.js";import"./state-layer-DFBFTfpT.js";import"./base-button-core-Gs8VA1ot.js";import"./with-label-aware-BNPNo6Ms.js";import"./with-default-aria-CktUg9lz.js";import"./a11y-utils-Cisf0Kqm.js";import"./toast-zSO_YKXU.js";import"./dismissible-stack-xq-0Rg1q.js";import"./dialog-BYgxglOb.js";import"./backdrop-CFGTkHhD.js";import"./icon-button-DIbOVWXo.js";import"./overlay-xfWlPvUl.js";function i(t){const s={a:"a",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l}),`
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
