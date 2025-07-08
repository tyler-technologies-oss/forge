import{g as y,s as v,c as S}from"./utils-DXw3pzOw.js";import"./feature-detection-uS6p5jc8.js";import{F as R,S as _}from"./table-CgQEfyOI.js";import"./checkbox-DOmkbh7U.js";import"./index-CiLSBptl.js";import"./expansion-panel-Cn_4I3Ho.js";import"./icon-B8CdcxqJ.js";import{T as L}from"./text-field-su1dEfif.js";import"./base-field-WJtNENB5.js";import"./focus-indicator-IWpzSXYP.js";import"./label-BSASIOtP.js";import"./button-r2EMLpWm.js";import"./state-layer-BFwsAUDA.js";import"./button-toggle-group-D5jBldBo.js";import"./icon-button-DkluvO-9.js";import"./switch-Bt2bdQXJ.js";import{x as A}from"./iframe-BL36swfe.js";class u extends R{constructor(e){super(e)}_build(){const e=document.createElement(L.elementName);return this._inputElement=this._buildInputElement(e),e.append(this._inputElement),e}_configure(){var e,t,n,l,i,o;(e=this._config.options)!=null&&e.label&&this._createLabel(this._config.options.label),(t=this._config.options)!=null&&t.startElement&&(this._config.options.startElement.slot="start",this._element.append(this._config.options.startElement)),(n=this._config.options)!=null&&n.leadingElement&&(this._config.options.leadingElement.slot="start",this._element.append(this._config.options.leadingElement)),(l=this._config.options)!=null&&l.endElement&&(this._config.options.endElement.slot="end",this._element.append(this._config.options.endElement)),(i=this._config.options)!=null&&i.trailingElement&&(this._config.options.trailingElement.slot="end",this._element.append(this._config.options.trailingElement)),(o=this._config.options)!=null&&o.accessoryElement&&(this._config.options.accessoryElement.slot="accessory",this._element.append(this._config.options.accessoryElement))}get value(){return this._inputElement.value}set value(e){this._inputElement.value=e}get disabled(){return this._inputElement.disabled}set disabled(e){this._inputElement.disabled=e}get invalid(){return this._element.invalid}set invalid(e){this._element.invalid=e}get inputElement(){return this._inputElement}get labelElement(){return this._labelElement}onChange(e){this._inputElement.addEventListener("input",t=>e(t.target.value))}onFocus(e){this._inputElement.addEventListener("focus",t=>e(t))}onBlur(e){this._inputElement.addEventListener("blur",t=>e(t))}setLabel(e){var t;if(e){this._labelElement?this._labelElement.textContent=e:this._createLabel(e);return}(t=this._labelElement)==null||t.remove(),this._labelElement=void 0}setSupportText(e){var t;if(e){this._supportTextElement||(this._supportTextElement=document.createElement("span"),this._supportTextElement.slot="support-text",this._element.append(this._supportTextElement)),this._supportTextElement.textContent=e;return}(t=this._supportTextElement)==null||t.remove(),this._supportTextElement=void 0}setHelperText(e){this.setSupportText(e)}setSupportTextEnd(e){var t;if(e){this._supportTextEndElement||(this._supportTextEndElement=document.createElement("span"),this._supportTextEndElement.slot="support-text-end",this._element.append(this._supportTextEndElement)),this._supportTextEndElement.textContent=e;return}(t=this._supportTextEndElement)==null||t.remove(),this._supportTextEndElement=void 0}floatLabel(e){this._element.floatLabel=e}_createLabel(e){var t;this._labelElement=document.createElement("label"),this._labelElement.textContent=e,this._labelElement.slot="label",(t=this._config.options)!=null&&t.id&&(this._labelElement.htmlFor=this._config.options.id),this._element.append(this._labelElement)}_buildInputElement(e){var n,l,i,o;const t=document.createElement("input");return t.type=((n=this._config.options)==null?void 0:n.type)??"text",((l=this._config.options)==null?void 0:l.value)!==void 0&&(t.value=this._config.options.value),(i=this._config.options)!=null&&i.id&&(t.id=this._config.options.id),((o=this._config.options)==null?void 0:o.placeholder)!==void 0&&(t.placeholder=this._config.options.placeholder),e.append(t),t}}const{action:r}=__STORYBOOK_MODULE_ACTIONS__,h="forge-table",N=r("forge-table-row-click"),D=r("forge-table-filter"),F=r("forge-table-sort"),O=r("forge-table-select"),z=r("forge-table-select-all"),I=r("forge-table-select-double"),j=r("forge-table-initialized"),B=r("forge-table-column-resize"),f=[{id:0,firstName:"Alice",lastName:"Smith",age:25},{id:1,firstName:"Bob",lastName:"Johnson",age:35},{id:2,firstName:"Charlie",lastName:"Brown",age:45},{id:3,firstName:"David",lastName:"Miller",age:55},{id:4,firstName:"Eve",lastName:"Williams",age:65}],m=[{header:"First Name",property:"firstName",sortable:!0,initialSort:!0,filter:!0,filterDelegate:()=>new u({options:{placeholder:"Filter first name..."},props:{showClear:!0}})},{header:"Last Name",property:"lastName",sortable:!0,filter:!0,filterDelegate:()=>new u({options:{placeholder:"Filter last name..."},props:{showClear:!0}})},{header:"Age",property:"age",sortable:!0,filter:!0,filterDelegate:()=>new u({options:{placeholder:"Filter age..."},props:{showClear:!0}})}],c={firstName:"",lastName:"",age:""},k={title:"Components/Table",render:g=>{const e=S(h,g);return e.selectKey="id",e.addEventListener("forge-table-row-click",N),e.addEventListener("forge-table-select",O),e.addEventListener("forge-table-select-all",z),e.addEventListener("forge-table-select-double",I),e.addEventListener("forge-table-initialized",j),e.addEventListener("forge-table-column-resize",B),e.addEventListener("forge-table-filter",t=>{D(t);const n=t.detail.value,l=t.detail.columnIndex;c[m[l].property]=n,e.data=f.filter(i=>Object.keys(c).every(o=>c[o]===""?!0:i[o].toString().toLowerCase().includes(c[o].toLowerCase())))}),e.addEventListener("forge-table-sort",t=>{F(t);const n=t.detail.direction,l=t.detail.columnIndex;e.data=f.sort((i,o)=>{const s=i[m[l].property],a=o[m[l].property];return typeof s=="number"&&typeof a=="number"?n===_.Ascending?s-a:a-s:n===_.Ascending?s.localeCompare(a):a.localeCompare(s)})}),e},component:h,argTypes:{...y({tagName:h,exclude:["selectKey","rowCreated","cellCreated","selectAllTemplate"],controls:{columnConfigurations:{control:{type:"object"}},data:{control:{type:"object"}},multiselect:{if:{arg:"select",eq:!0}}}})},args:{data:f,columnConfigurations:m,select:!0,multiselect:!0,tooltipSelect:"Select row",tooltipSelectAll:"Select all rows",dense:!1,roomy:!1,filter:!1,fixedHeaders:!1,layoutType:"auto",wrapContent:!0,resizable:!1,minResizeWidth:100,allowRowClick:!1,multiColumnSort:!1,selectCheckboxAlignment:"center"}},d={parameters:{docs:{source:{code:"<forge-table></forge-table>"}}}},p={...v,render:()=>A`
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
    `};var E,b,C;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  parameters: {
    docs: {
      source: {
        code: \`<forge-table></forge-table>\`
      }
    }
  }
}`,...(C=(b=d.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var w,T,x;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(x=(T=p.parameters)==null?void 0:T.docs)==null?void 0:x.source}}};const M=["Demo","CSSOnly"],ne=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:p,Demo:d,__namedExportsOrder:M,default:k},Symbol.toStringTag,{value:"Module"}));export{p as C,d as D,ne as T};
