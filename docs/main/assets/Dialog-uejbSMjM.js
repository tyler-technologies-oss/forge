import{j as e,M as s,T as a,C as i}from"./index-DkPbKkzq.js";import{useMDXComponents as l}from"./index-9YUbAevh.js";import{C as r}from"./CustomArgTypes-CHEeFykV.js";import{C as d}from"./CssOnlyInformation-DvaEaGfE.js";import{D as c,a as h,C as p}from"./Dialog.stories-C7A3XHA_.js";import"./iframe-B2uDmC2W.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-CAzToGr2.js";import"./feature-detection-ONR9WHvu.js";import"./dialog-B9LsXUuI.js";import"./constants-BjnHqKgS.js";import"./base-adapter-CQdYccXX.js";import"./backdrop-BIqxiwQa.js";import"./with-default-aria-BcIvJ7-x.js";import"./a11y-utils-BOPvdiVn.js";import"./dismissible-stack-9mJiid_W.js";import"./focus-indicator-R2otSvsR.js";import"./index-BmocOEUj.js";import"./icon-B5S0VGIT.js";import"./index-ByifSpfC.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./class-map-D55lQyt8.js";import"./directive-CF8sV3Lr.js";import"./decorators-DOnQS6BC.js";import"./chunk-D5ZWXAHU-CGElDDNX.js";import"./v4-CQkTLCs1.js";import"./icon-button-DfODsaKD.js";import"./base-button-adapter-OmzAW3c3.js";import"./with-label-aware-DAaZnhel.js";import"./state-layer-B7GOb8iB.js";import"./button-vPgaRyW5.js";import"./scaffold-BAruaYLU.js";import"./toolbar-Lhya2ayG.js";function t(n){const o={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c}),`
`,e.jsx(a,{}),`
`,e.jsx(o.p,{children:`Dialogs are used to display content in a layer above the rest of the page. They are typically used for
confirmations, alerts, or to display additional information. Dialogs can be modal or non-modal.`}),`
`,e.jsx(i,{of:h}),`
`,e.jsxs(o.blockquote,{children:[`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"<forge-dialog>"})," uses the native ",e.jsx(o.code,{children:"<dialog>"})," element under the hood, which is now supported in all modern browsers."]}),`
`]}),`
`,e.jsx(o.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(o.p,{children:"When creating a dialog it is important to consider the following:"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"Content"}),": The content of the dialog should be clear and concise. Use semantic elements to structure the content."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"Actions"}),': Provide clear actions for the user to take. Use buttons to provide actions such as "Cancel" or "Save".']}),`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"Accessibility"}),": Ensure that the dialog is accessible to all users. Use the ",e.jsx(o.code,{children:"aria-labelledby"})," and ",e.jsx(o.code,{children:"aria-describedby"})," attributes to provide context to screen readers."]}),`
`]}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"<forge-dialog>"}),` will size itself based on the content that it contains. You should always use a single root element within the dialog to ensure proper sizing. It is
common to compose the `,e.jsx(o.code,{children:"<forge-dialog>"})," together with the ",e.jsx(o.code,{children:"<forge-scaffold>"})," to provide a consistent layout."]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-html",children:`<forge-dialog aria-labelledby="dialog-title" aria-describedby="dialog-description">
  <forge-scaffold>
    <forge-toolbar slot="header">
      <h2 slot="start id="dialog-title">Dialog Title</h2>
    </forge-toolbar>
    <p id="dialog-description">Dialog Description</p>
    <forge-toolbar slot="footer">
      <forge-button slot="end">Close</forge-button>
    </forge-toolbar>
  </forge-scaffold>
