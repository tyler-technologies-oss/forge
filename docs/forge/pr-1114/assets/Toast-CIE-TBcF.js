import{j as e,M as r,T as a,C as o}from"./blocks-B1S_8nc5.js";import{useMDXComponents as n}from"./index-CgLtPx-e.js";import{C as c}from"./CustomArgTypes-CikjLmxf.js";import{T as l,D as m,a as p}from"./Toast.stories-DmGjkPzM.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DUO6sR7Q.js";import"./utils-JlLG_A5T.js";import"./ref-BebHwDhL.js";import"./base-lit-element-BVSOkl5M.js";import"./directive-jorct-Oe.js";import"./style-map-DLsNm45v.js";import"./service-adapter-8tADcN_b.js";import"./button-CGLAKewe.js";import"./base-component-D7FTQsYl.js";import"./dom-utils-B5Tbf4eK.js";import"./base-adapter-D-ThygVj.js";import"./tyler-icons-iDvhFOMC.js";import"./index-DTwfV0k0.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./focus-indicator-CkQ_SLjY.js";import"./utils-DU-9AqTO.js";import"./state-layer-D0PE-_Ks.js";import"./base-button-core-kM3D0Lx0.js";import"./with-label-aware-BQywrHZk.js";import"./with-default-aria-ee86JPIo.js";import"./a11y-utils-DBLgTZVa.js";import"./toast-C20vBJ8y.js";import"./dismissible-stack-xq-0Rg1q.js";import"./dialog-Be0VDz-Q.js";import"./backdrop-D_yGNC2E.js";import"./icon-button-DYBsyh42.js";import"./overlay-Btn1tEyh.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";function i(t){const s={a:"a",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l}),`
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
`]})]})}function K(t={}){const{wrapper:s}={...n(),...t.components};return s?e.jsx(s,{...t,children:e.jsx(i,{...t})}):i(t)}export{K as default};
