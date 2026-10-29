import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-C-z8vi0w.js";import{_ as i,m as a,o,s}from"./utils-BktKkMbo.js";import{n as c,t as l}from"./text-field-DoxOOXb7.js";import{n as u,t as d}from"./table-KigiJs2E.js";var f=t({CSSOnly:()=>O,Demo:()=>D,__namedExportsOrder:()=>k,default:()=>E}),p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k;function A(){return(A=e((()=>{a(),d(),l(),r(),{action:p}=__STORYBOOK_MODULE_ACTIONS__,m=`forge-table`,h=p(`forge-table-row-click`),g=p(`forge-table-filter`),_=p(`forge-table-sort`),v=p(`forge-table-select`),y=p(`forge-table-select-all`),b=p(`forge-table-select-double`),x=p(`forge-table-initialized`),S=p(`forge-table-column-resize`),C=[{id:0,firstName:`Alice`,lastName:`Smith`,age:25},{id:1,firstName:`Bob`,lastName:`Johnson`,age:35},{id:2,firstName:`Charlie`,lastName:`Brown`,age:45},{id:3,firstName:`David`,lastName:`Miller`,age:55},{id:4,firstName:`Eve`,lastName:`Williams`,age:65}],w=[{header:`First Name`,property:`firstName`,footer:`Summary`,sortable:!0,initialSort:!0,filter:!0,filterDelegate:()=>new c({options:{placeholder:`Filter first name...`},props:{showClear:!0}})},{header:`Last Name`,property:`lastName`,footer:`${C.length} rows`,sortable:!0,filter:!0,filterDelegate:()=>new c({options:{placeholder:`Filter last name...`},props:{showClear:!0}})},{header:`Age`,property:`age`,footer:`Avg: ${Math.round(C.reduce((e,t)=>e+t.age,0)/C.length)}`,sortable:!0,filter:!0,filterDelegate:()=>new c({options:{placeholder:`Filter age...`},props:{showClear:!0}})}],T={firstName:``,lastName:``,age:``},E={title:`Components/Table`,render:e=>{let t=o(m,e);return t.selectKey=`id`,t.addEventListener(`forge-table-row-click`,h),t.addEventListener(`forge-table-select`,v),t.addEventListener(`forge-table-select-all`,y),t.addEventListener(`forge-table-select-double`,b),t.addEventListener(`forge-table-initialized`,x),t.addEventListener(`forge-table-column-resize`,S),t.addEventListener(`forge-table-filter`,e=>{g(e);let n=e.detail.value,r=e.detail.columnIndex;T[w[r].property]=n,t.data=C.filter(e=>Object.keys(T).every(t=>T[t]===``||e[t]?.toString().toLowerCase().includes(T[t].toLowerCase())))}),t.addEventListener(`forge-table-sort`,e=>{_(e);let n=e.detail.direction,r=e.detail.columnIndex,i=w[r].property;t.data=C.sort((e,t)=>{let r=e[i],a=t[i];return typeof r==`number`&&typeof a==`number`?n===u.Ascending?r-a:a-r:n===u.Ascending?String(r).localeCompare(String(a)):String(a).localeCompare(String(r))})}),t},component:m,argTypes:{...s({tagName:m,exclude:[`selectKey`,`rowCreated`,`cellCreated`,`selectAllTemplate`],controls:{columnConfigurations:{control:{type:`object`}},data:{control:{type:`object`}},multiselect:{if:{arg:`select`,eq:!0}}}})},args:{data:C,columnConfigurations:w,select:!0,multiselect:!0,tooltipSelect:`Select row`,tooltipSelectAll:`Select all rows`,dense:!1,roomy:!1,filter:!1,fixedHeaders:!1,layoutType:`auto`,wrapContent:!0,resizable:!1,minResizeWidth:100,allowRowClick:!1,multiColumnSort:!1,selectCheckboxAlignment:`center`,includeFooter:!1}},D={parameters:{docs:{source:{code:`<forge-table></forge-table>`}}}},O={...i,render:()=>n`
    <table class="forge-data-table">
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
          <th>Column 4</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Row 1, Col 1</td>
          <td>Row 1, Col 2</td>
          <td>Row 1, Col 3</td>
          <td>Row 1, Col 4</td>
        </tr>
        <tr>
          <td>Row 2, Col 1</td>
          <td>Row 2, Col 2</td>
          <td>Row 2, Col 3</td>
          <td>Row 2, Col 4</td>
        </tr>
        <tr>
          <td>Row 3, Col 1</td>
          <td>Row 3, Col 2</td>
          <td>Row 3, Col 3</td>
          <td>Row 3, Col 4</td>
        </tr>
      </tbody>
    </table>
  `},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      source: {
        code: \`<forge-table></forge-table>\`
      }
    }
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <table class="forge-data-table">
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
          <th>Column 4</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Row 1, Col 1</td>
          <td>Row 1, Col 2</td>
          <td>Row 1, Col 3</td>
          <td>Row 1, Col 4</td>
        </tr>
        <tr>
          <td>Row 2, Col 1</td>
          <td>Row 2, Col 2</td>
          <td>Row 2, Col 3</td>
          <td>Row 2, Col 4</td>
        </tr>
        <tr>
          <td>Row 3, Col 1</td>
          <td>Row 3, Col 2</td>
          <td>Row 3, Col 3</td>
          <td>Row 3, Col 4</td>
        </tr>
      </tbody>
    </table>
  \`
}`,...O.parameters?.docs?.source}}},k=[`Demo`,`CSSOnly`]})))()}export{A as i,D as n,f as r,O as t};