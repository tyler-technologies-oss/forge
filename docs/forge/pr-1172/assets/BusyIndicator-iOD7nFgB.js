import{u as r,j as e,M as o,T as c,C as t}from"./blocks-CRtB2q9J.js";import{C as d}from"./CustomArgTypes-Ca9SwHoY.js";import{B as l,D as a,I as h}from"./BusyIndicator.stories-DpcFy8S3.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B5Tn_34B.js";import"./iframe-DQLkTsj5.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-RooUwGan.js";import"./ref-DGfk93r-.js";import"./base-lit-element-D917_3Iy.js";import"./directive-CwRn8Fwj.js";import"./decorators-OLNLdARR.js";import"./service-adapter-DlT-lJx7.js";import"./property-CTzj-79N.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./base-DVmwUFg0.js";import"./class-map-EigTEi9S.js";import"./when-CI7b_ccM.js";import"./button-DT_Na7FY.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-BzR77xDT.js";import"./tyler-icons-DPuUJ4cJ.js";import"./constants-DVKvft47.js";import"./feature-detection-Cdqsoz5C.js";import"./state-layer-Y1FZSPuC.js";import"./base-component-DokdPcmx.js";import"./base-adapter-C2s8cO2K.js";import"./dom-utils-D38acdAW.js";import"./base-button-DBIl4sjK.js";import"./state-DlRZK4E4.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-CUlOUJ7O.js";import"./button-constants-Dh8wxsDb.js";import"./circular-progress-BL_OHw4o.js";import"./with-element-internals-BVdcaC_W.js";import"./dialog-D41xgR_D.js";import"./backdrop-Dvs4MPLP.js";import"./dismissible-stack-xq-0Rg1q.js";import"./linear-progress-VpC6qUWa.js";function s(i){const n={blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:l}),`
`,e.jsx(c,{}),`
`,e.jsx(n.p,{children:`Busy indicators are a specialized dialog that is used to indicate that a process is running and the user should wait. It is typically used when a process is
expected to take more than a few seconds to complete. The busy indicator is modal and will prevent the user from interacting with a part, or the rest of the
application until the process is complete.`}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"}),` The busy indicator is not intended to be used for processes that take less than a few seconds to complete. For processes that take less than a few
seconds, consider using a progress indicator instead.`]}),`
`,e.jsxs(n.p,{children:["Use the busy indicator sparingly, as it can be disruptive to the user experience. ",e.jsx(n.strong,{children:"Only use the busy indicator when it is absolutely necessary"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{id:"mode",children:"Mode"}),`
`,e.jsxs(n.p,{children:["Busy indicators are available in two modes: ",e.jsx(n.code,{children:"fullscreen"})," (default) and ",e.jsx(n.code,{children:"inline"}),"."]}),`
`,e.jsx(n.h3,{id:"fullscreen",children:"Fullscreen"}),`
`,e.jsx(n.p,{children:`The fullscreen mode is the default mode for the busy indicator. It will display a modal dialog that will prevent the user from interacting with the rest of the
application until the process is complete. The fullscreen mode is best used when the process is expected to take a long time to complete.`}),`
`,e.jsx(t,{of:a}),`
`,e.jsx(n.p,{children:"Fullscreen busy indicators are displayed in the top-layer above all other elements, and use fixed positioning to cover the viewport."}),`
`,e.jsx(n.h3,{id:"inline",children:"Inline"}),`
`,e.jsx(n.p,{children:`The inline mode will display the busy indicator inline with the rest of the content. The content will still be rendered within a dialog, but it is non-modal.
The inline mode is best used when the process is expected to take a short amount of time to complete, while still allowing the user to interact with the rest
of the application.`}),`
`,e.jsx(t,{of:h}),`
`,e.jsxs(n.p,{children:["Inline busy indicators are displayed in the normal flow of the document, use absolute positioning, and will ",e.jsx(n.strong,{children:"not"}),` prevent the user from interacting with the element
obscured by the busy indicator overlay, or other parts of the page. Make sure to disable user interaction with the obscured element(s) if necessary while the busy
indicator is visible.`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," When using the inline mode, make sure to provide a ",e.jsx(n.code,{children:"position: relative"}),` style to the parent element of the busy indicator to ensure that it is
positioned correctly and constrained within the parent element bounds.`]}),`
`]}),`
`,e.jsx(n.h2,{id:"variants",children:"Variants"}),`
`,e.jsx(n.p,{children:"The busy indicator is available in multiple variants:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"spinner"})," (default) - A simple spinner that indicates that a process is running. This can be accompanied by an optional title and/or message."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"progress"})," - A progress indicator that indicates the progress of a process. This can be accompanied by an optional title and/or message."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"message-only"})," - A message-only variant that displays a title and/or message to the user. This variant does not include a spinner or progress indicator."]}),`
`]}),`
`,e.jsx(n.h2,{id:"cancelable",children:"Cancelable"}),`
`,e.jsxs(n.p,{children:["The busy indicator can be made cancelable by providing a ",e.jsx(n.code,{children:"cancelable"}),` attribute. This will render a cancel button that the user can click to cancel the process
that is running. When the process is canceled, the busy indicator will dispatch a `,e.jsx(n.code,{children:"forge-busy-indicator-cancel"}),` event that can be used to handle the cancellation
however you see fit. You are responsible for closing the busy indicator manually after the event is dispatched.`]}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(d,{}),`
`,e.jsx(n.h2,{id:"angular-service",children:"Angular Service"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@tylertech/forge-extended-angular"})," package provides a ",e.jsx(n.code,{children:"BusyIndicatorService"})," that makes it easy to programmatically create and control busy indicators without managing the element directly in your template."]}),`
`,e.jsx(n.p,{children:"The service is provided at the root level and can be injected anywhere in your application."}),`
`,e.jsx(n.h3,{id:"usage",children:"Usage"}),`
`,e.jsx(n.p,{children:"Import the module and inject the service:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`import { BusyIndicatorService } from '@tylertech/forge-extended-angular';

@Component({ ... })
export class MyComponent {
  private _busyIndicatorService = inject(BusyIndicatorService);

  public doWork(): void {
    const ref = this._busyIndicatorService.open({ message: 'Loading...' });
    doSomethingAsync().finally(() => ref.hide());
  }
}
`})}),`
`,e.jsx(n.h3,{id:"busyindicatorserviceopenconfig-parent",children:e.jsx(n.code,{children:"BusyIndicatorService.open(config?, parent?)"})}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Parameter"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"config"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"Partial<BusyIndicatorComponent>"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"undefined"})}),e.jsx(n.td,{children:"Optional configuration to apply to the busy indicator element (any property on the component)."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"parent"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"HTMLElement"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"document.body"})}),e.jsx(n.td,{children:"The element to append the busy indicator to."})]})]})]}),`
`,e.jsxs(n.p,{children:["Returns a ",e.jsx(n.code,{children:"BusyIndicatorRef"})," instance."]}),`
`,e.jsx(n.h3,{id:"busyindicatorref",children:e.jsx(n.code,{children:"BusyIndicatorRef"})}),`
`,e.jsxs(n.p,{children:["The object returned by ",e.jsx(n.code,{children:"open()"})," provides the following API:"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Member"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"hide()"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"void"})}),e.jsx(n.td,{children:"Closes and removes the busy indicator from the DOM."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"nativeElement"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"BusyIndicatorComponent"})}),e.jsxs(n.td,{children:["The underlying ",e.jsx(n.code,{children:"<forge-busy-indicator>"})," element."]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"afterCancel"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"Observable<CustomEvent<void>>"})}),e.jsxs(n.td,{children:["Emits when the user clicks the cancel button. Only active when ",e.jsx(n.code,{children:"cancelable"})," is ",e.jsx(n.code,{children:"true"}),"."]})]})]})]}),`
`,e.jsx(n.h3,{id:"cancelable-example",children:"Cancelable Example"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`public doWork(): void {
  const ref = this._busyIndicatorService.open({
    message: 'Loading...',
    cancelable: true
  });

  ref.afterCancel.subscribe(() => {
    // Handle cancellation
    ref.hide();
  });
}
`})}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(n.p,{children:`The busy indicator is a dialog that will prevent the user from interacting with the parts of the page while the process is running. It is important to ensure
that the busy indicator is accessible to all users, including those using assistive technologies.`}),`
`,e.jsxs(n.p,{children:["To provide an accessible label for the busy indicator, use the ",e.jsx(n.code,{children:"label"}),` attribute. To also provide a description of the process that is running, use
the `,e.jsx(n.code,{children:"description"})," attribute. The values will be read out by screen readers to provide context to the user."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," By default the accessible lable and description will use the ",e.jsx(n.code,{children:"titleText"})," and ",e.jsx(n.code,{children:"message"})," properties respectively."]}),`
`]})]})}function Q(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{Q as default};
