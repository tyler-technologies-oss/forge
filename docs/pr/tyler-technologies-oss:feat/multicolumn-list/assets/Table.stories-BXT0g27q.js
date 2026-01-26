import{g as E,s as b,c as C}from"./utils-DsSoWqyO.js";import"./service-adapter-CffG5Lhq.js";import{F as w,S as _}from"./table-DBNmSV8A.js";import"./checkbox-VF6_JXKv.js";import"./index-DTwfV0k0.js";import"./expansion-panel-BYSwwFye.js";import"./open-icon-pKbfwaP0.js";import"./icon-Uwxy940_.js";import{T}from"./text-field-Dz1Qgq4L.js";import"./base-field-Xq59hvFp.js";import"./focus-indicator-BLwe5ycG.js";import"./label-C88z5MGI.js";import"./button--VLz5M7S.js";import"./state-layer-BEEsPoZf.js";import"./button-toggle-group-RMwhM1eu.js";import"./icon-button-BvFpEW_8.js";import"./switch-DKdUYrFg.js";import{x}from"./iframe-D16noSNJ.js";class u extends w{constructor(e){super(e)}_build(){const e=document.createElement(T.elementName);return this._inputElement=this._buildInputElement(e),e.append(this._inputElement),e}_configure(){this._config.options?.label&&this._createLabel(this._config.options.label),this._config.options?.startElement&&(this._config.options.startElement.slot="start",this._element.append(this._config.options.startElement)),this._config.options?.leadingElement&&(this._config.options.leadingElement.slot="start",this._element.append(this._config.options.leadingElement)),this._config.options?.endElement&&(this._config.options.endElement.slot="end",this._element.append(this._config.options.endElement)),this._config.options?.trailingElement&&(this._config.options.trailingElement.slot="end",this._element.append(this._config.options.trailingElement)),this._config.options?.accessoryElement&&(this._config.options.accessoryElement.slot="accessory",this._element.append(this._config.options.accessoryElement))}get value(){return this._inputElement.value}set value(e){this._inputElement.value=e}get disabled(){return this._inputElement.disabled}set disabled(e){this._inputElement.disabled=e}get invalid(){return this._element.invalid}set invalid(e){this._element.invalid=e}get inputElement(){return this._inputElement}get labelElement(){return this._labelElement}onChange(e){this._inputElement.addEventListener("input",t=>e(t.target.value))}onFocus(e){this._inputElement.addEventListener("focus",t=>e(t))}onBlur(e){this._inputElement.addEventListener("blur",t=>e(t))}setLabel(e){if(e){this._labelElement?this._labelElement.textContent=e:this._createLabel(e);return}this._labelElement?.remove(),this._labelElement=void 0}setSupportText(e){if(e){this._supportTextElement||(this._supportTextElement=document.createElement("span"),this._supportTextElement.slot="support-text",this._element.append(this._supportTextElement)),this._supportTextElement.textContent=e;return}this._supportTextElement?.remove(),this._supportTextElement=void 0}setHelperText(e){this.setSupportText(e)}setSupportTextEnd(e){if(e){this._supportTextEndElement||(this._supportTextEndElement=document.createElement("span"),this._supportTextEndElement.slot="support-text-end",this._element.append(this._supportTextEndElement)),this._supportTextEndElement.textContent=e;return}this._supportTextEndElement?.remove(),this._supportTextEndElement=void 0}floatLabel(e){this._element.floatLabel=e}_createLabel(e){this._labelElement=document.createElement("label"),this._labelElement.textContent=e,this._labelElement.slot="label",this._config.options?.id&&(this._labelElement.htmlFor=this._config.options.id),this._element.append(this._labelElement)}_buildInputElement(e){const t=document.createElement("input");return t.type=this._config.options?.type??"text",this._config.options?.value!==void 0&&(t.value=this._config.options.value),this._config.options?.id&&(t.id=this._config.options.id),this._config.options?.placeholder!==void 0&&(t.placeholder=this._config.options.placeholder),e.append(t),t}}const{action:o}=__STORYBOOK_MODULE_ACTIONS__,h="forge-table",y=o("forge-table-row-click"),v=o("forge-table-filter"),S=o("forge-table-sort"),R=o("forge-table-select"),L=o("forge-table-select-all"),A=o("forge-table-select-double"),N=o("forge-table-initialized"),D=o("forge-table-column-resize"),f=[{id:0,firstName:"Alice",lastName:"Smith",age:25},{id:1,firstName:"Bob",lastName:"Johnson",age:35},{id:2,firstName:"Charlie",lastName:"Brown",age:45},{id:3,firstName:"David",lastName:"Miller",age:55},{id:4,firstName:"Eve",lastName:"Williams",age:65}],p=[{header:"First Name",property:"firstName",sortable:!0,initialSort:!0,filter:!0,filterDelegate:()=>new u({options:{placeholder:"Filter first name..."},props:{showClear:!0}})},{header:"Last Name",property:"lastName",sortable:!0,filter:!0,filterDelegate:()=>new u({options:{placeholder:"Filter last name..."},props:{showClear:!0}})},{header:"Age",property:"age",sortable:!0,filter:!0,filterDelegate:()=>new u({options:{placeholder:"Filter age..."},props:{showClear:!0}})}],m={firstName:"",lastName:"",age:""},F={title:"Components/Table",render:g=>{const e=C(h,g);return e.selectKey="id",e.addEventListener("forge-table-row-click",y),e.addEventListener("forge-table-select",R),e.addEventListener("forge-table-select-all",L),e.addEventListener("forge-table-select-double",A),e.addEventListener("forge-table-initialized",N),e.addEventListener("forge-table-column-resize",D),e.addEventListener("forge-table-filter",t=>{v(t);const a=t.detail.value,d=t.detail.columnIndex;m[p[d].property]=a,e.data=f.filter(c=>Object.keys(m).every(n=>m[n]===""?!0:c[n].toString().toLowerCase().includes(m[n].toLowerCase())))}),e.addEventListener("forge-table-sort",t=>{S(t);const a=t.detail.direction,d=t.detail.columnIndex;e.data=f.sort((c,n)=>{const l=c[p[d].property],i=n[p[d].property];return typeof l=="number"&&typeof i=="number"?a===_.Ascending?l-i:i-l:a===_.Ascending?l.localeCompare(i):i.localeCompare(l)})}),e},component:h,argTypes:{...E({tagName:h,exclude:["selectKey","rowCreated","cellCreated","selectAllTemplate"],controls:{columnConfigurations:{control:{type:"object"}},data:{control:{type:"object"}},multiselect:{if:{arg:"select",eq:!0}}}})},args:{data:f,columnConfigurations:p,select:!0,multiselect:!0,tooltipSelect:"Select row",tooltipSelectAll:"Select all rows",dense:!1,roomy:!1,filter:!1,fixedHeaders:!1,layoutType:"auto",wrapContent:!0,resizable:!1,minResizeWidth:100,allowRowClick:!1,multiColumnSort:!1,selectCheckboxAlignment:"center"}},r={parameters:{docs:{source:{code:"<forge-table></forge-table>"}}}},s={...b,render:()=>x`
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
  render: () => {
    return html\`
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
    \`;
  }
}`,...s.parameters?.docs?.source}}};const O=["Demo","CSSOnly"],Z=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:s,Demo:r,__namedExportsOrder:O,default:F},Symbol.toStringTag,{value:"Module"}));export{s as C,r as D,Z as T};