</forge-dialog>
`})}),`
`,e.jsxs(o.p,{children:["To ensure that your scaffold can flex with the dialog surface on smaller screens, make sure to apply the ",e.jsx(o.code,{children:"height: auto"})," style to the ",e.jsx(o.code,{children:"<forge-scaffold>"}),` element. This
is because the scaffold uses a `,e.jsx(o.code,{children:"height: 100%"})," by default which can cause the dialog to overflow on smaller screens."]}),`
`,e.jsxs(o.p,{children:["Additionally, you can set a ",e.jsx(o.code,{children:"width"})," or ",e.jsx(o.code,{children:"min-width"})," on the ",e.jsx(o.code,{children:"<forge-scaffold>"})," element to ensure that the dialog is not too narrow and/or wide in various screens sizes."]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-css",children:`forge-scaffold {
  height: auto;
  width: 100%;
  min-width: 500px;
}
`})}),`
`,e.jsx(o.h3,{id:"fullscreen",children:"Fullscreen"}),`
`,e.jsxs(o.p,{children:["Dialogs can be displayed in fullscreen mode by setting the ",e.jsx(o.code,{children:"fullscreen"}),` property or attribute. This will cause the dialog to fit the viewport height and width, and is
typically used on smaller viewports and mobile devices.`]}),`
`,e.jsxs(o.p,{children:["Additionally, the dialog will automatically adjust itself to be fullscreen when the viewport width is less than ",e.jsx(o.code,{children:"600px"}),`. This is to ensure that the dialog is always usable
on smaller screens, and to alleviate the burden for developers to manage this manually since it is a common desired behavior.`]}),`
`,e.jsxs(o.p,{children:["If you need to adjust the breakpoint at which the dialog switches to fullscreen mode, you can use the ",e.jsx(o.code,{children:"fullscreenThreshold"}),` property to set a custom breakpoint in pixels. Or
if you'd like to disable the automatic fullscreen functionality entirely, you can set the `,e.jsx(o.code,{children:"fullscreenThreshold"})," property to ",e.jsx(o.code,{children:"0"}),` and the dialog will never automatically switch
to fullscreen unless you explicitly set the `,e.jsx(o.code,{children:"fullscreen"})," attribute."]}),`
`,e.jsx(o.h3,{id:"focus-trap",children:"Focus Trap"}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"<forge-dialog>"})," uses the native ",e.jsx(o.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog",rel:"nofollow",children:"<dialog>"}),` element under the hood, which
automatically traps focus within the dialog when it is open by making the rest of the page `,e.jsx(o.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert",rel:"nofollow",children:"inert"}),`.
This means that users cannot interact with elements outside of the dialog content while it is open.`]}),`
`,e.jsxs(o.p,{children:["Previous implementations of Forge did not use the native ",e.jsx(o.code,{children:"<dialog>"}),` element, and adding focus traps required additional JavaScript to implement. This is no longer the case,
and you should be able to safely remove any focus trap logic or libraries now!`]}),`
`,e.jsxs(o.blockquote,{children:[`
`,e.jsxs(o.p,{children:[e.jsx(o.strong,{children:"Note"}),`: the focus is not "cycled" within the dialog content. The user can tab out of it to the browser itself. This is expected and it's an important accessibility feature.`]}),`
`]}),`
`,e.jsx(o.h3,{id:"modes",children:"Modes"}),`
`,e.jsx(o.p,{children:"Dialogs modes are used to determine how the dialog is displayed on the page. The following modes are available:"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"modal"}),": Renders the modal in the ",e.jsx(o.a,{href:"https://developer.mozilla.org/en-US/docs/Glossary/Top_layer",rel:"nofollow",children:"top layer"})," above all other content with a backdrop, and the rest of the page is ",e.jsx(o.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert",rel:"nofollow",children:"inert"}),"."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"nonmodal"}),": Renders the dialog in the normal flow of the page, but still above other content within its ",e.jsx(o.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block",rel:"nofollow",children:"containing block"}),"."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"inline-modal"}),": Renders the dialog in the normal flow of the page, but still above other content within its containing block, and with a backdrop. The rest of the page is ",e.jsx(o.strong,{children:"not"})," inert with this mode."]}),`
`]}),`
`,e.jsx(o.h3,{id:"presets",children:"Presets"}),`
`,e.jsx(o.p,{children:"The dialog component supports a number of presets to help you style your dialog. The following presets are available:"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"dialog"}),": The default dialog style centered in the viewport."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"left-sheet"}),": A dialog that slides in from the left side of the viewport."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"right-sheet"}),": A dialog that slides in from the right side of the viewport."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"bottom-sheet"}),": A dialog that slides in from the bottom of the viewport."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"top-sheet"}),": A dialog that slides in from the top of the viewport."]}),`
`]}),`
`,e.jsx(o.p,{children:"You can use the sidesheet presets in place of modal drawers or sidebars to display additional information or actions."}),`
`,e.jsx(o.h2,{id:"inline-usage",children:"Inline Usage"}),`
`,e.jsxs(o.p,{children:["While dialogs are typically created dynamically and appended to the document, you can also use them inline in your HTML declaratively without any JavaScript via the ",e.jsx(o.code,{children:"trigger"})," attribute:"]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-html",children:`<button id="open-dialog">Open dialog</button>

