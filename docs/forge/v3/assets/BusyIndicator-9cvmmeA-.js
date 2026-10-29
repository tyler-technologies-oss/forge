import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnLnh7by.js";import{n as c,t as l}from"./CustomArgTypes-DS7Rl0eI.js";import{i as u,n as d,r as f,t as p}from"./BusyIndicator.stories-C76hQ_-Q.js";function m(e){let n={blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s,{of:p}),`
`,(0,g.jsx)(o,{}),`
`,(0,g.jsx)(n.p,{children:`Busy indicators are a specialized dialog that is used to indicate that a process is running and the user should wait. It is typically used when a process is
expected to take more than a few seconds to complete. The busy indicator is modal and will prevent the user from interacting with a part, or the rest of the
application until the process is complete.`}),`
`,(0,g.jsxs)(n.blockquote,{children:[`
`,(0,g.jsxs)(n.p,{children:[(0,g.jsx)(n.strong,{children:`Note:`}),` The busy indicator is not intended to be used for processes that take less than a few seconds to complete. For processes that take less than a few
seconds, consider using a progress indicator instead.`]}),`
`,(0,g.jsxs)(n.p,{children:[`Use the busy indicator sparingly, as it can be disruptive to the user experience. `,(0,g.jsx)(n.strong,{children:`Only use the busy indicator when it is absolutely necessary`}),`.`]}),`
`]}),`
`,(0,g.jsx)(n.h2,{id:`mode`,children:`Mode`}),`
`,(0,g.jsxs)(n.p,{children:[`Busy indicators are available in two modes: `,(0,g.jsx)(n.code,{children:`fullscreen`}),` (default) and `,(0,g.jsx)(n.code,{children:`inline`}),`.`]}),`
`,(0,g.jsx)(n.h3,{id:`fullscreen`,children:`Fullscreen`}),`
`,(0,g.jsx)(n.p,{children:`The fullscreen mode is the default mode for the busy indicator. It will display a modal dialog that will prevent the user from interacting with the rest of the
application until the process is complete. The fullscreen mode is best used when the process is expected to take a long time to complete.`}),`
`,(0,g.jsx)(a,{of:d}),`
`,(0,g.jsx)(n.p,{children:`Fullscreen busy indicators are displayed in the top-layer above all other elements, and use fixed positioning to cover the viewport.`}),`
`,(0,g.jsx)(n.h3,{id:`inline`,children:`Inline`}),`
`,(0,g.jsx)(n.p,{children:`The inline mode will display the busy indicator inline with the rest of the content. The content will still be rendered within a dialog, but it is non-modal.
The inline mode is best used when the process is expected to take a short amount of time to complete, while still allowing the user to interact with the rest
of the application.`}),`
`,(0,g.jsx)(a,{of:f}),`
`,(0,g.jsxs)(n.p,{children:[`Inline busy indicators are displayed in the normal flow of the document, use absolute positioning, and will `,(0,g.jsx)(n.strong,{children:`not`}),` prevent the user from interacting with the element
obscured by the busy indicator overlay, or other parts of the page. Make sure to disable user interaction with the obscured element(s) if necessary while the busy
indicator is visible.`]}),`
`,(0,g.jsxs)(n.blockquote,{children:[`
`,(0,g.jsxs)(n.p,{children:[(0,g.jsx)(n.strong,{children:`Note:`}),` When using the inline mode, make sure to provide a `,(0,g.jsx)(n.code,{children:`position: relative`}),` style to the parent element of the busy indicator to ensure that it is
positioned correctly and constrained within the parent element bounds.`]}),`
`]}),`
`,(0,g.jsx)(n.h2,{id:`variants`,children:`Variants`}),`
`,(0,g.jsx)(n.p,{children:`The busy indicator is available in multiple variants:`}),`
`,(0,g.jsxs)(n.ul,{children:[`
`,(0,g.jsxs)(n.li,{children:[(0,g.jsx)(n.code,{children:`spinner`}),` (default) - A simple spinner that indicates that a process is running. This can be accompanied by an optional title and/or message.`]}),`
`,(0,g.jsxs)(n.li,{children:[(0,g.jsx)(n.code,{children:`progress`}),` - A progress indicator that indicates the progress of a process. This can be accompanied by an optional title and/or message.`]}),`
`,(0,g.jsxs)(n.li,{children:[(0,g.jsx)(n.code,{children:`message-only`}),` - A message-only variant that displays a title and/or message to the user. This variant does not include a spinner or progress indicator.`]}),`
`]}),`
`,(0,g.jsx)(n.h2,{id:`cancelable`,children:`Cancelable`}),`
`,(0,g.jsxs)(n.p,{children:[`The busy indicator can be made cancelable by providing a `,(0,g.jsx)(n.code,{children:`cancelable`}),` attribute. This will render a cancel button that the user can click to cancel the process
that is running. When the process is canceled, the busy indicator will dispatch a `,(0,g.jsx)(n.code,{children:`forge-busy-indicator-cancel`}),` event that can be used to handle the cancellation
however you see fit. You are responsible for closing the busy indicator manually after the event is dispatched.`]}),`
`,(0,g.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,g.jsx)(l,{}),`
`,(0,g.jsx)(n.h2,{id:`angular-service`,children:`Angular Service`}),`
`,(0,g.jsxs)(n.p,{children:[`The `,(0,g.jsx)(n.code,{children:`@tylertech/forge-extended-angular`}),` package provides a `,(0,g.jsx)(n.code,{children:`BusyIndicatorService`}),` that makes it easy to programmatically create and control busy indicators without managing the element directly in your template.`]}),`
`,(0,g.jsx)(n.p,{children:`The service is provided at the root level and can be injected anywhere in your application.`}),`
`,(0,g.jsx)(n.h3,{id:`usage`,children:`Usage`}),`
`,(0,g.jsx)(n.p,{children:`Import the module and inject the service:`}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-typescript`,children:`import { BusyIndicatorService } from '@tylertech/forge-extended-angular';

@Component({ ... })
export class MyComponent {
  private _busyIndicatorService = inject(BusyIndicatorService);

  public doWork(): void {
    const ref = this._busyIndicatorService.open({ message: 'Loading...' });
    doSomethingAsync().finally(() => ref.hide());
  }
}
`})}),`
`,(0,g.jsx)(n.h3,{id:`busyindicatorserviceopenconfig-parent`,children:(0,g.jsx)(n.code,{children:`BusyIndicatorService.open(config?, parent?)`})}),`
`,(0,g.jsxs)(n.table,{children:[(0,g.jsx)(n.thead,{children:(0,g.jsxs)(n.tr,{children:[(0,g.jsx)(n.th,{children:`Parameter`}),(0,g.jsx)(n.th,{children:`Type`}),(0,g.jsx)(n.th,{children:`Default`}),(0,g.jsx)(n.th,{children:`Description`})]})}),(0,g.jsxs)(n.tbody,{children:[(0,g.jsxs)(n.tr,{children:[(0,g.jsx)(n.td,{children:(0,g.jsx)(n.code,{children:`config`})}),(0,g.jsx)(n.td,{children:(0,g.jsx)(n.code,{children:`Partial<BusyIndicatorComponent>`})}),(0,g.jsx)(n.td,{children:(0,g.jsx)(n.code,{children:`undefined`})}),(0,g.jsx)(n.td,{children:`Optional configuration to apply to the busy indicator element (any property on the component).`})]}),(0,g.jsxs)(n.tr,{children:[(0,g.jsx)(n.td,{children:(0,g.jsx)(n.code,{children:`parent`})}),(0,g.jsx)(n.td,{children:(0,g.jsx)(n.code,{children:`HTMLElement`})}),(0,g.jsx)(n.td,{children:(0,g.jsx)(n.code,{children:`document.body`})}),(0,g.jsx)(n.td,{children:`The element to append the busy indicator to.`})]})]})]}),`
`,(0,g.jsxs)(n.p,{children:[`Returns a `,(0,g.jsx)(n.code,{children:`BusyIndicatorRef`}),` instance.`]}),`
`,(0,g.jsx)(n.h3,{id:`busyindicatorref`,children:(0,g.jsx)(n.code,{children:`BusyIndicatorRef`})}),`
`,(0,g.jsxs)(n.p,{children:[`The object returned by `,(0,g.jsx)(n.code,{children:`open()`}),` provides the following API:`]}),`
`,(0,g.jsxs)(n.table,{children:[(0,g.jsx)(n.thead,{children:(0,g.jsxs)(n.tr,{children:[(0,g.jsx)(n.th,{children:`Member`}),(0,g.jsx)(n.th,{children:`Type`}),(0,g.jsx)(n.th,{children:`Description`})]})}),(0,g.jsxs)(n.tbody,{children:[(0,g.jsxs)(n.tr,{children:[(0,g.jsx)(n.td,{children:(0,g.jsx)(n.code,{children:`hide()`})}),(0,g.jsx)(n.td,{children:(0,g.jsx)(n.code,{children:`void`})}),(0,g.jsx)(n.td,{children:`Closes and removes the busy indicator from the DOM.`})]}),(0,g.jsxs)(n.tr,{children:[(0,g.jsx)(n.td,{children:(0,g.jsx)(n.code,{children:`nativeElement`})}),(0,g.jsx)(n.td,{children:(0,g.jsx)(n.code,{children:`BusyIndicatorComponent`})}),(0,g.jsxs)(n.td,{children:[`The underlying `,(0,g.jsx)(n.code,{children:`<forge-busy-indicator>`}),` element.`]})]}),(0,g.jsxs)(n.tr,{children:[(0,g.jsx)(n.td,{children:(0,g.jsx)(n.code,{children:`afterCancel`})}),(0,g.jsx)(n.td,{children:(0,g.jsx)(n.code,{children:`Observable<CustomEvent<void>>`})}),(0,g.jsxs)(n.td,{children:[`Emits when the user clicks the cancel button. Only active when `,(0,g.jsx)(n.code,{children:`cancelable`}),` is `,(0,g.jsx)(n.code,{children:`true`}),`.`]})]})]})]}),`
`,(0,g.jsx)(n.h3,{id:`cancelable-example`,children:`Cancelable Example`}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-typescript`,children:`public doWork(): void {
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
`,(0,g.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,g.jsx)(n.p,{children:`The busy indicator is a dialog that will prevent the user from interacting with the parts of the page while the process is running. It is important to ensure
that the busy indicator is accessible to all users, including those using assistive technologies.`}),`
`,(0,g.jsxs)(n.p,{children:[`To provide an accessible label for the busy indicator, use the `,(0,g.jsx)(n.code,{children:`label`}),` attribute. To also provide a description of the process that is running, use
the `,(0,g.jsx)(n.code,{children:`description`}),` attribute. The values will be read out by screen readers to provide context to the user.`]}),`
`,(0,g.jsxs)(n.blockquote,{children:[`
`,(0,g.jsxs)(n.p,{children:[(0,g.jsx)(n.strong,{children:`Note:`}),` By default the accessible lable and description will use the `,(0,g.jsx)(n.code,{children:`titleText`}),` and `,(0,g.jsx)(n.code,{children:`message`}),` properties respectively.`]}),`
`]})]})}function h(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,g.jsx)(n,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;function _(){return(_=e((()=>{g=r(),n(),i(),c(),u()})))()}_();export{h as default};