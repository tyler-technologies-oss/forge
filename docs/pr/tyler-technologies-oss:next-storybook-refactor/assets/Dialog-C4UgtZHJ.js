import{j as e}from"./jsx-runtime-DDXDZejy.js";import{u as t}from"./index-BUQjNWRB.js";import{M as l,T as r,C as a}from"./index-BnEmUiTu.js";import{C as s}from"./CustomArgTypes-DhIS_6WX.js";import{D as d,a as c}from"./Dialog.stories-DSRH7xiP.js";import"./iframe-BHbjAhW9.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./constants-OjHl0HLu.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./chunk-MZXVCX43-CM0pFb8Z.js";import"./v4-CQkTLCs1.js";import"./index-Dd7dh6lc.js";import"./icon-CXFBswE6.js";import"./base-adapter-BDBPGVvN.js";import"./index-Dh0vMUMR.js";import"./icon-button-D-bdMDbw.js";import"./base-button-adapter-DxtFJsCN.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-BuWYk4m7.js";import"./event-utils-gODbtzKd.js";import"./focus-indicator-xDqLecAx.js";import"./utils-_KxxXSob.js";import"./state-layer-BtFw0xlf.js";import"./button-C8PnG67y.js";import"./dialog-CRN8WRJU.js";import"./backdrop-Bczj-Pru.js";import"./dismissible-stack-DXt6aUkq.js";import"./scaffold-DLYaq2P_.js";import"./toolbar-BbYbOcTa.js";import"./decorators-B79PnA5z.js";function n(i){const o={blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:d}),`
`,e.jsx(r,{}),`
`,e.jsx(o.p,{children:`Dialogs are used to display content in a layer above the rest of the page. They are typically used for
confirmations, alerts, or to display additional information. Dialogs can be modal or non-modal.`}),`
`,e.jsx(a,{of:c}),`
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
`,e.jsxs(o.blockquote,{children:[`
`,e.jsx(o.p,{children:"Set a width or minimum width on the dialog content to ensure that the dialog is not too narrow and/or wide in various screens sizes."}),`
`]}),`
`,e.jsx(o.h3,{id:"modes",children:"Modes"}),`
`,e.jsx(o.p,{children:"Dialogs modes are used to determine how the dialog is displayed on the page. The following modes are available:"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"modal"}),": Renders the modal in the top-layer above all other content with a backdrop, and the rest of the page is inert."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"nonmodal"}),": Renders the dialog in the normal flow of the page, but still above other content within its containing block."]}),`
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
import { DIALOG_DATA, DialogConfig, DialogRef } from '@tylertech/forge-angular';

@Component({
  selector: 'app-my-component',
  template: \`
    <button (click)="openDialog()">Open Dialog</button>
  \`
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
  template: \`
    <forge-dialog>
      <h2 id="dialog-title">{{ data.title }}</h2>
      <p id="dialog-description">{{ data.description }}</p>
      <button (click)="onClose()">Close</button>
    </forge-dialog>
  \`
})
export class MyDialogComponent {
  constructor(@Inject(DIALOG_DATA) public data: IConfirmDialogData, private _dialogRef: DialogRef) {}

  public onClose(): void {
    this._dialogRef.close();
  }
}
`})}),`
`,e.jsx(o.h2,{id:"api",children:"API"}),`
`,e.jsx(s,{}),`
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
`]})]})}function H(i={}){const{wrapper:o}={...t(),...i.components};return o?e.jsx(o,{...i,children:e.jsx(n,{...i})}):n(i)}export{H as default};
