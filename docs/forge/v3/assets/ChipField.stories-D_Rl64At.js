import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-CebKObJP.js";import{_ as a,l as o,m as s,n as c,s as l}from"./utils-C3ow8Ikc.js";import{r as u,t as d}from"./style-map-C_WKUe4Y.js";import{n as f,t as p}from"./autocomplete-2RACd84s.js";import{i as m,n as h,t as g}from"./ref-DN8O4ptj.js";var _=t({Demo:()=>w,WithAutocomplete:()=>T,__namedExportsOrder:()=>E,default:()=>C}),v,y,b,x,S,C,w,T,E;function D(){return(D=e((()=>{i(),d(),s(),g(),f(),p(),{action:v}=__STORYBOOK_MODULE_ACTIONS__,y=`forge-chip-field`,b=[{label:`Alabama`,value:`AL`},{label:`Alaska`,value:`AK`},{label:`Arizona`,value:`AZ`},{label:`Arkansas`,value:`AR`},{label:`California`,value:`CA`},{label:`Colorado`,value:`CO`},{label:`Connecticut`,value:`CT`},{label:`Delaware`,value:`DE`},{label:`Florida`,value:`FL`},{label:`Georgia`,value:`GA`},{label:`Hawaii`,value:`HI`},{label:`Idaho`,value:`ID`},{label:`Illinois`,value:`IL`},{label:`Indiana`,value:`IN`},{label:`Iowa`,value:`IA`},{label:`Kansas`,value:`KS`},{label:`Kentucky`,value:`KY`},{label:`Louisiana`,value:`LA`},{label:`Maine`,value:`ME`},{label:`Maryland`,value:`MD`},{label:`Massachusetts`,value:`MA`},{label:`Michigan`,value:`MI`},{label:`Minnesota`,value:`MN`},{label:`Mississippi`,value:`MS`},{label:`Missouri`,value:`MO`},{label:`Montana`,value:`MT`},{label:`Nebraska`,value:`NE`},{label:`Nevada`,value:`NV`},{label:`New Hampshire`,value:`H`},{label:`New Jersey`,value:`J`},{label:`New Mexico`,value:`NM`},{label:`New York`,value:`NY`},{label:`North Carolina`,value:`NC`},{label:`North Dakota`,value:`ND`},{label:`Ohio`,value:`OH`},{label:`Oklahoma`,value:`OK`},{label:`Oregon`,value:`OR`},{label:`Pennsylvania`,value:`PA`},{label:`Rhode Island`,value:`RI`},{label:`South Carolina`,value:`C`},{label:`South Dakota`,value:`SD`},{label:`Tennessee`,value:`TN`},{label:`Texas`,value:`TX`},{label:`Utah`,value:`UT`},{label:`Vermont`,value:`VT`},{label:`Virginia`,value:`VA`},{label:`Washington`,value:`WA`},{label:`West Virginia`,value:`WV`},{label:`Wisconsin`,value:`WI`},{label:`Wyoming`,value:`WY`}],x=v(`forge-chip-field-member-added`),S=v(`forge-chip-field-member-removed`),C={title:`Components/Chip Field`,render:e=>{let t=o(e),i=t?u(t):r,a=e=>{if(e.target){let t=e.target,n=e.detail,r=document.createElement(`forge-chip`);r.setAttribute(`slot`,`member`),r.setAttribute(`type`,`field`),r.setAttribute(`dense`,``),r.addEventListener(`forge-chip-delete`,c),r.value=n,r.textContent=n,t.appendChild(r)}x(e)},s=e=>{e.detail.remove(),S(e)},c=e=>{e.target&&e.target.remove()};return n`
      <forge-chip-field
        .addOnBlur=${e.addOnBlur}
        .floatLabel=${e.floatLabel}
        .labelPosition=${e.labelPosition}
        .labelAlignment=${e.labelAlignment}
        .invalid=${e.invalid}
        .required=${e.required}
        .optional=${e.optional}
        .disabled=${e.disabled}
        .dense=${e.dense}
        .popoverIcon=${e.popoverIcon}
        .popoverExpanded=${e.popoverExpanded}
        .variant=${e.variant}
        .theme=${e.theme}
        .shape=${e.shape}
        .density=${e.density}
        @forge-chip-field-member-added=${a}
        @forge-chip-field-member-removed=${s}
        style=${i}>
        <label slot="label" for="tag-input">Tags</label>
        <input type="text" id="tag-input" />
        <div slot="support-text">Press enter to create a tag</div>
      </forge-chip-field>
    `},component:y,subcomponents:{Chip:`forge-chip`},argTypes:{...l({tagName:y,exclude:[`value`,`popoverTargetElement`,`supportTextInset`],controls:{labelPosition:{control:`select`,options:[`inline-start`,`inline-end`,`block-start`,`inset`,`none`]},labelAlignment:{control:`select`,options:[`default`,`center`,`baseline`,`start`,`end`]},variant:{control:`select`,options:[`plain`,`outlined`,`tonal`,`filled`,`raised`]},shape:{control:`select`,options:[`default`,`rounded`,`square`]},density:{control:`select`,options:[`default`,`extra-small`,`small`,`medium`,`large`,`extra-large`]},theme:{control:`select`,options:[`default`,...c]}}})},args:{addOnBlur:!1,floatLabel:!1,labelPosition:`inset`,labelAlignment:`default`,invalid:!1,required:!1,optional:!1,disabled:!1,density:`default`,dense:!1,popoverIcon:!1,popoverExpanded:!1}},w={},T={...a,render:()=>{let e=h(),t=[],r=e=>b.filter(({value:e})=>!t.includes(e)).filter(({label:t})=>t.toLowerCase().includes(e.toLowerCase())),i=e=>{t.includes(e.detail.value)||(a(e.detail.value),t.push(e.detail.value))};function a(n){let r=document.createElement(`forge-chip`);r.setAttribute(`slot`,`member`),r.type=`field`,r.dense=!0,r.value=n,r.textContent=n,r.addEventListener(`forge-chip-delete`,()=>{r.remove(),t.splice(t.indexOf(n),1)}),e.value?.appendChild(r)}return n`
      <forge-autocomplete .filter=${r} mode="stateless" @forge-autocomplete-select=${i}>
        <forge-chip-field ${m(e)} popover-icon show-clear>
          <label slot="label" for="tag-input">Tags</label>
          <input type="text" id="tag-input" />
        </forge-chip-field>
      </forge-autocomplete>
    `}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const chipFieldRef = createRef<IChipFieldComponent>();
    const selectedAutocompleteValues: string[] = [];
    const filter = (filterText: string): IOption[] => {
      const remainingStates = US_STATES.filter(({
        value
      }) => !selectedAutocompleteValues.includes(value));
      return remainingStates.filter(({
        label
      }) => label.toLowerCase().includes(filterText.toLowerCase()));
    };
    const onSelect = (evt: CustomEvent<IAutocompleteSelectEventData>): void => {
      const exists = selectedAutocompleteValues.includes(evt.detail.value);
      if (!exists) {
        addMember(evt.detail.value);
        selectedAutocompleteValues.push(evt.detail.value);
      }
    };
    function addMember(value: string): void {
      const newChip = document.createElement('forge-chip');
      newChip.setAttribute('slot', 'member');
      newChip.type = 'field';
      newChip.dense = true;
      newChip.value = value;
      newChip.textContent = value;
      newChip.addEventListener('forge-chip-delete', () => {
        newChip.remove();
        selectedAutocompleteValues.splice(selectedAutocompleteValues.indexOf(value), 1);
      });
      chipFieldRef.value?.appendChild(newChip);
    }
    return html\`
      <forge-autocomplete .filter=\${filter} mode="stateless" @forge-autocomplete-select=\${onSelect}>
        <forge-chip-field \${ref(chipFieldRef)} popover-icon show-clear>
          <label slot="label" for="tag-input">Tags</label>
          <input type="text" id="tag-input" />
        </forge-chip-field>
      </forge-autocomplete>
    \`;
  }
}`,...T.parameters?.docs?.source}}},E=[`Demo`,`WithAutocomplete`]})))()}export{D as i,w as n,T as r,_ as t};