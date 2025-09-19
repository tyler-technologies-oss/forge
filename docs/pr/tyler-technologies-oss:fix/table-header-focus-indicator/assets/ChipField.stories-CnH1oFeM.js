import{E as S,x as A}from"./iframe-B40K0EzB.js";import{o as x}from"./style-map-emMDAnkx.js";import{g as M,s as T,G as w,a as O}from"./utils-UeWn3HvG.js";import{n as $,e as y}from"./ref-D3OBkzRt.js";import"./feature-detection-uS6p5jc8.js";import"./autocomplete-JvVClWpV.js";import"./label-v2fBLVwj.js";import"./index-CiLSBptl.js";import"./button-DEhPRUdY.js";import"./focus-indicator-BeibAi2h.js";import"./state-layer-C7sW6v-0.js";import"./button-toggle-group-DWRuBNed.js";import"./checkbox-B1PtNwCH.js";import"./icon-button-C-UNXlAt.js";import"./icon-B8CdcxqJ.js";import"./switch-c2I0wwHc.js";import"./base-field-7hlMWjmp.js";import"./linear-progress-2PahUgVv.js";import"./list-CkPu5vu3.js";import"./popover-CjB4Fwlr.js";import"./overlay-CewVvJzX.js";import"./skeleton-C4EH8VF8.js";import"./text-field-CrQVM6fF.js";const{action:C}=__STORYBOOK_MODULE_ACTIONS__,c="forge-chip-field",E=[{label:"Alabama",value:"AL"},{label:"Alaska",value:"AK"},{label:"Arizona",value:"AZ"},{label:"Arkansas",value:"AR"},{label:"California",value:"CA"},{label:"Colorado",value:"CO"},{label:"Connecticut",value:"CT"},{label:"Delaware",value:"DE"},{label:"Florida",value:"FL"},{label:"Georgia",value:"GA"},{label:"Hawaii",value:"HI"},{label:"Idaho",value:"ID"},{label:"Illinois",value:"IL"},{label:"Indiana",value:"IN"},{label:"Iowa",value:"IA"},{label:"Kansas",value:"KS"},{label:"Kentucky",value:"KY"},{label:"Louisiana",value:"LA"},{label:"Maine",value:"ME"},{label:"Maryland",value:"MD"},{label:"Massachusetts",value:"MA"},{label:"Michigan",value:"MI"},{label:"Minnesota",value:"MN"},{label:"Mississippi",value:"MS"},{label:"Missouri",value:"MO"},{label:"Montana",value:"MT"},{label:"Nebraska",value:"NE"},{label:"Nevada",value:"NV"},{label:"New Hampshire",value:"H"},{label:"New Jersey",value:"J"},{label:"New Mexico",value:"NM"},{label:"New York",value:"NY"},{label:"North Carolina",value:"NC"},{label:"North Dakota",value:"ND"},{label:"Ohio",value:"OH"},{label:"Oklahoma",value:"OK"},{label:"Oregon",value:"OR"},{label:"Pennsylvania",value:"PA"},{label:"Rhode Island",value:"RI"},{label:"South Carolina",value:"C"},{label:"South Dakota",value:"SD"},{label:"Tennessee",value:"TN"},{label:"Texas",value:"TX"},{label:"Utah",value:"UT"},{label:"Vermont",value:"VT"},{label:"Virginia",value:"VA"},{label:"Washington",value:"WA"},{label:"West Virginia",value:"WV"},{label:"Wisconsin",value:"WI"},{label:"Wyoming",value:"WY"}],I=C("forge-chip-field-member-added"),N=C("forge-chip-field-member-removed"),L={title:"Components/Chip Field",render:l=>{const o=O(l),s=o?x(o):S,d=e=>{if(e.target){const a=e.target,p=e.detail,i=document.createElement("forge-chip");i.setAttribute("slot","member"),i.setAttribute("type","field"),i.setAttribute("dense",""),i.addEventListener("forge-chip-delete",t),i.value=p,i.textContent=p,a.appendChild(i)}I(e)},u=e=>{e.detail.remove(),N(e)},t=e=>{e.target&&e.target.remove()};return A`
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
    `},component:c,subcomponents:{Chip:"forge-chip"},argTypes:{...M({tagName:c,exclude:["value","popoverTargetElement","supportTextInset"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},shape:{control:"select",options:["default","rounded","square"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},theme:{control:"select",options:["default",...w]}}})},args:{addOnBlur:!1,floatLabel:!1,labelPosition:"inset",labelAlignment:"default",invalid:!1,required:!1,optional:!1,disabled:!1,density:"default",dense:!1,popoverIcon:!1,popoverExpanded:!1}},n={},r={...T,render:()=>{const l=y(),o=[],s=t=>E.filter(({value:a})=>!o.includes(a)).filter(({label:a})=>a.toLowerCase().includes(t.toLowerCase())),d=t=>{o.includes(t.detail.value)||(u(t.detail.value),o.push(t.detail.value))};function u(t){var a;const e=document.createElement("forge-chip");e.setAttribute("slot","member"),e.type="field",e.dense=!0,e.value=t,e.textContent=t,e.addEventListener("forge-chip-delete",()=>{e.remove(),o.splice(o.indexOf(t),1)}),(a=l.value)==null||a.appendChild(e)}return A`
      <forge-autocomplete .filter=${s} mode="stateless" @forge-autocomplete-select=${d}>
        <forge-chip-field ${$(l)} popover-icon show-clear>
          <label slot="label" for="tag-input">Tags</label>
          <input type="text" id="tag-input" />
        </forge-chip-field>
      </forge-autocomplete>
    `}};var m,b,v;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(v=(b=n.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var f,h,g;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(g=(h=r.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};const V=["Demo","WithAutocomplete"],ae=Object.freeze(Object.defineProperty({__proto__:null,Demo:n,WithAutocomplete:r,__namedExportsOrder:V,default:L},Symbol.toStringTag,{value:"Module"}));export{ae as C,n as D,r as W};
