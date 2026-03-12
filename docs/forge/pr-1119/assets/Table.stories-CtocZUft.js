import{s as b,g as C,c as w}from"./utils-Ckg8JNDy.js";import"./service-adapter-8tADcN_b.js";import{F as T,S as _}from"./table-L3uy8S9A.js";import"./checkbox-DvcYDMoO.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./expansion-panel-C10jyLKT.js";import"./open-icon-D9xPVFtv.js";import"./tyler-icons-BPPraRYM.js";import{T as S}from"./text-field-DdKTfqir.js";import"./base-field-C5n_ApQC.js";import"./focus-indicator-EatIIEs7.js";import"./label-I34sSzDA.js";import"./button-BQLvLqBM.js";import"./state-layer-D0SSeJ16.js";import"./button-toggle-group-DuGP473l.js";import"./icon-button-D3lzCQ6m.js";import"./switch-dWF8Uu4p.js";import{b as y}from"./iframe-D8FO6Qui.js";class h extends T{constructor(e){super(e)}_build(){const e=document.createElement(S.elementName);return this._inputElement=this._buildInputElement(e),e.append(this._inputElement),e}_configure(){this._config.options?.label&&this._createLabel(this._config.options.label),this._config.options?.startElement&&(this._config.options.startElement.slot="start",this._element.append(this._config.options.startElement)),this._config.options?.leadingElement&&(this._config.options.leadingElement.slot="start",this._element.append(this._config.options.leadingElement)),this._config.options?.endElement&&(this._config.options.endElement.slot="end",this._element.append(this._config.options.endElement)),this._config.options?.trailingElement&&(this._config.options.trailingElement.slot="end",this._element.append(this._config.options.trailingElement)),this._config.options?.accessoryElement&&(this._config.options.accessoryElement.slot="accessory",this._element.append(this._config.options.accessoryElement))}get value(){return this._inputElement.value}set value(e){this._inputElement.value=e}get disabled(){return this._inputElement.disabled}set disabled(e){this._inputElement.disabled=e}get invalid(){return this._element.invalid}set invalid(e){this._element.invalid=e}get inputElement(){return this._inputElement}get labelElement(){return this._labelElement}onChange(e,t){this._inputElement.addEventListener("input",o=>e(o.target.value),t)}onFocus(e,t){this._inputElement.addEventListener("focus",o=>e(o),t)}onBlur(e,t){this._inputElement.addEventListener("blur",o=>e(o),t)}setLabel(e){if(e){this._labelElement?this._labelElement.textContent=e:this._createLabel(e);return}this._labelElement?.remove(),this._labelElement=void 0}setSupportText(e){if(e){this._supportTextElement||(this._supportTextElement=document.createElement("span"),this._supportTextElement.slot="support-text",this._element.append(this._supportTextElement)),this._supportTextElement.textContent=e;return}this._supportTextElement?.remove(),this._supportTextElement=void 0}setHelperText(e){this.setSupportText(e)}setSupportTextEnd(e){if(e){this._supportTextEndElement||(this._supportTextEndElement=document.createElement("span"),this._supportTextEndElement.slot="support-text-end",this._element.append(this._supportTextEndElement)),this._supportTextEndElement.textContent=e;return}this._supportTextEndElement?.remove(),this._supportTextEndElement=void 0}floatLabel(e){this._element.floatLabel=e}_createLabel(e){this._labelElement=document.createElement("label"),this._labelElement.textContent=e,this._config.options?.id&&(this._labelElement.htmlFor=this._config.options.id),this._element.append(this._labelElement)}_buildInputElement(e){const t=document.createElement("input");return t.type=this._config.options?.type??"text",this._config.options?.value!==void 0&&(t.value=this._config.options.value),this._config.options?.id&&(t.id=this._config.options.id),this._config.options?.placeholder!==void 0&&(t.placeholder=this._config.options.placeholder),e.append(t),t}}const{action:n}=__STORYBOOK_MODULE_ACTIONS__,f="forge-table",v=n("forge-table-row-click"),x=n("forge-table-filter"),R=n("forge-table-sort"),L=n("forge-table-select"),A=n("forge-table-select-all"),N=n("forge-table-select-double"),D=n("forge-table-initialized"),F=n("forge-table-column-resize"),l=[{id:0,firstName:"Alice",lastName:"Smith",age:25},{id:1,firstName:"Bob",lastName:"Johnson",age:35},{id:2,firstName:"Charlie",lastName:"Brown",age:45},{id:3,firstName:"David",lastName:"Miller",age:55},{id:4,firstName:"Eve",lastName:"Williams",age:65}],g=[{header:"First Name",property:"firstName",footer:"Summary",sortable:!0,initialSort:!0,filter:!0,filterDelegate:()=>new h({options:{placeholder:"Filter first name..."},props:{showClear:!0}})},{header:"Last Name",property:"lastName",footer:`${l.length} rows`,sortable:!0,filter:!0,filterDelegate:()=>new h({options:{placeholder:"Filter last name..."},props:{showClear:!0}})},{header:"Age",property:"age",footer:`Avg: ${Math.round(l.reduce((p,e)=>p+e.age,0)/l.length)}`,sortable:!0,filter:!0,filterDelegate:()=>new h({options:{placeholder:"Filter age..."},props:{showClear:!0}})}],c={firstName:"",lastName:"",age:""},O={title:"Components/Table",render:p=>{const e=w(f,p);return e.selectKey="id",e.addEventListener("forge-table-row-click",v),e.addEventListener("forge-table-select",L),e.addEventListener("forge-table-select-all",A),e.addEventListener("forge-table-select-double",N),e.addEventListener("forge-table-initialized",D),e.addEventListener("forge-table-column-resize",F),e.addEventListener("forge-table-filter",t=>{x(t);const o=t.detail.value,u=t.detail.columnIndex;c[g[u].property]=o,e.data=l.filter(m=>Object.keys(c).every(i=>c[i]===""?!0:m[i]?.toString().toLowerCase().includes(c[i].toLowerCase())))}),e.addEventListener("forge-table-sort",t=>{R(t);const o=t.detail.direction,u=t.detail.columnIndex,m=g[u].property;e.data=l.sort((i,E)=>{const r=i[m],s=E[m];return typeof r=="number"&&typeof s=="number"?o===_.Ascending?r-s:s-r:o===_.Ascending?String(r).localeCompare(String(s)):String(s).localeCompare(String(r))})}),e},component:f,argTypes:{...C({tagName:f,exclude:["selectKey","rowCreated","cellCreated","selectAllTemplate"],controls:{columnConfigurations:{control:{type:"object"}},data:{control:{type:"object"}},multiselect:{if:{arg:"select",eq:!0}}}})},args:{data:l,columnConfigurations:g,select:!0,multiselect:!0,tooltipSelect:"Select row",tooltipSelectAll:"Select all rows",dense:!1,roomy:!1,filter:!1,fixedHeaders:!1,layoutType:"auto",wrapContent:!0,resizable:!1,minResizeWidth:100,allowRowClick:!1,multiColumnSort:!1,selectCheckboxAlignment:"center",includeFooter:!1}},a={parameters:{docs:{source:{code:"<forge-table></forge-table>"}}}},d={...b,render:()=>y`
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
  `};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      source: {
        code: \`<forge-table></forge-table>\`
      }
    }
  }
}`,...a.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};const z=["Demo","CSSOnly"],ee=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:d,Demo:a,__namedExportsOrder:z,default:O},Symbol.toStringTag,{value:"Module"}));export{d as C,a as D,ee as T};
