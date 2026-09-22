import{u as n,j as e,M as r,T as a,C as o}from"./blocks-BEkqHA1b.js";import{C as l}from"./CustomArgTypes-BFL-T1C8.js";import{T as c,D as d,a as p}from"./Toast.stories-BZlicOim.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BqGV7hdN.js";import"./iframe-BTsZxqzu.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-B0J9t6hU.js";import"./ref-CnX8OPEf.js";import"./base-lit-element-fjOVRZ-k.js";import"./directive-CwRn8Fwj.js";import"./style-map-D_mDhrQD.js";import"./service-adapter-DlT-lJx7.js";import"./button-ClyH3Yl3.js";import"./property-DkOodoSL.js";import"./class-map-B2uIhfTt.js";import"./utils-DxVSXevv.js";import"./focus-indicator-BxamY3-n.js";import"./feature-detection-Cdqsoz5C.js";import"./tyler-icons-DhRbvloE.js";import"./constants-DVKvft47.js";import"./state-layer-UyeTOOS1.js";import"./base-component-DokdPcmx.js";import"./base-adapter-C2s8cO2K.js";import"./dom-utils-D38acdAW.js";import"./base-button-DyFlNd1j.js";import"./state-BuOq48og.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-CUlOUJ7O.js";import"./button-constants-Dh8wxsDb.js";import"./toast-C42nowyP.js";import"./with-element-internals-BVdcaC_W.js";import"./dismissible-stack-Cj5gwv2p.js";import"./dialog-DxXf_Dbp.js";import"./backdrop-Dvs4MPLP.js";import"./icon-button-CSxHjIC-.js";import"./icon-button-constants-wbi3a2tN.js";import"./overlay-knVFCZgv.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";function i(t){const s={a:"a",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c}),`
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
`]})]})}function se(t={}){const{wrapper:s}={...n(),...t.components};return s?e.jsx(s,{...t,children:e.jsx(i,{...t})}):i(t)}export{se as default};
