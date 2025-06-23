import{j as e,M as i,T as l,C as o}from"./blocks-CkDtCZEx.js";import{useMDXComponents as r}from"./index-DzXUr6Bp.js";import{C as s}from"./CustomArgTypes-DTqIRfl5.js";import{C as c}from"./CssOnlyInformation-DtypFCdM.js";import{T as d,D as h,C as p}from"./Table.stories-DOy1UVt9.js";import"./iframe-Bc1Hm-RY.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BHhJX03F.js";import"./feature-detection-CY6TVbRZ.js";import"./table-CKMhc38b.js";import"./constants-NErMj_Tj.js";import"./base-adapter-Ch0oiIsw.js";import"./icon-ANstxuR5.js";import"./index-CiLSBptl.js";import"./expansion-panel-D_Sh7JhR.js";import"./utils-CRxrUqQD.js";import"./checkbox-CF9fzMIR.js";import"./with-form-associated-9Gj0jfo_.js";import"./with-default-aria-srFr2cNz.js";import"./a11y-utils-DGb1vALN.js";import"./with-label-aware-DkCFYjRm.js";import"./focus-indicator-Cgfkaa3d.js";import"./state-layer-BVsNuAhs.js";import"./text-field-B5DffH3N.js";import"./base-field-mOEyxsOG.js";import"./label-BleHo323.js";import"./button-DKtxCkrw.js";import"./base-button-adapter-DBeYtn0B.js";import"./button-toggle-group-5BDyeLck.js";import"./icon-button-BWhggrld.js";import"./switch-ZI6WyDhE.js";import"./tooltip-DdPKhesK.js";import"./overlay-CmLQVoKV.js";import"./with-longpress-listener-BDlFima-.js";import"./dismissible-stack-BdWcv7_4.js";import"./base-component-delegate-Dz-DoLri.js";import"./event-utils-C1SDeUaq.js";function a(t){const n={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:d}),`
`,e.jsx(l,{}),`
`,e.jsx(n.p,{children:"Tables are used to display data in a tabular format."}),`
`,e.jsx(n.p,{children:`The Forge table is a configuration-based component that handles the rendering of the data and user interactions for you. It is designed to be flexible and customizable,
allowing you to configure the table to meet your specific needs.`}),`
`,e.jsx(o,{of:h}),`
`,e.jsx(n.h2,{id:"expectations",children:"Expectations"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<forge-table>"}),` component was originally designed to be a very basic configuration-based component to render your data, provide built-in sorting, filtering, and row
selection. It has since evolved beyond these original goals and now includes a variety of features and options to help you build a more complex table, which comes at a
maintenance and performance cost.`]}),`
`,e.jsxs(n.p,{children:[`If you are looking for a more advanced table component that includes features such as virtual scrolling, infinite scrolling, or more advanced filtering and sorting
options, you may want to consider using a more advanced table component such as `,e.jsx(n.a,{href:"https://www.ag-grid.com/",rel:"nofollow",children:"AG Grid"}),"."]}),`
`,e.jsxs(n.p,{children:["With that being said, we have plans to provide a more robust data table component in Forge in the future, but for now, the ",e.jsx(n.code,{children:"<forge-table>"}),` component will remain
in its current form and will continue to be maintained and supported. See the `,e.jsx(n.a,{href:"?path=/docs/about-roadmap--docs",children:"roadmap"})," for a status update on this feature."]}),`
`,e.jsx(n.h2,{id:"getting-started",children:"Getting Started"}),`
`,e.jsxs(n.p,{children:["In its most basic form, the ",e.jsx(n.code,{children:"<forge-table>"})," component requires two properties to be set: ",e.jsx(n.code,{children:"columnConfigurations"})," and ",e.jsx(n.code,{children:"data"}),". The ",e.jsx(n.code,{children:"columnConfigurations"}),` property is an array
of objects that define the columns to be displayed in the table, and the `,e.jsx(n.code,{children:"data"})," property is an array of objects that represent the data to be displayed."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`import { IColumnConfiguration } from '@tylertech/forge';

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
`,e.jsx(n.h3,{id:"column-configuration",children:"Column Configuration"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"columnConfigurations"}),` property is an array of objects that define the columns to be displayed in the table. Each object in the array should have
the following properties:`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"header"})," - The text to be displayed in the column header."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"property"})," - The property name of the object in the ",e.jsx(n.code,{children:"data"})," array that should be displayed in this column."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"sortable"})," - A boolean value that determines if the column should be sortable. Defaults to ",e.jsx(n.code,{children:"false"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"initialSort"})," - A boolean value that determines if the column should be sorted initially. Defaults to ",e.jsx(n.code,{children:"false"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"filter"})," - A boolean value that determines if the column should have a filter input. Defaults to ",e.jsx(n.code,{children:"false"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"filterDelegate"})," - A component delegate that represents the component to be rendered in the filter cell."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"transform"})," - A function that transforms the value of the column before it is displayed. This is useful for mapping boolean values to text, for example."]}),`
`]}),`
`,e.jsxs(n.p,{children:["See the ",e.jsx(n.a,{href:"#api",children:"API"})," section for a complete list of properties and methods available on the ",e.jsx(n.code,{children:"<forge-table>"})," component."]}),`
`,e.jsx(n.h2,{id:"using-column-filters",children:"Using column filters"}),`
`,e.jsxs(n.p,{children:["To add column filters you will need to specify a ",e.jsx(n.code,{children:"filterDelegate"}),` for each column that needs it. You can use the built-in component delegate classes
(see example below) for the common filter input types, or you can build your own delegate class that represents the component you would like to render
in the filter cell.`]}),`
`,e.jsxs(n.p,{children:["A component delegate is a flexible API that allows you to define a class that extends an ",e.jsx(n.code,{children:"BaseComponentDelegate"})," or ",e.jsx(n.code,{children:"FormFieldComponentDelegate"}),`. These
classes define a common interface to use for dynamic components that require the ability to get/set values, set invalid, disabled, required... etc. You
can then communicate with your component through this delegate instance.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import { TextFieldComponentDelegate, SelectComponentDelegate } from '@tylertech/forge';
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
`,e.jsx(n.h2,{id:"mapping-boolean-outputs",children:"Mapping Boolean outputs"}),`
`,e.jsxs(n.p,{children:["To map the output for boolean values, use the ",e.jsx(n.code,{children:"transform"})," method in your ",e.jsx(n.code,{children:"IColumnConfiguration"})," for those columns where you want to show something other than ",e.jsx(n.code,{children:"true"})," and ",e.jsx(n.code,{children:"false"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`{
  transform: value =>  value ? 'Enabled' : 'Disabled',
}
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," You would use the ",e.jsx(n.code,{children:"template"})," property to render custom HTML elements instead of plain text."]}),`
`]}),`
`,e.jsx(n.h2,{id:"angular-usage",children:"Angular Usage"}),`
`,e.jsxs(n.p,{children:["Below is an example usage of interacting with the ",e.jsx(n.code,{children:"<forge-table>"})," component within an Angular application."]}),`
`,e.jsx(n.p,{children:"This first example shows how to set up the bindings within an Angular template:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-table
  [columnConfigurations]="columnConfigurations"
  [data]="data$ | async"
  select="true"
  select-key="Id"
  (forge-table-select)="onSelect($event)"
  (forge-table-select-all)="onSelectAll($event)"
  (forge-table-sort)="onTableSort($event)">
</forge-table>
`})}),`
`,e.jsxs(n.p,{children:["The following snippet is an example component class with the properties/methods to handle inputs/outputs on the ",e.jsx(n.code,{children:"<forge-table>"})," element. The ",e.jsx(n.code,{children:"data"}),`
property is being used an RxJS observable here, but by using the `,e.jsx(n.code,{children:"async"}),` pipe we are able to unwrap the observable to provide an array of objects
to the table component.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`@Component({
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
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(s,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Avoid using tables for layout, as this can make it difficult for users who are using screen readers."}),`
`,e.jsxs(n.li,{children:["The checkbox element will receive the proper ARIA attributes such as ",e.jsx(n.code,{children:'aria-label="Select row"'})]}),`
`,e.jsx(n.li,{children:"If the table uses any interactive controls, ensure that any controls that are reachable by the mouse can also be reached and updated by keyboard."}),`
`]}),`
`,e.jsx(n.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(n.p,{children:"The table component is also available as a CSS-only component without the need for JavaScript."}),`
`,e.jsx(o,{of:p}),`
`,e.jsx(c,{})]})}function Q(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}export{Q as default};
