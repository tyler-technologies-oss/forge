import{a as r}from"./chunk-454WOBUV-CM0pFb8Z.js";import{c as y,g as v,s as R}from"./utils-DnAZaZRm.js";import"./constants-DjE6emXm.js";import{F as S,S as g}from"./table-gFSFqBw3.js";import"./checkbox-Dsowcwzy.js";import"./index-Dh0vMUMR.js";import"./expansion-panel-Da14WzAs.js";import"./icon-DHpZ4R73.js";import{T as L}from"./text-field-R8sNW8Ph.js";import"./base-field-BB2ajAbv.js";import"./focus-indicator-BpCDYqsq.js";import"./label-BzpargFq.js";import"./button-CoZ69e4-.js";import"./state-layer-DkOkOFSZ.js";import"./button-toggle-group-pGGDU2pF.js";import"./icon-button-B5lcHsAP.js";import"./switch-DwfRMwQ7.js";import{x as N}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";class u extends S{constructor(t){super(t)}_build(){const t=document.createElement(L.elementName);return this._inputElement=this._buildInputElement(t),t.append(this._inputElement),t}_configure(){var t,e,n,l,i,o,s;(t=this._config.options)!=null&&t.id&&(this._element.id=this._config.options.id),(e=this._config.options)!=null&&e.label&&this._createLabel(this._config.options.label),(n=this._config.options)!=null&&n.startElement&&(this._config.options.startElement.slot="start",this._element.append(this._config.options.startElement)),(l=this._config.options)!=null&&l.leadingElement&&(this._config.options.leadingElement.slot="start",this._element.append(this._config.options.leadingElement)),(i=this._config.options)!=null&&i.endElement&&(this._config.options.endElement.slot="end",this._element.append(this._config.options.endElement)),(o=this._config.options)!=null&&o.trailingElement&&(this._config.options.trailingElement.slot="end",this._element.append(this._config.options.trailingElement)),(s=this._config.options)!=null&&s.accessoryElement&&(this._config.options.accessoryElement.slot="accessory",this._element.append(this._config.options.accessoryElement))}get value(){return this._inputElement.value}set value(t){this._inputElement.value=t}get disabled(){return this._inputElement.disabled}set disabled(t){this._inputElement.disabled=t}get invalid(){return this._element.invalid}set invalid(t){this._element.invalid=t}get inputElement(){return this._inputElement}get labelElement(){return this._labelElement}onChange(t){this._inputElement.addEventListener("input",e=>t(e.target.value))}onFocus(t){this._inputElement.addEventListener("focus",e=>t(e))}onBlur(t){this._inputElement.addEventListener("blur",e=>t(e))}setLabel(t){var e;if(t){this._labelElement?this._labelElement.textContent=t:this._createLabel(t);return}(e=this._labelElement)==null||e.remove(),this._labelElement=void 0}setSupportText(t){var e;if(t){this._supportTextElement||(this._supportTextElement=document.createElement("span"),this._supportTextElement.slot="support-text",this._element.append(this._supportTextElement)),this._supportTextElement.textContent=t;return}(e=this._supportTextElement)==null||e.remove(),this._supportTextElement=void 0}setHelperText(t){this.setSupportText(t)}setSupportTextEnd(t){var e;if(t){this._supportTextEndElement||(this._supportTextEndElement=document.createElement("span"),this._supportTextEndElement.slot="support-text-end",this._element.append(this._supportTextEndElement)),this._supportTextEndElement.textContent=t;return}(e=this._supportTextEndElement)==null||e.remove(),this._supportTextEndElement=void 0}floatLabel(t){this._element.floatLabel=t}_createLabel(t){var e;this._labelElement=document.createElement("label"),this._labelElement.textContent=t,this._labelElement.slot="label",(e=this._config.options)!=null&&e.id&&(this._labelElement.htmlFor=this._config.options.id),this._element.append(this._labelElement)}_buildInputElement(t){var n,l,i,o;const e=document.createElement("input");return e.type=((n=this._config.options)==null?void 0:n.type)??"text",((l=this._config.options)==null?void 0:l.value)!==void 0&&(e.value=this._config.options.value),(i=this._config.options)!=null&&i.id&&(e.id=this._config.options.id),((o=this._config.options)==null?void 0:o.placeholder)!==void 0&&(e.placeholder=this._config.options.placeholder),t.append(e),e}}const h="forge-table",A=r("forge-table-row-click"),D=r("forge-table-filter"),F=r("forge-table-sort"),z=r("forge-table-select"),I=r("forge-table-select-double"),O=r("forge-table-initialized"),j=r("forge-table-column-resize"),f=[{id:0,firstName:"Alice",lastName:"Smith",age:25},{id:1,firstName:"Bob",lastName:"Johnson",age:35},{id:2,firstName:"Charlie",lastName:"Brown",age:45},{id:3,firstName:"David",lastName:"Miller",age:55},{id:4,firstName:"Eve",lastName:"Williams",age:65}],m=[{header:"First Name",property:"firstName",sortable:!0,initialSort:!0,filter:!0,filterDelegate:()=>new u({options:{placeholder:"Filter first name..."},props:{showClear:!0}})},{header:"Last Name",property:"lastName",sortable:!0,filter:!0,filterDelegate:()=>new u({options:{placeholder:"Filter last name..."},props:{showClear:!0}})},{header:"Age",property:"age",sortable:!0,filter:!0,filterDelegate:()=>new u({options:{placeholder:"Filter age..."},props:{showClear:!0}})}],c={firstName:"",lastName:"",age:""},k={title:"Components/Table",render:_=>{const t=y(h,_);return t.selectKey="id",t.addEventListener("forge-table-row-click",A),t.addEventListener("forge-table-select",z),t.addEventListener("forge-table-select-double",I),t.addEventListener("forge-table-initialized",O),t.addEventListener("forge-table-column-resize",j),t.addEventListener("forge-table-filter",e=>{D(e);const n=e.detail.value,l=e.detail.columnIndex;c[m[l].property]=n,t.data=f.filter(i=>Object.keys(c).every(o=>c[o]===""?!0:i[o].toString().toLowerCase().includes(c[o].toLowerCase())))}),t.addEventListener("forge-table-sort",e=>{F(e);const n=e.detail.direction,l=e.detail.columnIndex;t.data=f.sort((i,o)=>{const s=i[m[l].property],a=o[m[l].property];return typeof s=="number"&&typeof a=="number"?n===g.Ascending?s-a:a-s:n===g.Ascending?s.localeCompare(a):a.localeCompare(s)})}),t},component:h,argTypes:{...v({tagName:h,exclude:["selectKey","rowCreated","cellCreated","selectAllTemplate"],controls:{columnConfigurations:{control:{type:"object"}},data:{control:{type:"object"}},multiselect:{if:{arg:"select",eq:!0}}}})},args:{data:f,columnConfigurations:m,select:!0,multiselect:!0,tooltipSelect:"Select row",tooltipSelectAll:"Select all rows",dense:!1,roomy:!1,filter:!1,fixedHeaders:!1,layoutType:"auto",wrapContent:!0,resizable:!1,minResizeWidth:100,allowRowClick:!1,multiColumnSort:!1,selectCheckboxAlignment:"center"}},d={},p={...R,render:()=>N`
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
    `};var E,b,C;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:"{}",...(C=(b=d.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var w,T,x;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(x=(T=p.parameters)==null?void 0:T.docs)==null?void 0:x.source}}};const B=["Demo","CSSOnly"],lt=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:p,Demo:d,__namedExportsOrder:B,default:k},Symbol.toStringTag,{value:"Module"}));export{p as C,d as D,lt as T};
