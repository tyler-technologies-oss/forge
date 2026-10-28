import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-Byzp6JFn.js";import{n as c,t as l}from"./CustomArgTypes-QAslgvtG.js";import{n as u,t as d}from"./CssOnlyInformation-CHdHW0tL.js";import{i as f,n as p,r as m,t as h}from"./Table.stories-CSg8CCfi.js";function g(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(s,{of:m}),`
`,(0,v.jsx)(o,{}),`
`,(0,v.jsx)(n.p,{children:`Tables are used to display data in a tabular format.`}),`
`,(0,v.jsx)(n.p,{children:`The Forge table is a configuration-based component that handles the rendering of the data and user interactions for you. It is designed to be flexible and customizable,
allowing you to configure the table to meet your specific needs.`}),`
`,(0,v.jsx)(a,{of:p}),`
`,(0,v.jsx)(n.h2,{id:`expectations`,children:`Expectations`}),`
`,(0,v.jsxs)(n.p,{children:[`The `,(0,v.jsx)(n.code,{children:`<forge-table>`}),` component was originally designed to be a very basic configuration-based component to render your data, provide built-in sorting, filtering, and row
selection. It has since evolved beyond these original goals and now includes a variety of features and options to help you build a more complex table, which comes at a
maintenance and performance cost.`]}),`
`,(0,v.jsxs)(n.p,{children:[`If you are looking for a more advanced table component that includes features such as virtual scrolling, infinite scrolling, or more advanced filtering and sorting
options, you may want to consider using a more advanced table component such as `,(0,v.jsx)(n.a,{href:`https://www.ag-grid.com/`,rel:`nofollow`,children:`AG Grid`}),`.`]}),`
`,(0,v.jsxs)(n.p,{children:[`With that being said, we have plans to provide a more robust data table component in Forge in the future, but for now, the `,(0,v.jsx)(n.code,{children:`<forge-table>`}),` component will remain
in its current form and will continue to be maintained and supported. See the `,(0,v.jsx)(n.a,{href:`?path=/docs/about-roadmap--docs`,children:`roadmap`}),` for a status update on this feature.`]}),`
`,(0,v.jsx)(n.h2,{id:`getting-started`,children:`Getting Started`}),`
`,(0,v.jsxs)(n.p,{children:[`In its most basic form, the `,(0,v.jsx)(n.code,{children:`<forge-table>`}),` component requires two properties to be set: `,(0,v.jsx)(n.code,{children:`columnConfigurations`}),` and `,(0,v.jsx)(n.code,{children:`data`}),`. The `,(0,v.jsx)(n.code,{children:`columnConfigurations`}),` property is an array
of objects that define the columns to be displayed in the table, and the `,(0,v.jsx)(n.code,{children:`data`}),` property is an array of objects that represent the data to be displayed.`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-typescript`,children:`import { IColumnConfiguration } from '@tylertech/forge';

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
`,(0,v.jsx)(n.h3,{id:`column-configuration`,children:`Column Configuration`}),`
`,(0,v.jsxs)(n.p,{children:[`The `,(0,v.jsx)(n.code,{children:`columnConfigurations`}),` property is an array of objects that define the columns to be displayed in the table. Each object in the array should have
the following properties:`]}),`
`,(0,v.jsxs)(n.ul,{children:[`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`header`}),` - The text to be displayed in the column header.`]}),`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`footer`}),` - The text to be displayed in the column footer.`]}),`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`property`}),` - The property name of the object in the `,(0,v.jsx)(n.code,{children:`data`}),` array that should be displayed in this column.`]}),`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`sortable`}),` - A boolean value that determines if the column should be sortable. Defaults to `,(0,v.jsx)(n.code,{children:`false`}),`.`]}),`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`initialSort`}),` - A boolean value that determines if the column should be sorted initially. Defaults to `,(0,v.jsx)(n.code,{children:`false`}),`.`]}),`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`filter`}),` - A boolean value that determines if the column should have a filter input. Defaults to `,(0,v.jsx)(n.code,{children:`false`}),`.`]}),`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`filterDelegate`}),` - A component delegate that represents the component to be rendered in the filter cell.`]}),`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`transform`}),` - A function that transforms the value of the column before it is displayed. This is useful for mapping boolean values to text, for example.`]}),`
`]}),`
`,(0,v.jsxs)(n.p,{children:[`See the `,(0,v.jsx)(n.a,{href:`#api`,children:`API`}),` section for a complete list of properties and methods available on the `,(0,v.jsx)(n.code,{children:`<forge-table>`}),` component.`]}),`
`,(0,v.jsx)(n.h2,{id:`using-column-filters`,children:`Using column filters`}),`
`,(0,v.jsxs)(n.p,{children:[`To add column filters you will need to specify a `,(0,v.jsx)(n.code,{children:`filterDelegate`}),` for each column that needs it. You can use the built-in component delegate classes
(see example below) for the common filter input types, or you can build your own delegate class that represents the component you would like to render
in the filter cell.`]}),`
`,(0,v.jsxs)(n.p,{children:[`A component delegate is a flexible API that allows you to define a class that extends an `,(0,v.jsx)(n.code,{children:`BaseComponentDelegate`}),` or `,(0,v.jsx)(n.code,{children:`FormFieldComponentDelegate`}),`. These
classes define a common interface to use for dynamic components that require the ability to get/set values, set invalid, disabled, required... etc. You
can then communicate with your component through this delegate instance.`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-ts`,children:`import { TextFieldComponentDelegate, SelectComponentDelegate } from '@tylertech/forge';
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
`,(0,v.jsx)(n.h2,{id:`interactive-controls-in-sortable-headers`,children:`Interactive controls in sortable headers`}),`
`,(0,v.jsxs)(n.p,{children:[`When a sortable column uses a `,(0,v.jsx)(n.code,{children:`headerTemplate`}),`, clicking anywhere in the header cell sorts the column. To render an interactive control (such as a button or
link) in the header that should `,(0,v.jsx)(n.strong,{children:`not`}),` trigger a sort, add the `,(0,v.jsx)(n.code,{children:`forge-ignore`}),` (or `,(0,v.jsx)(n.code,{children:`data-forge-ignore`}),`) attribute to the control, or to any ancestor of it
within the header cell.`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-typescript`,children:`const columnConfigurations: IColumnConfiguration[] = [
  {
    header: 'Name',
    property: 'name',
    sortable: true,
    headerTemplate: () => \`Name <forge-icon-button forge-ignore aria-label="Column help"><forge-icon name="help"></forge-icon></forge-icon-button>\`
  }
];
`})}),`
`,(0,v.jsx)(n.h2,{id:`using-column-footers`,children:`Using column footers`}),`
`,(0,v.jsxs)(n.p,{children:[`To add a footer row to the table, set the `,(0,v.jsx)(n.code,{children:`include-footer`}),` attribute (or `,(0,v.jsx)(n.code,{children:`includeFooter`}),` property) to `,(0,v.jsx)(n.code,{children:`true`}),` on the `,(0,v.jsx)(n.code,{children:`<forge-table>`}),` element. Then configure each column with either a `,(0,v.jsx)(n.code,{children:`footer`}),` string or a `,(0,v.jsx)(n.code,{children:`footerTemplate`}),` callback to control what each cell in the footer row renders.`]}),`
`,(0,v.jsxs)(n.p,{children:[`Use `,(0,v.jsx)(n.code,{children:`footer`}),` for simple static text:`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-typescript`,children:`const columnConfigurations: IColumnConfiguration[] = [
  { header: 'First Name', property: 'firstName', footer: 'Total' },
  { header: 'Last Name', property: 'lastName', footer: '' },
  { header: 'Age', property: 'age', footer: '155' }
];

const tableEl = document.querySelector('forge-table');
tableEl.includeFooter = true;
tableEl.columnConfigurations = columnConfigurations;
`})}),`
`,(0,v.jsxs)(n.p,{children:[`Use `,(0,v.jsx)(n.code,{children:`footerTemplate`}),` for custom HTML content in footer cells:`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-typescript`,children:`{
  header: 'Age',
  property: 'age',
  footerTemplate: (rowIndex, cell, columnConfig) => {
    const span = document.createElement('span');
    span.textContent = \`Avg: \${average}\`;
    return span;
  }
}
`})}),`
`,(0,v.jsxs)(n.p,{children:[`You can also apply custom styles to footer cells via the `,(0,v.jsx)(n.code,{children:`footerCellStyle`}),` property on each column configuration.`]}),`
`,(0,v.jsx)(a,{of:p}),`
`,(0,v.jsx)(n.h2,{id:`mapping-boolean-outputs`,children:`Mapping Boolean outputs`}),`
`,(0,v.jsxs)(n.p,{children:[`To map the output for boolean values, use the `,(0,v.jsx)(n.code,{children:`transform`}),` method in your `,(0,v.jsx)(n.code,{children:`IColumnConfiguration`}),` for those columns where you want to show something other than `,(0,v.jsx)(n.code,{children:`true`}),` and `,(0,v.jsx)(n.code,{children:`false`}),`.`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-typescript`,children:`{
  transform: value =>  value ? 'Enabled' : 'Disabled',
}
`})}),`
`,(0,v.jsxs)(n.blockquote,{children:[`
`,(0,v.jsxs)(n.p,{children:[(0,v.jsx)(n.strong,{children:`Note:`}),` You would use the `,(0,v.jsx)(n.code,{children:`template`}),` property to render custom HTML elements instead of plain text.`]}),`
`]}),`
`,(0,v.jsx)(n.h2,{id:`angular-usage`,children:`Angular Usage`}),`
`,(0,v.jsxs)(n.p,{children:[`Below is an example usage of interacting with the `,(0,v.jsx)(n.code,{children:`<forge-table>`}),` component within an Angular application.`]}),`
`,(0,v.jsx)(n.p,{children:`This first example shows how to set up the bindings within an Angular template:`}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-html`,children:`<forge-table
  [columnConfigurations]="columnConfigurations"
  [data]="data$ | async"
  select="true"
  select-key="Id"
  (forge-table-select)="onSelect($event)"
  (forge-table-select-all)="onSelectAll($event)"
  (forge-table-sort)="onTableSort($event)">
</forge-table>
`})}),`
`,(0,v.jsxs)(n.p,{children:[`The following snippet is an example component class with the properties/methods to handle inputs/outputs on the `,(0,v.jsx)(n.code,{children:`<forge-table>`}),` element. The `,(0,v.jsx)(n.code,{children:`data`}),`
property is being used an RxJS observable here, but by using the `,(0,v.jsx)(n.code,{children:`async`}),` pipe we are able to unwrap the observable to provide an array of objects
to the table component.`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-ts`,children:`@Component({
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
`,(0,v.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,v.jsx)(l,{}),`
`,(0,v.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,v.jsxs)(n.ul,{children:[`
`,(0,v.jsx)(n.li,{children:`Avoid using tables for layout, as this can make it difficult for users who are using screen readers.`}),`
`,(0,v.jsxs)(n.li,{children:[`The checkbox element will receive the proper ARIA attributes such as `,(0,v.jsx)(n.code,{children:`aria-label="Select row"`})]}),`
`,(0,v.jsx)(n.li,{children:`If the table uses any interactive controls, ensure that any controls that are reachable by the mouse can also be reached and updated by keyboard.`}),`
`]}),`
`,(0,v.jsx)(n.h2,{id:`css-only`,children:`CSS-Only`}),`
`,(0,v.jsx)(n.p,{children:`The table component is also available as a CSS-only component without the need for JavaScript.`}),`
`,(0,v.jsx)(a,{of:h}),`
`,(0,v.jsx)(d,{})]})}function _(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,v.jsx)(n,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;function y(){return(y=e((()=>{v=r(),n(),i(),c(),u(),f()})))()}y();export{_ as default};