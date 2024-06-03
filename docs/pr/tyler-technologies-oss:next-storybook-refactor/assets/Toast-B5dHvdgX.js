import{j as e}from"./jsx-runtime-crLg0hz4.js";import{u as n}from"./index-CZ2QFZCc.js";import{M as r,T as a,C as o}from"./index-KlXqu8cq.js";import{C as c}from"./CustomArgTypes-3ju-zpvx.js";import{T as l,D as m,a as p}from"./Toast.stories-DfKpr1cw.js";import"./iframe-C_2JhCym.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./constants-CYeMfgsl.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./chunk-MZXVCX43-CM0pFb8Z.js";import"./v4-CQkTLCs1.js";import"./style-map-D0ILlpbs.js";import"./directive-CF8sV3Lr.js";import"./ref-BorTy8X1.js";import"./directive-helpers-DYUueT8w.js";import"./toast-SI2CcwDz.js";import"./index-Dd7dh6lc.js";import"./button-Cmiqf2xE.js";import"./icon-Cl4LFQNy.js";import"./base-adapter-BhMU2jjH.js";import"./index-Dh0vMUMR.js";import"./focus-indicator-Cam4qI9V.js";import"./utils-_KxxXSob.js";import"./state-layer-02o5UE3p.js";import"./base-button-adapter-By6KisQg.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-HK1DN-B0.js";import"./event-utils-gODbtzKd.js";import"./dialog-jCPOruim.js";import"./backdrop-6GC3XNAo.js";import"./dismissible-stack-DXt6aUkq.js";import"./icon-button-DHRKLwKL.js";import"./overlay-Dg3gyJj4.js";function i(t){const s={a:"a",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l}),`
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
`]})]})}function W(t={}){const{wrapper:s}={...n(),...t.components};return s?e.jsx(s,{...t,children:e.jsx(i,{...t})}):i(t)}export{W as default};
