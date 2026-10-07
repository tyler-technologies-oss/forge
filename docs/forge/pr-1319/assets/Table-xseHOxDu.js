import{u as i,j as e,M as l,T as s,C as o}from"./blocks-Cal7HuuV.js";import{C as c}from"./CustomArgTypes-w-oY4vMu.js";import{C as d}from"./CssOnlyInformation-CvxQtMl0.js";import{T as p,D as r,C as h}from"./Table.stories-BYjcUFrj.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BQYzHRrc.js";import"./iframe-Doaa3Kdk.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-C8_-3lrC.js";import"./service-adapter-8tADcN_b.js";import"./table-Dg2XF4pw.js";import"./custom-element-DR9AFpIK.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./core-property-Co8uF8PW.js";import"./tyler-icons-NVf08gHb.js";import"./expansion-panel-BBWAoecH.js";import"./class-map-CsjCCn6c.js";import"./directive-CwRn8Fwj.js";import"./property-DJuTIPPA.js";import"./state-a4Qik7Qa.js";import"./query-assigned-elements-43hYArgI.js";import"./base-DVmwUFg0.js";import"./base-lit-element-CpHmPn0S.js";import"./async-directive-MwfSmi4y.js";import"./utils-C31il88P.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./open-icon-CFItYUrW.js";import"./icon-ozIZoPIz.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./dom-utils-BDbRr6KM.js";import"./checkbox-CRSkxL3h.js";import"./base-component-BFu9bkgC.js";import"./with-form-associated-BZpZ-kob.js";import"./with-element-internals-CFYP_epH.js";import"./a11y-utils-DssnAab5.js";import"./with-label-aware-B4Q13qtt.js";import"./focus-indicator-D4pryyUP.js";import"./floating-ui.dom-DaMtbvS2.js";import"./state-layer-gtlkuVuf.js";import"./base-adapter-DOky_or5.js";import"./checkbox-constants-BJ3elUIK.js";import"./object-utils-CUPteeNI.js";import"./base-component-delegate-DxZGdeuy.js";import"./event-utils-C1SDeUaq.js";import"./item-manager-C8nNcpm6.js";import"./tooltip-BZoCBE_e.js";import"./overlay-DNJXwLw8.js";import"./with-longpress-listener-D4ROnnkg.js";import"./dismissible-stack-DyoP5jNB.js";import"./text-field-CNwTSEf7.js";import"./base-field-DX5e91B5.js";import"./label-BOpEXGDh.js";import"./button-constants-DRqTH6Pv.js";import"./button-toggle-group-constants-CvfmN-z8.js";import"./icon-button-constants-JHHxiN9v.js";import"./switch-constants-BZVST_qJ.js";import"./icon-button-Ck8_ypsD.js";import"./base-button-DcOcEdtA.js";import"./query-CtiAP21w.js";function a(n){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:p}),`
`,e.jsx(s,{}),`
`,e.jsx(t.p,{children:"Tables are used to display data in a tabular format."}),`
`,e.jsx(t.p,{children:`The Forge table is a configuration-based component that handles the rendering of the data and user interactions for you. It is designed to be flexible and customizable,
allowing you to configure the table to meet your specific needs.`}),`
`,e.jsx(o,{of:r}),`
`,e.jsx(t.h2,{id:"expectations",children:"Expectations"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"<forge-table>"}),` component was originally designed to be a very basic configuration-based component to render your data, provide built-in sorting, filtering, and row
selection. It has since evolved beyond these original goals and now includes a variety of features and options to help you build a more complex table, which comes at a
maintenance and performance cost.`]}),`
`,e.jsxs(t.p,{children:[`If you are looking for a more advanced table component that includes features such as virtual scrolling, infinite scrolling, or more advanced filtering and sorting
options, you may want to consider using a more advanced table component such as `,e.jsx(t.a,{href:"https://www.ag-grid.com/",rel:"nofollow",children:"AG Grid"}),"."]}),`
`,e.jsxs(t.p,{children:["With that being said, we have plans to provide a more robust data table component in Forge in the future, but for now, the ",e.jsx(t.code,{children:"<forge-table>"}),` component will remain
in its current form and will continue to be maintained and supported. See the `,e.jsx(t.a,{href:"?path=/docs/about-roadmap--docs",children:"roadmap"})," for a status update on this feature."]}),`
`,e.jsx(t.h2,{id:"getting-started",children:"Getting Started"}),`
`,e.jsxs(t.p,{children:["In its most basic form, the ",e.jsx(t.code,{children:"<forge-table>"})," component requires two properties to be set: ",e.jsx(t.code,{children:"columnConfigurations"})," and ",e.jsx(t.code,{children:"data"}),". The ",e.jsx(t.code,{children:"columnConfigurations"}),` property is an array
of objects that define the columns to be displayed in the table, and the `,e.jsx(t.code,{children:"data"})," property is an array of objects that represent the data to be displayed."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-typescript",children:`import { IColumnConfiguration } from '@tylertech/forge';

const data = [
  { firstName: 'John', lastName: 'Doe', age: 30 },
  { firstName: 'Jane', lastName: 'Doe', age: 25 },
  { firstName: 'Jim', lastName: 'Smith', age: 40 },
  { firstName: 'Jill', lastName: 'Johnson', age: 35 }
];

const columnConfigurations: IColumnConfiguration[] = [
  {
    header: 'First Name',
    property: 'firstName',
    sortable: true,
    initialSort: true,
    filter: true,
    filterDelegate: () => new TextFieldComponentDelegate({ options: { placeholder: 'Filter first name...' }, props: { showClear: true } })
  },
  {
    header: 'Last Name',
    property: 'lastName',
    sortable: true,
    filter: true,
    filterDelegate: () => new TextFieldComponentDelegate({ options: { placeholder: 'Filter last name...' }, props: { showClear: true } })
  },
  {
    header: 'Age',
    property: 'age',
    sortable: true,
    filter: true,
    filterDelegate: () => new TextFieldComponentDelegate({ options: { placeholder: 'Filter age...' }, props: { showClear: true } })
  }
];

const tableEl = document.createElement('forge-table');
tableEl.columnConfigurations = columnConfigurations;
tableEl.data = data;
`})}),`
`,e.jsx(t.h3,{id:"column-configuration",children:"Column Configuration"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"columnConfigurations"}),` property is an array of objects that define the columns to be displayed in the table. Each object in the array should have
the following properties:`]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"header"})," - The text to be displayed in the column header."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"footer"})," - The text to be displayed in the column footer."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"property"})," - The property name of the object in the ",e.jsx(t.code,{children:"data"})," array that should be displayed in this column."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"sortable"})," - A boolean value that determines if the column should be sortable. Defaults to ",e.jsx(t.code,{children:"false"}),"."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"initialSort"})," - A boolean value that determines if the column should be sorted initially. Defaults to ",e.jsx(t.code,{children:"false"}),"."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"filter"})," - A boolean value that determines if the column should have a filter input. Defaults to ",e.jsx(t.code,{children:"false"}),"."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"filterDelegate"})," - A component delegate that represents the component to be rendered in the filter cell."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"transform"})," - A function that transforms the value of the column before it is displayed. This is useful for mapping boolean values to text, for example."]}),`
`]}),`
`,e.jsxs(t.p,{children:["See the ",e.jsx(t.a,{href:"#api",children:"API"})," section for a complete list of properties and methods available on the ",e.jsx(t.code,{children:"<forge-table>"})," component."]}),`
`,e.jsx(t.h2,{id:"using-column-filters",children:"Using column filters"}),`
`,e.jsxs(t.p,{children:["To add column filters you will need to specify a ",e.jsx(t.code,{children:"filterDelegate"}),` for each column that needs it. You can use the built-in component delegate classes
(see example below) for the common filter input types, or you can build your own delegate class that represents the component you would like to render
in the filter cell.`]}),`
`,e.jsxs(t.p,{children:["A component delegate is a flexible API that allows you to define a class that extends an ",e.jsx(t.code,{children:"BaseComponentDelegate"})," or ",e.jsx(t.code,{children:"FormFieldComponentDelegate"}),`. These
classes define a common interface to use for dynamic components that require the ability to get/set values, set invalid, disabled, required... etc. You
can then communicate with your component through this delegate instance.`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`import { TextFieldComponentDelegate, SelectComponentDelegate } from '@tylertech/forge';
import { SomeCustomComponentDelegate } from './my-custom-component-delegates';

table.columnConfigurations = [
  {
    property: 'name',
    header: 'Person name',
    filter: true,
    filterDelegate: new TextFieldComponentDelegate({ options: { placeholder: 'Filter name...' } })
  },
  {
    property: 'color',
    header: 'Favorite color',
    filter: true,
    filterDelegate: new SelectComponentDelegate({ props: { placeholder: 'Filter color...' } })
  },
  { property: 'age', header: 'Person age', filter: true, filterDelegate: new SomeCustomComponentDelegate() }
];
`})}),`
`,e.jsx(t.h2,{id:"using-column-footers",children:"Using column footers"}),`
`,e.jsxs(t.p,{children:["To add a footer row to the table, set the ",e.jsx(t.code,{children:"include-footer"})," attribute (or ",e.jsx(t.code,{children:"includeFooter"})," property) to ",e.jsx(t.code,{children:"true"})," on the ",e.jsx(t.code,{children:"<forge-table>"})," element. Then configure each column with either a ",e.jsx(t.code,{children:"footer"})," string or a ",e.jsx(t.code,{children:"footerTemplate"})," callback to control what each cell in the footer row renders."]}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"footer"})," for simple static text:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-typescript",children:`const columnConfigurations: IColumnConfiguration[] = [
  { header: 'First Name', property: 'firstName', footer: 'Total' },
  { header: 'Last Name', property: 'lastName', footer: '' },
  { header: 'Age', property: 'age', footer: '155' }
];

const tableEl = document.querySelector('forge-table');
tableEl.includeFooter = true;
tableEl.columnConfigurations = columnConfigurations;
`})}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"footerTemplate"})," for custom HTML content in footer cells:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-typescript",children:`{
  header: 'Age',
  property: 'age',
  footerTemplate: (rowIndex, cell, columnConfig) => {
    const span = document.createElement('span');
    span.textContent = \`Avg: \${average}\`;
    return span;
  }
}
`})}),`
`,e.jsxs(t.p,{children:["You can also apply custom styles to footer cells via the ",e.jsx(t.code,{children:"footerCellStyle"})," property on each column configuration."]}),`
`,e.jsx(o,{of:r}),`
`,e.jsx(t.h2,{id:"mapping-boolean-outputs",children:"Mapping Boolean outputs"}),`
`,e.jsxs(t.p,{children:["To map the output for boolean values, use the ",e.jsx(t.code,{children:"transform"})," method in your ",e.jsx(t.code,{children:"IColumnConfiguration"})," for those columns where you want to show something other than ",e.jsx(t.code,{children:"true"})," and ",e.jsx(t.code,{children:"false"}),"."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-typescript",children:`{
  transform: value =>  value ? 'Enabled' : 'Disabled',
}
`})}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"})," You would use the ",e.jsx(t.code,{children:"template"})," property to render custom HTML elements instead of plain text."]}),`
`]}),`
`,e.jsx(t.h2,{id:"angular-usage",children:"Angular Usage"}),`
`,e.jsxs(t.p,{children:["Below is an example usage of interacting with the ",e.jsx(t.code,{children:"<forge-table>"})," component within an Angular application."]}),`
`,e.jsx(t.p,{children:"This first example shows how to set up the bindings within an Angular template:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-table
  [columnConfigurations]="columnConfigurations"
  [data]="data$ | async"
  select="true"
  select-key="Id"
  (forge-table-select)="onSelect($event)"
  (forge-table-select-all)="onSelectAll($event)"
  (forge-table-sort)="onTableSort($event)">
</forge-table>
`})}),`
`,e.jsxs(t.p,{children:["The following snippet is an example component class with the properties/methods to handle inputs/outputs on the ",e.jsx(t.code,{children:"<forge-table>"})," element. The ",e.jsx(t.code,{children:"data"}),`
property is being used an RxJS observable here, but by using the `,e.jsx(t.code,{children:"async"}),` pipe we are able to unwrap the observable to provide an array of objects
to the table component.`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`@Component({
  selector: 'table-example',
  templateUrl: './table-example.component.html'
})
export class TableExampleComponent implements OnInit {
  public columnConfigurations: IColumnConfiguration[] = [
    { header: 'Name', property: 'Name', sortable: true, initialSort: true },
    { header: 'Age', property: 'Age', sortable: true },
    { header: 'Position', property: 'Position', sortable: true }
  ];
  public data$: BehaviorSubject<IPlayer[]>;

  public ngOnInit() {
    // Note: In a real application this data would likely be set from an async data source
    const players: IPlayer = [
      { Id: 1, Name: 'Tom Brady', Age: 41, Position: 'QB' },
      { Id: 2, Name: 'Julian Edelman', Age: 32, Position: 'WR' },
      { Id: 3, Name: 'Rob Gronkowski', Age: 29, Position: 'TE' },
      { Id: 4, Name: 'Chris Hogan', Age: 30, Position: 'WR' },
      { Id: 5, Name: 'James White', Age: 26, Position: 'RB' }
    ];
    this.data$ = new BehaviorSubject(players);
  }

  public onSelect(evt: CustomEvent): void {
    const data = evt.detail as ITableSelectEventData;
  }

  public onSelectAll(evt: CustomEvent): void {
    const data = evt.detail as ITableSelectAllEventData;
  }

  public onTableSort(evt: CustomEvent): void {
    const data = evt.detail as ITableSortEventData;
  }
}
`})}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(c,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Avoid using tables for layout, as this can make it difficult for users who are using screen readers."}),`
`,e.jsxs(t.li,{children:["The checkbox element will receive the proper ARIA attributes such as ",e.jsx(t.code,{children:'aria-label="Select row"'})]}),`
`,e.jsx(t.li,{children:"If the table uses any interactive controls, ensure that any controls that are reachable by the mouse can also be reached and updated by keyboard."}),`
`]}),`
`,e.jsx(t.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(t.p,{children:"The table component is also available as a CSS-only component without the need for JavaScript."}),`
`,e.jsx(o,{of:h}),`
`,e.jsx(d,{})]})}function ve(n={}){const{wrapper:t}={...i(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(a,{...n})}):a(n)}export{ve as default};
