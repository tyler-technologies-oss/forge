import{j as e,M as r,T as a,C as o}from"./blocks-DLeGyBVo.js";import{useMDXComponents as n}from"./index-CDYF2lhS.js";import{C as c}from"./CustomArgTypes-Cxc7DOQq.js";import{T as l,D as m,a as p}from"./Toast.stories-lDVtV4qI.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CGNXTVBT.js";import"./utils-BLyw4gKD.js";import"./ref-BJOL-5N-.js";import"./directive-jorct-Oe.js";import"./style-map-T2wPhjs1.js";import"./service-adapter-CoGDs2_3.js";import"./button-N-IY4KqJ.js";import"./base-component-DtuZ_bHQ.js";import"./dom-utils-DBb1ZGPZ.js";import"./base-adapter-CrwPj14V.js";import"./tyler-icons-DJO2-615.js";import"./index-DTwfV0k0.js";import"./constants-d60dfpEV.js";import"./feature-detection-DlorGArm.js";import"./focus-indicator-VaTOwLCu.js";import"./property-DfXuZKJv.js";import"./base-lit-element-CtFXb0D8.js";import"./utils-DU-9AqTO.js";import"./state-layer-n7PzpGlA.js";import"./base-button-core-BSrY8KFZ.js";import"./with-label-aware-DpjVJhjv.js";import"./with-default-aria-BAoBQKAE.js";import"./a11y-utils-BcRiVt5E.js";import"./toast-BUlvQLpq.js";import"./dismissible-stack-xq-0Rg1q.js";import"./dialog-6H06GjyS.js";import"./backdrop-C92f0qEt.js";import"./icon-button-DDH96UYI.js";import"./overlay-CCoxAUi3.js";function i(t){const s={a:"a",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l}),`
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
`]})]})}function G(t={}){const{wrapper:s}={...n(),...t.components};return s?e.jsx(s,{...t,children:e.jsx(i,{...t})}):i(t)}export{G as default};
