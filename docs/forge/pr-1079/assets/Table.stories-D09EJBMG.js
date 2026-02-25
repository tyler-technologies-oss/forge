import{s as b,g as C,c as w}from"./utils-zCyTXnrZ.js";import"./service-adapter-CoGDs2_3.js";import{F as T,S as _}from"./table-zH8x9uxO.js";import"./checkbox-DW8QQYdx.js";import"./index-DTwfV0k0.js";import"./expansion-panel-CKd1i4pm.js";import"./open-icon-DNzxAzu8.js";import"./tyler-icons-DRTyRvfU.js";import{T as S}from"./text-field-TrCZ3xYL.js";import"./base-field-BDjPjPCs.js";import"./focus-indicator-D4rjhUva.js";import"./label-DjhrjYcA.js";import"./button-Bi90NRzP.js";import"./state-layer-D7Damx7l.js";import"./button-toggle-group-BVIytbZM.js";import"./icon-button-dDjQtfj0.js";import"./switch-DReLaeSi.js";import{b as y}from"./iframe-CvOKOd3F.js";class c extends T{constructor(e){super(e)}_build(){const e=document.createElement(S.elementName);return this._inputElement=this._buildInputElement(e),e.append(this._inputElement),e}_configure(){this._config.options?.label&&this._createLabel(this._config.options.label),this._config.options?.startElement&&(this._config.options.startElement.slot="start",this._element.append(this._config.options.startElement)),this._config.options?.leadingElement&&(this._config.options.leadingElement.slot="start",this._element.append(this._config.options.leadingElement)),this._config.options?.endElement&&(this._config.options.endElement.slot="end",this._element.append(this._config.options.endElement)),this._config.options?.trailingElement&&(this._config.options.trailingElement.slot="end",this._element.append(this._config.options.trailingElement)),this._config.options?.accessoryElement&&(this._config.options.accessoryElement.slot="accessory",this._element.append(this._config.options.accessoryElement))}get value(){return this._inputElement.value}set value(e){this._inputElement.value=e}get disabled(){return this._inputElement.disabled}set disabled(e){this._inputElement.disabled=e}get invalid(){return this._element.invalid}set invalid(e){this._element.invalid=e}get inputElement(){return this._inputElement}get labelElement(){return this._labelElement}onChange(e){this._inputElement.addEventListener("input",t=>e(t.target.value))}onFocus(e){this._inputElement.addEventListener("focus",t=>e(t))}onBlur(e){this._inputElement.addEventListener("blur",t=>e(t))}setLabel(e){if(e){this._labelElement?this._labelElement.textContent=e:this._createLabel(e);return}this._labelElement?.remove(),this._labelElement=void 0}setSupportText(e){if(e){this._supportTextElement||(this._supportTextElement=document.createElement("span"),this._supportTextElement.slot="support-text",this._element.append(this._supportTextElement)),this._supportTextElement.textContent=e;return}this._supportTextElement?.remove(),this._supportTextElement=void 0}setHelperText(e){this.setSupportText(e)}setSupportTextEnd(e){if(e){this._supportTextEndElement||(this._supportTextEndElement=document.createElement("span"),this._supportTextEndElement.slot="support-text-end",this._element.append(this._supportTextEndElement)),this._supportTextEndElement.textContent=e;return}this._supportTextEndElement?.remove(),this._supportTextEndElement=void 0}floatLabel(e){this._element.floatLabel=e}_createLabel(e){this._labelElement=document.createElement("label"),this._labelElement.textContent=e,this._labelElement.slot="label",this._config.options?.id&&(this._labelElement.htmlFor=this._config.options.id),this._element.append(this._labelElement)}_buildInputElement(e){const t=document.createElement("input");return t.type=this._config.options?.type??"text",this._config.options?.value!==void 0&&(t.value=this._config.options.value),this._config.options?.id&&(t.id=this._config.options.id),this._config.options?.placeholder!==void 0&&(t.placeholder=this._config.options.placeholder),e.append(t),t}}const{action:o}=__STORYBOOK_MODULE_ACTIONS__,u="forge-table",x=o("forge-table-row-click"),v=o("forge-table-filter"),R=o("forge-table-sort"),L=o("forge-table-select"),A=o("forge-table-select-all"),N=o("forge-table-select-double"),D=o("forge-table-initialized"),F=o("forge-table-column-resize"),h=[{id:0,firstName:"Alice",lastName:"Smith",age:25},{id:1,firstName:"Bob",lastName:"Johnson",age:35},{id:2,firstName:"Charlie",lastName:"Brown",age:45},{id:3,firstName:"David",lastName:"Miller",age:55},{id:4,firstName:"Eve",lastName:"Williams",age:65}],f=[{header:"First Name",property:"firstName",sortable:!0,initialSort:!0,filter:!0,filterDelegate:()=>new c({options:{placeholder:"Filter first name..."},props:{showClear:!0}})},{header:"Last Name",property:"lastName",sortable:!0,filter:!0,filterDelegate:()=>new c({options:{placeholder:"Filter last name..."},props:{showClear:!0}})},{header:"Age",property:"age",sortable:!0,filter:!0,filterDelegate:()=>new c({options:{placeholder:"Filter age..."},props:{showClear:!0}})}],p={firstName:"",lastName:"",age:""},O={title:"Components/Table",render:g=>{const e=w(u,g);return e.selectKey="id",e.addEventListener("forge-table-row-click",x),e.addEventListener("forge-table-select",L),e.addEventListener("forge-table-select-all",A),e.addEventListener("forge-table-select-double",N),e.addEventListener("forge-table-initialized",D),e.addEventListener("forge-table-column-resize",F),e.addEventListener("forge-table-filter",t=>{v(t);const a=t.detail.value,m=t.detail.columnIndex;p[f[m].property]=a,e.data=h.filter(d=>Object.keys(p).every(n=>p[n]===""?!0:d[n]?.toString().toLowerCase().includes(p[n].toLowerCase())))}),e.addEventListener("forge-table-sort",t=>{R(t);const a=t.detail.direction,m=t.detail.columnIndex,d=f[m].property;e.data=h.sort((n,E)=>{const l=n[d],i=E[d];return typeof l=="number"&&typeof i=="number"?a===_.Ascending?l-i:i-l:a===_.Ascending?String(l).localeCompare(String(i)):String(i).localeCompare(String(l))})}),e},component:u,argTypes:{...C({tagName:u,exclude:["selectKey","rowCreated","cellCreated","selectAllTemplate"],controls:{columnConfigurations:{control:{type:"object"}},data:{control:{type:"object"}},multiselect:{if:{arg:"select",eq:!0}}}})},args:{data:h,columnConfigurations:f,select:!0,multiselect:!0,tooltipSelect:"Select row",tooltipSelectAll:"Select all rows",dense:!1,roomy:!1,filter:!1,fixedHeaders:!1,layoutType:"auto",wrapContent:!0,resizable:!1,minResizeWidth:100,allowRowClick:!1,multiColumnSort:!1,selectCheckboxAlignment:"center"}},r={parameters:{docs:{source:{code:"<forge-table></forge-table>"}}}},s={...b,render:()=>y`
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
  `};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      source: {
        code: \`<forge-table></forge-table>\`
      }
    }
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};const z=["Demo","CSSOnly"],$=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:s,Demo:r,__namedExportsOrder:z,default:O},Symbol.toStringTag,{value:"Module"}));export{s as C,r as D,$ as T};
