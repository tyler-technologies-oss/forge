import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-92lRto7J.js";import{n as c,t as l}from"./CustomArgTypes-sQOLn0vT.js";import{i as u,n as d,r as f,t as p}from"./Toast.stories-BlSEa5wc.js";function m(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s,{of:f}),`
`,(0,g.jsx)(o,{}),`
`,(0,g.jsx)(n.p,{children:`Toasts are non-modal notifications that appear in response to user interactions. They can optionally provide a dismissible button, but automatically dismiss after a set duration.`}),`
`,(0,g.jsx)(a,{of:p}),`
`,(0,g.jsx)(n.h2,{id:`dismissible`,children:`Dismissible`}),`
`,(0,g.jsxs)(n.p,{children:[`Toasts can be dismissed by the user when setting `,(0,g.jsx)(n.code,{children:`dismissible`}),` to `,(0,g.jsx)(n.code,{children:`true`}),`.`]}),`
`,(0,g.jsx)(a,{of:d}),`
`,(0,g.jsx)(n.h2,{id:`dynamic-usage`,children:`Dynamic Usage`}),`
`,(0,g.jsx)(n.p,{children:`Toasts are typically created dynamically in response to user interactions. The following example demonstrates how to create a toast from JavaScript.`}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-javascript`,children:`ToastComponent.present({ message: 'Save successful' });
`})}),`
`,(0,g.jsxs)(n.blockquote,{children:[`
`,(0,g.jsxs)(n.p,{children:[`Toasts will automatically dismiss after the `,(0,g.jsx)(n.code,{children:`duration`}),` elapses and remove themselves from the DOM.`]}),`
`]}),`
`,(0,g.jsx)(n.h2,{id:`declarative-usage`,children:`Declarative Usage`}),`
`,(0,g.jsxs)(n.p,{children:[`Toasts can also be used inline declaratively in your HTML and toggled via the `,(0,g.jsx)(n.code,{children:`open`}),` property/attribute.`]}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-html`,children:`<forge-toast open>Save successful</forge-toast>
`})}),`
`,(0,g.jsxs)(n.blockquote,{children:[`
`,(0,g.jsxs)(n.p,{children:[`Inline toasts do not automatically remove themselves from the DOM. You must toggle the `,(0,g.jsx)(n.code,{children:`open`}),` attribute to hide the toast.`]}),`
`]}),`
`,(0,g.jsx)(n.h2,{id:`angular-usage`,children:`Angular Usage`}),`
`,(0,g.jsxs)(n.p,{children:[`The `,(0,g.jsx)(n.a,{href:`?path=/docs/frameworks-angular--docs`,children:`Angular adapter`}),` provides a `,(0,g.jsx)(n.code,{children:`ToastService`}),` that can be used to show toasts from your Angular components.`]}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-typescript`,children:`import { ToastService } from '@tylertech/forge-angular';

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
`,(0,g.jsx)(n.h2,{id:`usage-with-dialogs`,children:`Usage with Dialogs`}),`
`,(0,g.jsxs)(n.p,{children:[`By default, a dismissible toast presented while a `,(0,g.jsx)(n.code,{children:`<forge-dialog>`}),` is open will not be interactive, as the underlying `,(0,g.jsx)(n.code,{children:`<dialog>`}),` makes outside elements `,(0,g.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog`,rel:`nofollow`,children:`inert`}),`.`]}),`
`,(0,g.jsxs)(n.p,{children:[`To handle this, pass `,(0,g.jsx)(n.code,{children:`topLayer: true`}),` to `,(0,g.jsx)(n.code,{children:`ToastComponent.present()`}),` or the Angular adapter's `,(0,g.jsx)(n.code,{children:`ToastService.show()`}),`, which appends the toast to the topmost open dialog and keeps it interactive.`]}),`
`,(0,g.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,g.jsx)(l,{}),`
`,(0,g.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,g.jsxs)(n.ul,{children:[`
`,(0,g.jsx)(n.li,{children:`Ensure that the dismiss button is accessible by keyboard.`}),`
`,(0,g.jsx)(n.li,{children:`If color conveys important information, provide additional cues for users with color perception deficiencies.`}),`
`]})]})}function h(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,g.jsx)(n,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;function _(){return(_=e((()=>{g=r(),n(),i(),c(),u()})))()}_();export{h as default};