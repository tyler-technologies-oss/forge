import{j as e,M as i,T as r,C as a}from"./blocks-BbELG15y.js";import{useMDXComponents as s}from"./index-qLYEO5N9.js";import{C as l}from"./CustomArgTypes-Do75qENf.js";import{B as h,D as c}from"./BottomSheet.stories-CUyBjQO5.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CMEs_sKn.js";import"./utils-CyDCReHh.js";import"./decorators-D64daar0.js";import"./style-map-qI3jyA2m.js";import"./directive-jorct-Oe.js";import"./ref-BRh9N0Ot.js";import"./service-adapter-CffG5Lhq.js";import"./bottom-sheet-DeyRABAG.js";import"./base-component-DX3NI00Q.js";import"./feature-detection-eeAKFJs_.js";import"./base-adapter-B0TZVCzP.js";import"./with-default-aria-BRt53Z3x.js";import"./a11y-utils-TtXB9tdK.js";import"./dialog-Dic_j1BD.js";import"./backdrop-ZqVEdIYI.js";import"./dismissible-stack-CFeZREPK.js";import"./utils-DU-9AqTO.js";import"./event-utils-C1SDeUaq.js";import"./button-DEHIh3j-.js";import"./tyler-icons-B0WPf66k.js";import"./index-DTwfV0k0.js";import"./focus-indicator-ChcxzYYX.js";import"./property-DINhNyE_.js";import"./base-lit-element-C98H3uYJ.js";import"./state-layer-u9rLNX9t.js";import"./base-button-core-Cusjz6VI.js";import"./with-label-aware-CY27dNzM.js";import"./toolbar-BK4uxBaY.js";function n(o){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:h}),`
`,e.jsx(r,{}),`
`,e.jsx(t.p,{children:"The bottom sheet is a surface that slides up from the bottom of the screen."}),`
`,e.jsx(a,{of:c}),`
`,e.jsx(t.h2,{id:"deprecation-notice",children:"Deprecation Notice"}),`
`,e.jsxs(t.p,{children:["The bottom sheet is now deprecated and can instead be replaced by the ",e.jsx(t.a,{href:"?path=/story/components-dialog--bottom-sheet",children:"dialog"}),` component combined
with the `,e.jsx(t.code,{children:'preset="bottom-sheet"'})," attribute."]}),`
`,e.jsx(t.p,{children:"The dialog component is preferred going forward due to its improved accessibility and flexibility."}),`
`,e.jsx(t.h2,{id:"angular-usage",children:"Angular Usage"}),`
`,e.jsxs(t.p,{children:["To make using the bottom sheet component easier and more seamless within an Angular application, use the ",e.jsx(t.code,{children:"@tylertech/forge-angular"})," Angular adapter library."]}),`
`,e.jsxs(t.p,{children:["This library provides a ",e.jsx(t.code,{children:"BottomSheetService"})," provider that can be injected, and used to easily render a dynamic Angular component within the Forge bottom sheet."]}),`
`,e.jsx(t.p,{children:`As an example, say we want to render a dynamically created confirmation bottom sheet component that offers the ability to change the title and message. We could create
a component like the following:`}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`import { Component } from '@angular/core';
import { BottomSheetConfig, BottomSheetRef } from '@tylertech/forge-angular';

@Component({
  selector: 'app-confirm-bottom-sheet',
  templateUrl: './confirm-bottom-sheet.component.html',
  styleUrls: ['./confirm-bottom-sheet.component.scss']
})
export class ConfirmBottomSheetComponent {
  public title: string;
  public message: string;

  constructor(
    public bottomSheetConfig: BottomSheetConfig,
    private _bottomSheetRef: BottomSheetRef
  ) {
    this.title = bottomSheetConfig.data.title;
    this.message = bottomSheetConfig.data.message;
  }

  public onCancel(): void {
    this._bottomSheetRef.close(false);
  }

  public onConfirm(): void {
    this._bottomSheetRef.close(true);
  }
}
`})}),`
`,e.jsxs(t.p,{children:["We could then inject the ",e.jsx(t.code,{children:"BottomSheetService"})," from the Forge adapter library, and show the dynamic component like this:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`import { Component } from '@angular/core';
import { BottomSheetService } from '@tylertech/forge-angular';

import { ConfirmBottomSheetComponent } from './confirm-bottom-sheet/confirm-bottom-sheet.component';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html'
})
export class BottomSheetExampleComponent {
  constructor(private _bottomSheetService: BottomSheetService) {}

  public showConfirmBottomSheet(): void {
    // Set any options to be applied to the <forge-bottom-sheet> component
    const bottomSheetOptions = {
      backdropClose: true,
      escapeClose: false
    };

    // Set up any data that can be injected into the dynamic component
    const bottomSheetConfig = {
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to close the bottom sheet?'
      }
    };

    // Show the bottom sheet
    const bottomSheetRef = this._bottomSheetService.show(ConfirmBottomSheetComponent, bottomSheetOptions, bottomSheetConfig);

    // Subscribe to the afterClosed observable to know when the bottom sheet is closed
    const sub = bottomSheetRef.afterClosed.subscribe(result => {
      console.log('Bottom sheet result:', result);
      sub.unsubscribe();
    });
  }
}
`})}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Ensure that keyboard navigation behaves properly and intuitively while the bottom sheet is open.",`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"In modal bottom sheets, keyboard navigation should be constrained only to within the modal bottom sheet."}),`
`,e.jsx(t.li,{children:"When the bottom sheet is closed, return focus to a logical element on the page."}),`
`]}),`
`]}),`
`,e.jsx(t.li,{children:"Ensure that if there is a way to close the bottom sheet via a mouse click, that there is also a way to close the bottom sheet via keyboard."}),`
`,e.jsxs(t.li,{children:["The bottom sheet component will add the ",e.jsx(t.code,{children:'role="dialog"'})," and ",e.jsx(t.code,{children:'aria-modal="true"'})," attribute if no role is specified."]}),`
`,e.jsxs(t.li,{children:["Be sure to set the ",e.jsx(t.code,{children:"aria-labelledby"})," and ",e.jsx(t.code,{children:"aria-describedby"})," attributes on the bottom sheet component.",`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"This will allow for a screen reader to properly announce the bottom sheet title and description when it opens."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(t.h2,{id:"focus",children:"Focus"}),`
`,e.jsx(t.p,{children:"Always give an element within the bottom sheet initial focus. In most cases, focus should be set on the first focusable element. There are some exceptions:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["If setting focus on the first focusable element would scroll content out of view, add ",e.jsx(t.code,{children:'tabindex="-1"'})," to a static element at the top of the bottom sheet (such as the title) and set focus on that."]}),`
`,e.jsx(t.li,{children:"If the first focusable element leads to a destructive, not easily reversible action, consider setting focus on the less destructive action instead."}),`
`,e.jsx(t.li,{children:'If a bottom sheet offers limited interaction and is likely to be quickly dismissed, such as an "Ok" or "Continue" bottom sheet, consider setting focus on the action that will be used most commonly.'}),`
`]}),`
`,e.jsx(t.p,{children:"When the bottom sheet closes, focus should return to the element that called the bottom sheet unless:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"The calling element doesn't exist, then set focus on another logical element."}),`
`,e.jsx(t.li,{children:"It makes more logical sense for focus to move to another element in the workflow, such as a bottom sheet to add form fields giving focus to the first input in the form."}),`
`]}),`
`,e.jsx(t.p,{children:"Always include a visible and clearly labelled button in the tab order to close the bottom sheet."}),`
`,e.jsx(t.h2,{id:"aria",children:"ARIA"}),`
`,e.jsxs(t.p,{children:["The bottom sheet component provides ",e.jsx(t.code,{children:'role="dialog"'})," and ",e.jsx(t.code,{children:'aria-modal="true"'})," attributes. Ensure that all elements necessary to use the bottom sheet are contained within the component."]}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"aria-labelledby"})," to reference a visible bottom sheet title. If the title isn't visible or doesn't exist, provide one as an ",e.jsx(t.code,{children:"aria-label"})," attribute or reference a visually hidden element."]}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"aria-describedby"}),` attribute can be set to reference elements that described the purpose of the bottom sheet. In bottom sheets with simple text content the entire body container can be referenced.
In more complex bottom sheets, it may make more sense to reference a subset of the text. If a bottom sheet has no static content that describes its purpose it is not necessary to provide a description.`]}),`
`,e.jsx(t.p,{children:"An example with a visible title and description:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-bottom-sheet aria-labelledby="bottom-sheet-title" aria-describedby="bottom-sheet-content">
  <header>
    <h1 id="bottom-sheet-title">Title</h1>
  </header>
  <div id="bottom-sheet-content">Simple text content</div>
</forge-bottom-sheet>
`})}),`
`,e.jsx(t.p,{children:"And an example with a hidden title and description:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-bottom-sheet aria-labelledby="bottom-sheet-title" aria-describedby="bottom-sheet-description">
  <span id="bottom-sheet-title" hidden>Title</span>
  <span id="bottom-sheet-description" hidden>Description</div>

  <div>Bottom sheet content</div>
</forge-bottom-sheet>
`})}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:"Bottom sheets are appended to the DOM as immediate children of the body, so the heading order should start at 1."}),`
`]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"Angular usage"})}),`
`,e.jsxs(t.p,{children:["When using the ",e.jsx(t.code,{children:"BottomSheetService"})," from the ",e.jsx(t.code,{children:"@tylertech/forge-angular"}),` package, attributes can
be set on the `,e.jsx(t.code,{children:"<forge-bottom-sheet>"})," element using the ",e.jsx(t.code,{children:"attributes"})," property of the ",e.jsx(t.code,{children:"IBottomSheetOptions"})," parameter:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-typescript",children:`const bottomSheetOptions: IBottomSheetOptions = {
  attributes: new Map([
    ['aria-labelledby', 'bottom-sheet-title'],
    ['aria-describedby', 'bottom-sheet-desc']
  ])
};
`})}),`
`]})]})}function G(o={}){const{wrapper:t}={...s(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{G as default};
