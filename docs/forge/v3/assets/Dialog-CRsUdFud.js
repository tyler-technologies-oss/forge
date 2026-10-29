import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnLnh7by.js";import{n as c,t as l}from"./CustomArgTypes-DS7Rl0eI.js";import{n as u,t as d}from"./CssOnlyInformation-LNVWbV40.js";import{i as f,n as p,r as m,t as h}from"./Dialog.stories-DZ-Dxd2D.js";function g(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(s,{of:m}),`
`,(0,v.jsx)(o,{}),`
`,(0,v.jsx)(n.p,{children:`Dialogs are used to display content in a layer above the rest of the page. They are typically used for
confirmations, alerts, or to display additional information. Dialogs can be modal or non-modal.`}),`
`,(0,v.jsx)(a,{of:p}),`
`,(0,v.jsxs)(n.blockquote,{children:[`
`,(0,v.jsxs)(n.p,{children:[`The `,(0,v.jsx)(n.code,{children:`<forge-dialog>`}),` uses the native `,(0,v.jsx)(n.code,{children:`<dialog>`}),` element under the hood, which is now supported in all modern browsers.`]}),`
`]}),`
`,(0,v.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,v.jsx)(n.p,{children:`When creating a dialog it is important to consider the following:`}),`
`,(0,v.jsxs)(n.ul,{children:[`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.strong,{children:`Content`}),`: The content of the dialog should be clear and concise. Use semantic elements to structure the content.`]}),`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.strong,{children:`Actions`}),`: Provide clear actions for the user to take. Use buttons to provide actions such as "Cancel" or "Save".`]}),`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.strong,{children:`Accessibility`}),`: Ensure that the dialog is accessible to all users. Use the `,(0,v.jsx)(n.code,{children:`label`}),` and `,(0,v.jsx)(n.code,{children:`description`}),` attributes to provide context to screen readers.`,`
`,(0,v.jsxs)(n.ul,{children:[`
`,(0,v.jsxs)(n.li,{children:[`You can not use the standard `,(0,v.jsx)(n.code,{children:`aria-labelledby`}),` and `,(0,v.jsx)(n.code,{children:`aria-describedby`}),` attributes on the `,(0,v.jsx)(n.code,{children:`<forge-dialog>`}),` element as they cannot be set on the internal native `,(0,v.jsx)(n.code,{children:`<dialog>`}),` element
due to browser limitations. Instead, use the `,(0,v.jsx)(n.code,{children:`label`}),` and `,(0,v.jsx)(n.code,{children:`description`}),` attributes to provide the same functionality and we'll add the necessary ARIA attributes for you.`]}),`
`,(0,v.jsx)(n.li,{children:`When the browsers support ARIA attributes across shadow boundaries in the future, we will update the component to use the standard attributes and make an announcement.`}),`
`]}),`
`]}),`
`]}),`
`,(0,v.jsxs)(n.p,{children:[`The `,(0,v.jsx)(n.code,{children:`<forge-dialog>`}),` will size itself based on the content that it contains. You should always use a single root element within the dialog to ensure proper sizing. It is
common to compose the `,(0,v.jsx)(n.code,{children:`<forge-dialog>`}),` together with the `,(0,v.jsx)(n.code,{children:`<forge-scaffold>`}),` to provide a consistent layout.`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-html`,children:`<forge-dialog label="My dialog title" description="My dialog description">
  <forge-scaffold>
    <forge-toolbar slot="header">
      <h2 slot="start">Dialog Title</h2>
    </forge-toolbar>
    <p>Dialog Description</p>
    <forge-toolbar slot="footer">
      <forge-button slot="end">Close</forge-button>
    </forge-toolbar>
  </forge-scaffold>
</forge-dialog>
`})}),`
`,(0,v.jsxs)(n.p,{children:[`To ensure that your scaffold can flex with the dialog surface on smaller screens, make sure to apply the `,(0,v.jsx)(n.code,{children:`height: auto`}),` style to the `,(0,v.jsx)(n.code,{children:`<forge-scaffold>`}),` element. This
is because the scaffold uses a `,(0,v.jsx)(n.code,{children:`height: 100%`}),` by default which can cause the dialog to overflow on smaller screens.`]}),`
`,(0,v.jsxs)(n.p,{children:[`Additionally, you can set a `,(0,v.jsx)(n.code,{children:`width`}),` or `,(0,v.jsx)(n.code,{children:`min-width`}),` on the `,(0,v.jsx)(n.code,{children:`<forge-scaffold>`}),` element to ensure that the dialog is not too narrow and/or wide in various screens sizes.`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-css`,children:`forge-scaffold {
  height: auto;
  width: 100%;
  min-width: 500px;
}
`})}),`
`,(0,v.jsx)(n.h3,{id:`prevent-close`,children:`Prevent Close`}),`
`,(0,v.jsxs)(n.p,{children:[`You can prevent the dialog from closing by listening for the `,(0,v.jsx)(n.code,{children:`forge-dialog-before-close`}),` event and calling `,(0,v.jsx)(n.code,{children:`event.preventDefault()`}),`.
This can be useful when you need to validate user input before closing the dialog, or show a progress indicator while an async operation completes
before closing the dialog.`]}),`
`,(0,v.jsxs)(n.blockquote,{children:[`
`,(0,v.jsxs)(n.p,{children:[(0,v.jsx)(n.strong,{children:`Note:`}),` The `,(0,v.jsx)(n.code,{children:`forge-dialog-before-close`}),` event is only dispatched in response to light dismiss actions, such as clicking the backdrop or pressing the `,(0,v.jsx)(n.code,{children:`Escape`}),` key.`]}),`
`]}),`
`,(0,v.jsx)(n.h3,{id:`fullscreen`,children:`Fullscreen`}),`
`,(0,v.jsxs)(n.p,{children:[`Dialogs can be displayed in fullscreen mode by setting the `,(0,v.jsx)(n.code,{children:`fullscreen`}),` property or attribute. This will cause the dialog to fit the viewport height and width, and is
typically used on smaller viewports and mobile devices.`]}),`
`,(0,v.jsxs)(n.p,{children:[`Additionally, the dialog will automatically adjust itself to be fullscreen when the viewport width is less than `,(0,v.jsx)(n.code,{children:`600px`}),`. This is to ensure that the dialog is always usable
on smaller screens, and to alleviate the burden for developers to manage this manually since it is a common desired behavior.`]}),`
`,(0,v.jsxs)(n.p,{children:[`If you need to adjust the breakpoint at which the dialog switches to fullscreen mode, you can use the `,(0,v.jsx)(n.code,{children:`fullscreenThreshold`}),` property to set a custom breakpoint in pixels. Or
if you'd like to disable the automatic fullscreen functionality entirely, you can set the `,(0,v.jsx)(n.code,{children:`fullscreenThreshold`}),` property to `,(0,v.jsx)(n.code,{children:`0`}),` and the dialog will never automatically switch
to fullscreen unless you explicitly set the `,(0,v.jsx)(n.code,{children:`fullscreen`}),` attribute.`]}),`
`,(0,v.jsx)(n.h3,{id:`focus-trap`,children:`Focus Trap`}),`
`,(0,v.jsxs)(n.p,{children:[`The `,(0,v.jsx)(n.code,{children:`<forge-dialog>`}),` uses the native `,(0,v.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog`,rel:`nofollow`,children:`<dialog>`}),` element under the hood, which
automatically traps focus within the dialog when it is open by making the rest of the page `,(0,v.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert`,rel:`nofollow`,children:`inert`}),`.
This means that users cannot interact with elements outside of the dialog content while it is open.`]}),`
`,(0,v.jsxs)(n.p,{children:[`Previous implementations of Forge did not use the native `,(0,v.jsx)(n.code,{children:`<dialog>`}),` element, and adding focus traps required additional JavaScript to implement. This is no longer the case,
and you should be able to safely remove any focus trap logic or libraries now!`]}),`
`,(0,v.jsxs)(n.blockquote,{children:[`
`,(0,v.jsxs)(n.p,{children:[(0,v.jsx)(n.strong,{children:`Note`}),`: the focus is not "cycled" within the dialog content. The user can tab out of it to the browser itself. This is expected and it's an important accessibility feature.`]}),`
`]}),`
`,(0,v.jsx)(n.h3,{id:`modes`,children:`Modes`}),`
`,(0,v.jsx)(n.p,{children:`Dialogs modes are used to determine how the dialog is displayed on the page. The following modes are available:`}),`
`,(0,v.jsxs)(n.ul,{children:[`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`modal`}),`: Renders the modal in the `,(0,v.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Glossary/Top_layer`,rel:`nofollow`,children:`top layer`}),` above all other content with a backdrop, and the rest of the page is `,(0,v.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert`,rel:`nofollow`,children:`inert`}),`.`]}),`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`nonmodal`}),`: Renders the dialog in the normal flow of the page, but still above other content within its `,(0,v.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block`,rel:`nofollow`,children:`containing block`}),`.`]}),`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`inline-modal`}),`: Renders the dialog in the normal flow of the page, but still above other content within its containing block, and with a backdrop. The rest of the page is `,(0,v.jsx)(n.strong,{children:`not`}),` inert with this mode.`]}),`
`]}),`
`,(0,v.jsx)(n.h3,{id:`presets`,children:`Presets`}),`
`,(0,v.jsx)(n.p,{children:`The dialog component supports a number of presets to help you style your dialog. The following presets are available:`}),`
`,(0,v.jsxs)(n.ul,{children:[`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`dialog`}),`: The default dialog style centered in the viewport.`]}),`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`left-sheet`}),`: A dialog that slides in from the left side of the viewport.`]}),`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`right-sheet`}),`: A dialog that slides in from the right side of the viewport.`]}),`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`bottom-sheet`}),`: A dialog that slides in from the bottom of the viewport.`]}),`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`top-sheet`}),`: A dialog that slides in from the top of the viewport.`]}),`
`]}),`
`,(0,v.jsx)(n.p,{children:`You can use the sidesheet presets in place of modal drawers or sidebars to display additional information or actions.`}),`
`,(0,v.jsx)(n.h2,{id:`inline-usage`,children:`Inline Usage`}),`
`,(0,v.jsxs)(n.p,{children:[`While dialogs are typically created dynamically and appended to the document, you can also use them inline in your HTML declaratively without any JavaScript via the `,(0,v.jsx)(n.code,{children:`trigger`}),` attribute:`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-html`,children:`<button id="open-dialog">Open dialog</button>

<forge-dialog trigger="open-dialog" label="My dialog title" description="My dialog description">
  <h2>Dialog Title</h2>
  <p>Dialog Description</p>
</forge-dialog>
`})}),`
`,(0,v.jsx)(n.h2,{id:`angular-adapter`,children:`Angular Adapter`}),`
`,(0,v.jsxs)(n.p,{children:[`In Angular it is common to show dialogs dynamically with Angular components rendered inside the dialog via services. The `,(0,v.jsx)(n.code,{children:`@tylertech/forge-angular`}),`
adapter library provides the `,(0,v.jsx)(n.code,{children:`DialogService`}),` to make this easy.`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-typescript`,children:`import { Component, Inject } from '@angular/core';
import { DialogService } from '@tylertech/forge-angular';
import { DIALOG_DATA, DialogRef } from '@tylertech/forge-angular';

@Component({
  selector: 'app-my-component',
  template: \` <button (click)="openDialog()">Open Dialog</button> \`
})
export class MyComponent {
  constructor(private dialogService: DialogService) {}

  openDialog() {
    // Configuration to pass to the \`<forge-dialog>\` element
    const options: IDialogOptions = {
      preset: 'right-sheet',
      label: 'My dialog title',
      description: 'My dialog description',
    };

    // Data to inject into your Angular component via the \`@Inject(DIALOG_DATA)\` provider
    const data = {
      title: 'Dialog Title',
      description: 'Dialog Description'
    };

    // Show the dialog with your Angular component
    const dialogRef = this.dialogService.open(MyDialogComponent, { options, data });

    // Listen to dialog lifecycle events
    // This observable will emit when the forge-dialog-before-close event is dispatched
    dialogRef.beforeClose.pipe(takeUntil(dialogRef.afterClosed)).subscribe(evt => {
      evt.preventDefault(); // Prevent the dialog from closing, if needed
      console.log('Dialog closing');
    });

    // This observable will emit when the forge-dialog-close event is dispatched
    dialogRef.afterClosed.subscribe(() => {
      console.log('Dialog closed');
    });
  }
}

export interface IConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-my-dialog',
  styles: ['
    .container {
      width: 500px;
    }
  '],
  template: \`
    <div class="container">
      <h2>{{ data.title }}</h2>
      <p>{{ data.description }}</p>
      <button (click)="onClose()">Close</button>
    </div>
  \`
})
export class MyDialogComponent {
  constructor(
    @Inject(DIALOG_DATA) public data: IConfirmDialogData,
    private _dialogRef: DialogRef
  ) {}

  public onClose(): void {
    this._dialogRef.close();
  }
}
`})}),`
`,(0,v.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,v.jsx)(l,{}),`
`,(0,v.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,v.jsxs)(n.ul,{children:[`
`,(0,v.jsxs)(n.li,{children:[`Ensure that keyboard navigation behaves properly and intuitively while the dialog is open.`,`
`,(0,v.jsxs)(n.ul,{children:[`
`,(0,v.jsx)(n.li,{children:`In modal dialogs, keyboard navigation should be constrained only to within the modal dialog.`}),`
`,(0,v.jsx)(n.li,{children:`When the dialog is closed, return focus to a logical element on the page.`}),`
`]}),`
`]}),`
`,(0,v.jsx)(n.li,{children:`Ensure that if there is a way to close the dialog via a mouse click, that there is also a way to close the dialog via keyboard.`}),`
`,(0,v.jsxs)(n.li,{children:[`The dialog component will add the `,(0,v.jsx)(n.code,{children:`role="dialog"`}),` and `,(0,v.jsx)(n.code,{children:`aria-modal="true"`}),` attribute for you.`]}),`
`,(0,v.jsxs)(n.li,{children:[`Be sure to set the `,(0,v.jsx)(n.code,{children:`label`}),` and `,(0,v.jsx)(n.code,{children:`description`}),` attributes on the `,(0,v.jsx)(n.code,{children:`<forge-dialog>`}),` element.`,`
`,(0,v.jsxs)(n.ul,{children:[`
`,(0,v.jsx)(n.li,{children:`This will allow for a screen reader to properly announce the dialog title and description when it opens.`}),`
`,(0,v.jsxs)(n.li,{children:[`The `,(0,v.jsx)(n.code,{children:`aria-labelledby`}),` and `,(0,v.jsx)(n.code,{children:`aria-describedby`}),` attributes will be set automatically for you based on the `,(0,v.jsx)(n.code,{children:`label`}),` and `,(0,v.jsx)(n.code,{children:`description`}),` attributes.`]}),`
`]}),`
`]}),`
`]}),`
`,(0,v.jsx)(n.h2,{id:`css-only`,children:`CSS-Only`}),`
`,(0,v.jsx)(n.p,{children:`The dialog component is also available as a CSS-only component without the need for JavaScript.`}),`
`,(0,v.jsx)(a,{of:h}),`
`,(0,v.jsx)(d,{})]})}function _(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,v.jsx)(n,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;function y(){return(y=e((()=>{v=r(),n(),i(),c(),u(),f()})))()}y();export{_ as default};