import{x as m}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{g as p}from"./utils-Cceq4NFH.js";import"./constants-D32Jr2uy.js";import"./autocomplete-DH9KzLad.js";import"./text-field-Dw10Z76S.js";import"./base-field-0V9RDNSH.js";import"./focus-indicator-DCOk5mvy.js";import"./index-Dh0vMUMR.js";import"./label-CcpeGv-c.js";import"./button-BF9wbu_o.js";import"./state-layer-BRvIemvG.js";import"./button-toggle-group-b68KB2vb.js";import"./checkbox-Chjo1vae.js";import"./icon-button-BIREJzI3.js";import"./icon-CRQudG-b.js";import"./switch-DWALD2Z-.js";import"./linear-progress-DDuiLuf_.js";import"./list-dUPbNzHI.js";import"./popover-fL2nRo2T.js";import"./overlay-DiKhgH_u.js";import"./skeleton-BaEsbVV3.js";import"./chip-field-CbM2Vb1n.js";const r="forge-autocomplete",u={title:"Components/Autocomplete",render:e=>{const n=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],s=(c,f)=>n.filter(t=>t.toLowerCase().includes(c.toLowerCase())).map(t=>({value:t,label:t}));return m`
      <forge-autocomplete
        .debounce=${e.debounce}
        .filterOnFocus=${e.filterOnFocus}
        .filterFocusFirst=${e.filterFocusFirst}
        .mode=${e.mode}
        .multiple=${e.multiple}
        .observeScroll=${e.observeScroll}
        .oberveScrollThreshold=${e.observeScrollThreshold}
        .optionLimit=${e.optionLimit}
        .filter=${s}>
        <forge-text-field>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>

          <!-- You can optionally provide a clear button with a data-forge-autocomplete-clear attribute that will be detected automatically. -->
          <forge-icon-button data-forge-autocomplete-clear slot="trailing" dense density="3" aria-label="test">
            <forge-icon name="close"></forge-icon>
          </forge-icon-button>

          <!-- The existence of the data-forge-dropdown-icon attribute controls the open state rotation automatically. -->
          <forge-icon slot="trailing" name="arrow_drop_down" data-forge-dropdown-icon></forge-icon>
        </forge-text-field>
      </forge-autocomplete>
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...p({tagName:r,include:["allowUnmatched","debounce","filterOnFocus","filterFocusFirst","mode","multiple","observeScroll","oberveScrollThreshold","optionLimit"],controls:{mode:{control:"select",options:["default","stateless"]},debounce:{control:"number"},observeScrollThreshold:{control:"number"}}})},args:{debounce:500,filterOnFocus:!0,filterFocusFirst:!0,mode:"default",optionLimit:10,observeScroll:!0,allowUnmatched:!1,multiple:!1}},o={};var a,i,l;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(l=(i=o.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const d=["Demo"],V=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:d,default:u},Symbol.toStringTag,{value:"Module"}));export{V as A,o as D};
