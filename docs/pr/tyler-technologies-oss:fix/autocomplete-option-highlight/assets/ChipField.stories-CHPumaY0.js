import{E as v,x as m}from"./iframe-9YjioO1c.js";import{o as f}from"./style-map-CVpJHEI_.js";import{g as h,s as g,G as A,a as C}from"./utils-bIwC1Fgv.js";import{n as S,e as x}from"./ref-DeN3J7NU.js";import"./service-adapter-CffG5Lhq.js";import"./autocomplete-ilA0eI8_.js";import"./label-CQwaP8e2.js";import"./index-5CPwzmQS.js";import"./button-5S9XFutB.js";import"./focus-indicator-CTHLKf7s.js";import"./state-layer-gAgMwMHF.js";import"./button-toggle-group-DW6FG3Bf.js";import"./checkbox-BbclVnmy.js";import"./icon-button-Dn210jvm.js";import"./icon-kuXwuZAY.js";import"./switch-DHWORTdm.js";import"./base-field-C8fR0u5-.js";import"./linear-progress-r0Hzg69v.js";import"./list-tCqc46qO.js";import"./popover-BWVazmya.js";import"./overlay-B5pGv-rV.js";import"./skeleton-BSiuL_ME.js";import"./text-field-BC79AHrq.js";const{action:b}=__STORYBOOK_MODULE_ACTIONS__,c="forge-chip-field",M=[{label:"Alabama",value:"AL"},{label:"Alaska",value:"AK"},{label:"Arizona",value:"AZ"},{label:"Arkansas",value:"AR"},{label:"California",value:"CA"},{label:"Colorado",value:"CO"},{label:"Connecticut",value:"CT"},{label:"Delaware",value:"DE"},{label:"Florida",value:"FL"},{label:"Georgia",value:"GA"},{label:"Hawaii",value:"HI"},{label:"Idaho",value:"ID"},{label:"Illinois",value:"IL"},{label:"Indiana",value:"IN"},{label:"Iowa",value:"IA"},{label:"Kansas",value:"KS"},{label:"Kentucky",value:"KY"},{label:"Louisiana",value:"LA"},{label:"Maine",value:"ME"},{label:"Maryland",value:"MD"},{label:"Massachusetts",value:"MA"},{label:"Michigan",value:"MI"},{label:"Minnesota",value:"MN"},{label:"Mississippi",value:"MS"},{label:"Missouri",value:"MO"},{label:"Montana",value:"MT"},{label:"Nebraska",value:"NE"},{label:"Nevada",value:"NV"},{label:"New Hampshire",value:"H"},{label:"New Jersey",value:"J"},{label:"New Mexico",value:"NM"},{label:"New York",value:"NY"},{label:"North Carolina",value:"NC"},{label:"North Dakota",value:"ND"},{label:"Ohio",value:"OH"},{label:"Oklahoma",value:"OK"},{label:"Oregon",value:"OR"},{label:"Pennsylvania",value:"PA"},{label:"Rhode Island",value:"RI"},{label:"South Carolina",value:"C"},{label:"South Dakota",value:"SD"},{label:"Tennessee",value:"TN"},{label:"Texas",value:"TX"},{label:"Utah",value:"UT"},{label:"Vermont",value:"VT"},{label:"Virginia",value:"VA"},{label:"Washington",value:"WA"},{label:"West Virginia",value:"WV"},{label:"Wisconsin",value:"WI"},{label:"Wyoming",value:"WY"}],T=b("forge-chip-field-member-added"),w=b("forge-chip-field-member-removed"),O={title:"Components/Chip Field",render:l=>{const a=C(l),s=a?f(a):v,d=e=>{if(e.target){const i=e.target,p=e.detail,o=document.createElement("forge-chip");o.setAttribute("slot","member"),o.setAttribute("type","field"),o.setAttribute("dense",""),o.addEventListener("forge-chip-delete",t),o.value=p,o.textContent=p,i.appendChild(o)}T(e)},u=e=>{e.detail.remove(),w(e)},t=e=>{e.target&&e.target.remove()};return m`
      <forge-chip-field
        .addOnBlur=${l.addOnBlur}
        .floatLabel=${l.floatLabel}
        .labelPosition=${l.labelPosition}
        .labelAlignment=${l.labelAlignment}
        .invalid=${l.invalid}
        .required=${l.required}
        .optional=${l.optional}
        .disabled=${l.disabled}
        .dense=${l.dense}
        .popoverIcon=${l.popoverIcon}
        .popoverExpanded=${l.popoverExpanded}
        .variant=${l.variant}
        .theme=${l.theme}
        .shape=${l.shape}
        .density=${l.density}
        @forge-chip-field-member-added=${d}
        @forge-chip-field-member-removed=${u}
        style=${s}>
        <label slot="label" for="tag-input">Tags</label>
        <input type="text" id="tag-input" />
        <div slot="support-text">Press enter to create a tag</div>
      </forge-chip-field>
    `},component:c,subcomponents:{Chip:"forge-chip"},argTypes:{...h({tagName:c,exclude:["value","popoverTargetElement","supportTextInset"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},shape:{control:"select",options:["default","rounded","square"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},theme:{control:"select",options:["default",...A]}}})},args:{addOnBlur:!1,floatLabel:!1,labelPosition:"inset",labelAlignment:"default",invalid:!1,required:!1,optional:!1,disabled:!1,density:"default",dense:!1,popoverIcon:!1,popoverExpanded:!1}},n={},r={...g,render:()=>{const l=x(),a=[],s=t=>M.filter(({value:i})=>!a.includes(i)).filter(({label:i})=>i.toLowerCase().includes(t.toLowerCase())),d=t=>{a.includes(t.detail.value)||(u(t.detail.value),a.push(t.detail.value))};function u(t){const e=document.createElement("forge-chip");e.setAttribute("slot","member"),e.type="field",e.dense=!0,e.value=t,e.textContent=t,e.addEventListener("forge-chip-delete",()=>{e.remove(),a.splice(a.indexOf(t),1)}),l.value?.appendChild(e)}return m`
      <forge-autocomplete .filter=${s} mode="stateless" @forge-autocomplete-select=${d}>
        <forge-chip-field ${S(l)} popover-icon show-clear>
          <label slot="label" for="tag-input">Tags</label>
          <input type="text" id="tag-input" />
        </forge-chip-field>
      </forge-autocomplete>
    `}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{}",...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const chipFieldRef = createRef<IChipFieldComponent>();
    const selectedAutocompleteValues: string[] = [];
    const filter = (filterText: string) => {
      const remainingStates = US_STATES.filter(({
        value
      }) => !selectedAutocompleteValues.includes(value));
      return remainingStates.filter(({
        label
      }) => label.toLowerCase().includes(filterText.toLowerCase()));
    };
    const onSelect = (evt: CustomEvent<IAutocompleteSelectEventData>) => {
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
}`,...r.parameters?.docs?.source}}};const $=["Demo","WithAutocomplete"],X=Object.freeze(Object.defineProperty({__proto__:null,Demo:n,WithAutocomplete:r,__namedExportsOrder:$,default:O},Symbol.toStringTag,{value:"Module"}));export{X as C,n as D,r as W};
