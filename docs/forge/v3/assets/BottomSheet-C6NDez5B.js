import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnLnh7by.js";import{n as c,t as l}from"./CustomArgTypes-DS7Rl0eI.js";import{n as u,r as d,t as f}from"./BottomSheet.stories-BnE8zyLf.js";function p(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:f}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsx)(n.p,{children:`The bottom sheet is a surface that slides up from the bottom of the screen.`}),`
`,(0,h.jsx)(a,{of:u}),`
`,(0,h.jsx)(n.h2,{id:`deprecation-notice`,children:`Deprecation Notice`}),`
`,(0,h.jsxs)(n.p,{children:[`The bottom sheet is now deprecated and can instead be replaced by the `,(0,h.jsx)(n.a,{href:`?path=/story/components-dialog--bottom-sheet`,children:`dialog`}),` component combined
with the `,(0,h.jsx)(n.code,{children:`preset="bottom-sheet"`}),` attribute.`]}),`
`,(0,h.jsx)(n.p,{children:`The dialog component is preferred going forward due to its improved accessibility and flexibility.`}),`
`,(0,h.jsx)(n.h2,{id:`angular-usage`,children:`Angular Usage`}),`
`,(0,h.jsxs)(n.p,{children:[`To make using the bottom sheet component easier and more seamless within an Angular application, use the `,(0,h.jsx)(n.code,{children:`@tylertech/forge-angular`}),` Angular adapter library.`]}),`
`,(0,h.jsxs)(n.p,{children:[`This library provides a `,(0,h.jsx)(n.code,{children:`BottomSheetService`}),` provider that can be injected, and used to easily render a dynamic Angular component within the Forge bottom sheet.`]}),`
`,(0,h.jsx)(n.p,{children:`As an example, say we want to render a dynamically created confirmation bottom sheet component that offers the ability to change the title and message. We could create
a component like the following:`}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-ts`,children:`import { Component } from '@angular/core';
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
`,(0,h.jsxs)(n.p,{children:[`We could then inject the `,(0,h.jsx)(n.code,{children:`BottomSheetService`}),` from the Forge adapter library, and show the dynamic component like this:`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-ts`,children:`import { Component } from '@angular/core';
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
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{}),`
`,(0,h.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[`Ensure that keyboard navigation behaves properly and intuitively while the bottom sheet is open.`,`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsx)(n.li,{children:`In modal bottom sheets, keyboard navigation should be constrained only to within the modal bottom sheet.`}),`
`,(0,h.jsx)(n.li,{children:`When the bottom sheet is closed, return focus to a logical element on the page.`}),`
`]}),`
`]}),`
`,(0,h.jsx)(n.li,{children:`Ensure that if there is a way to close the bottom sheet via a mouse click, that there is also a way to close the bottom sheet via keyboard.`}),`
`,(0,h.jsxs)(n.li,{children:[`The bottom sheet component will add the `,(0,h.jsx)(n.code,{children:`role="dialog"`}),` and `,(0,h.jsx)(n.code,{children:`aria-modal="true"`}),` attribute if no role is specified.`]}),`
`,(0,h.jsxs)(n.li,{children:[`Be sure to set the `,(0,h.jsx)(n.code,{children:`aria-labelledby`}),` and `,(0,h.jsx)(n.code,{children:`aria-describedby`}),` attributes on the bottom sheet component.`,`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsx)(n.li,{children:`This will allow for a screen reader to properly announce the bottom sheet title and description when it opens.`}),`
`]}),`
`]}),`
`]}),`
`,(0,h.jsx)(n.h2,{id:`focus`,children:`Focus`}),`
`,(0,h.jsx)(n.p,{children:`Always give an element within the bottom sheet initial focus. In most cases, focus should be set on the first focusable element. There are some exceptions:`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[`If setting focus on the first focusable element would scroll content out of view, add `,(0,h.jsx)(n.code,{children:`tabindex="-1"`}),` to a static element at the top of the bottom sheet (such as the title) and set focus on that.`]}),`
`,(0,h.jsx)(n.li,{children:`If the first focusable element leads to a destructive, not easily reversible action, consider setting focus on the less destructive action instead.`}),`
`,(0,h.jsx)(n.li,{children:`If a bottom sheet offers limited interaction and is likely to be quickly dismissed, such as an "Ok" or "Continue" bottom sheet, consider setting focus on the action that will be used most commonly.`}),`
`]}),`
`,(0,h.jsx)(n.p,{children:`When the bottom sheet closes, focus should return to the element that called the bottom sheet unless:`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsx)(n.li,{children:`The calling element doesn't exist, then set focus on another logical element.`}),`
`,(0,h.jsx)(n.li,{children:`It makes more logical sense for focus to move to another element in the workflow, such as a bottom sheet to add form fields giving focus to the first input in the form.`}),`
`]}),`
`,(0,h.jsx)(n.p,{children:`Always include a visible and clearly labelled button in the tab order to close the bottom sheet.`}),`
`,(0,h.jsx)(n.h2,{id:`aria`,children:`ARIA`}),`
`,(0,h.jsxs)(n.p,{children:[`The bottom sheet component provides `,(0,h.jsx)(n.code,{children:`role="dialog"`}),` and `,(0,h.jsx)(n.code,{children:`aria-modal="true"`}),` attributes. Ensure that all elements necessary to use the bottom sheet are contained within the component.`]}),`
`,(0,h.jsxs)(n.p,{children:[`Use `,(0,h.jsx)(n.code,{children:`aria-labelledby`}),` to reference a visible bottom sheet title. If the title isn't visible or doesn't exist, provide one as an `,(0,h.jsx)(n.code,{children:`aria-label`}),` attribute or reference a visually hidden element.`]}),`
`,(0,h.jsxs)(n.p,{children:[`The `,(0,h.jsx)(n.code,{children:`aria-describedby`}),` attribute can be set to reference elements that described the purpose of the bottom sheet. In bottom sheets with simple text content the entire body container can be referenced.
In more complex bottom sheets, it may make more sense to reference a subset of the text. If a bottom sheet has no static content that describes its purpose it is not necessary to provide a description.`]}),`
`,(0,h.jsx)(n.p,{children:`An example with a visible title and description:`}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<forge-bottom-sheet aria-labelledby="bottom-sheet-title" aria-describedby="bottom-sheet-content">
  <header>
    <h1 id="bottom-sheet-title">Title</h1>
  </header>
  <div id="bottom-sheet-content">Simple text content</div>
</forge-bottom-sheet>
`})}),`
`,(0,h.jsx)(n.p,{children:`And an example with a hidden title and description:`}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<forge-bottom-sheet aria-labelledby="bottom-sheet-title" aria-describedby="bottom-sheet-description">
  <span id="bottom-sheet-title" hidden>Title</span>
  <span id="bottom-sheet-description" hidden>Description</div>

  <div>Bottom sheet content</div>
</forge-bottom-sheet>
`})}),`
`,(0,h.jsxs)(n.blockquote,{children:[`
`,(0,h.jsx)(n.p,{children:`Bottom sheets are appended to the DOM as immediate children of the body, so the heading order should start at 1.`}),`
`]}),`
`,(0,h.jsxs)(n.blockquote,{children:[`
`,(0,h.jsx)(n.p,{children:(0,h.jsx)(n.strong,{children:`Angular usage`})}),`
`,(0,h.jsxs)(n.p,{children:[`When using the `,(0,h.jsx)(n.code,{children:`BottomSheetService`}),` from the `,(0,h.jsx)(n.code,{children:`@tylertech/forge-angular`}),` package, attributes can
be set on the `,(0,h.jsx)(n.code,{children:`<forge-bottom-sheet>`}),` element using the `,(0,h.jsx)(n.code,{children:`attributes`}),` property of the `,(0,h.jsx)(n.code,{children:`IBottomSheetOptions`}),` parameter:`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-typescript`,children:`const bottomSheetOptions: IBottomSheetOptions = {
  attributes: new Map([
    ['aria-labelledby', 'bottom-sheet-title'],
    ['aria-describedby', 'bottom-sheet-desc']
  ])
};
`})}),`
`]})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};