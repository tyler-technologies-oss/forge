import{j as e,M as r,T as a,C as o}from"./blocks-CMWlRmEE.js";import{useMDXComponents as n}from"./index-CVlgTMfK.js";import{C as c}from"./CustomArgTypes-Dp60BJNZ.js";import{T as l,D as m,a as d}from"./Toast.stories-Dwo448Jq.js";import"./iframe-B36M3axR.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-JcRLWv5w.js";import"./style-map-Df0nJbme.js";import"./directive-CJw_OlP2.js";import"./ref-DJEQr53X.js";import"./service-adapter-BykFeYYZ.js";import"./toast-D-b3cEEI.js";import"./constants-BGCYAxRd.js";import"./feature-detection-tRmgbRLz.js";import"./base-adapter-C0vShr2G.js";import"./icon-eJOvSyyv.js";import"./index-CiLSBptl.js";import"./button-C9kCF3a-.js";import"./focus-indicator-u5r21UtO.js";import"./base-lit-element-BTyoGET_.js";import"./utils-DY0XlZdW.js";import"./state-layer-BRTtEqto.js";import"./base-button-adapter-Dtu_t0s6.js";import"./with-label-aware-BxafsAK6.js";import"./with-default-aria-BuZDknr8.js";import"./a11y-utils-u_48QH_E.js";import"./dialog-bZFrz6KW.js";import"./backdrop-BqEK3-r8.js";import"./dismissible-stack-Bl2voxQy.js";import"./icon-button-CofNeE0G.js";import"./overlay-DWLd4_Vp.js";function i(t){const s={a:"a",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l}),`
`,e.jsx(a,{}),`
`,e.jsx(s.p,{children:"Toasts are non-modal notifications that appear in response to user interactions. They can optionally provide a dismissible button, but automatically dismiss after a set duration."}),`
`,e.jsx(o,{of:m}),`
`,e.jsx(s.h2,{id:"dismissible",children:"Dismissible"}),`
`,e.jsxs(s.p,{children:["Toasts can be dismissed by the user when setting ",e.jsx(s.code,{children:"dismissible"})," to ",e.jsx(s.code,{children:"true"}),"."]}),`
`,e.jsx(o,{of:d}),`
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
`]})]})}function R(t={}){const{wrapper:s}={...n(),...t.components};return s?e.jsx(s,{...t,children:e.jsx(i,{...t})}):i(t)}export{R as default};
