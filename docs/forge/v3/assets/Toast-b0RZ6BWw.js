import{u as n,j as e,M as r,T as a,C as o}from"./blocks-lzQ4jgIO.js";import{C as l}from"./CustomArgTypes-iwKdrQ1x.js";import{T as c,D as d,a as p}from"./Toast.stories-BzRpNkJP.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Cv18HVO7.js";import"./iframe-Y92HmdHZ.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-DbbJplVM.js";import"./ref-C9xd_Bhv.js";import"./base-lit-element-DXQv51bq.js";import"./directive-CwRn8Fwj.js";import"./style-map-CPyruTRu.js";import"./service-adapter-8tADcN_b.js";import"./button-BUQjmV8l.js";import"./base-component-eLLEz2pp.js";import"./utils-DKysp6Us.js";import"./base-adapter-BCJU7eTd.js";import"./dom-utils-DyV3Musz.js";import"./tyler-icons-SWWw4qdQ.js";import"./property-4XXebId8.js";import"./constants-D9XaGcQ2.js";import"./feature-detection-3Hxzrcpn.js";import"./focus-indicator-CypHdldK.js";import"./utils-DU-9AqTO.js";import"./state-layer-C4o8tMgM.js";import"./base-button-core-Cs7r2nBO.js";import"./with-label-aware-v-rvTgpX.js";import"./with-default-aria-DvCryB8T.js";import"./a11y-utils-BNxJc0Sy.js";import"./button-constants-1yoxvAmM.js";import"./toast-DCkK1d2B.js";import"./dismissible-stack-xq-0Rg1q.js";import"./dialog-C-zyrl9l.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./backdrop-BlmHgV5b.js";import"./icon-button-BG-KzVAg.js";import"./icon-button-constants-DmTas6I8.js";import"./overlay-OLurZXLD.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";function i(t){const s={a:"a",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c}),`
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