<forge-dialog trigger="open-dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description">
  <h2 id="dialog-title">Dialog Title</h2>
  <p id="dialog-description">Dialog Description</p>
</forge-dialog>
`})}),`
`,e.jsx(o.h2,{id:"angular-adapter",children:"Angular Adapter"}),`
`,e.jsxs(o.p,{children:["In Angular it is common to show dialogs dynamically with Angular components rendered inside the dialog via services. The ",e.jsx(o.code,{children:"@tylertech/forge-angular"}),`
adapter library provides the `,e.jsx(o.code,{children:"DialogService"})," to make this easy."]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-typescript",children:`import { Component, Inject } from '@angular/core';
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
      attributes: new Map([
        ['aria-labelledby', 'dialog-title'],
        ['aria-describedby', 'dialog-description']
      ])
    };

    // Data to inject into your Angular component via the \`@Inject(DIALOG_DATA)\` provider
    const data = {
      title: 'Dialog Title',
      description: 'Dialog Description'
    };

    // Show the dialog with your Angular component
    const dialogRef = this.dialogService.open(MyDialogComponent, { options, data });

    // Listen to dialog lifecycle events
    dialogRef.beforeClose.pipe(takeUntil(dialogRef.afterClosed)).subscribe(() => {
      console.log('Dialog closing');
    });

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
      <h2 id="dialog-title">{{ data.title }}</h2>
      <p id="dialog-description">{{ data.description }}</p>
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
`,e.jsx(o.h2,{id:"api",children:"API"}),`
`,e.jsx(r,{}),`
`,e.jsx(o.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:["Ensure that keyboard navigation behaves properly and intuitively while the dialog is open.",`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:"In modal dialogs, keyboard navigation should be constrained only to within the modal dialog."}),`
`,e.jsx(o.li,{children:"When the dialog is closed, return focus to a logical element on the page."}),`
`]}),`
`]}),`
`,e.jsx(o.li,{children:"Ensure that if there is a way to close the dialog via a mouse click, that there is also a way to close the dialog via keyboard."}),`
`,e.jsxs(o.li,{children:["The dialog component will add the ",e.jsx(o.code,{children:'role="dialog"'})," and ",e.jsx(o.code,{children:'aria-modal="true"'})," attribute for you."]}),`
`,e.jsxs(o.li,{children:["Be sure to set the ",e.jsx(o.code,{children:"aria-labelledby"})," and ",e.jsx(o.code,{children:"aria-describedby"})," attributes on the ",e.jsx(o.code,{children:"<forge-dialog>"})," element.",`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:"This will allow for a screen reader to properly announce the dialog title and description when it opens."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(o.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(o.p,{children:"The dialog component is also available as a CSS-only component without the need for JavaScript."}),`
`,e.jsx(i,{of:p}),`
`,e.jsx(d,{})]})}function Q(n={}){const{wrapper:o}={...l(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(t,{...n})}):t(n)}export{Q as default};
