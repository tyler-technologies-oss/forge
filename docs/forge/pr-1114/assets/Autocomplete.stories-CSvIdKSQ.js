import{A as f,b as m}from"./iframe-DUO6sR7Q.js";import{s as b,g as v}from"./utils-JlLG_A5T.js";import{n as h,e as C}from"./ref-BebHwDhL.js";import{s as g}from"./decorators-0SJ1E2wu.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-CGdUJIvk.js";import"./label-DQRW0Ixj.js";import"./index-DTwfV0k0.js";import"./button-CGLAKewe.js";import"./focus-indicator-CkQ_SLjY.js";import"./state-layer-D0PE-_Ks.js";import"./button-toggle-group-SwNncGNw.js";import"./checkbox-_NlP9yGR.js";import"./icon-button-DYBsyh42.js";import"./tyler-icons-iDvhFOMC.js";import"./switch-ye0kRd8e.js";import"./base-field-CV5FpTVG.js";import"./linear-progress-DJCUZyG6.js";import"./list-DLoQA8Md.js";import"./popover-BblH4OjR.js";import"./overlay-Btn1tEyh.js";import"./skeleton-Ctt20BWR.js";import"./text-field-Cg3eNHke.js";import"./avatar-BhQYIcJ_.js";const x=e=>e??f,{action:u}=__STORYBOOK_MODULE_ACTIONS__,d="forge-autocomplete",O=u("filter callback executed"),y=u("forge-autocomplete-change"),$=u("forge-autocomplete-select"),A=u("forge-autocomplete-scrolled-bottom"),p=[{label:"Alabama",value:"AL"},{label:"Alaska",value:"AK"},{label:"Arizona",value:"AZ"},{label:"Arkansas",value:"AR"},{label:"California",value:"CA"},{label:"Colorado",value:"CO"},{label:"Connecticut",value:"CT"},{label:"Delaware",value:"DE"},{label:"Florida",value:"FL"},{label:"Georgia",value:"GA"},{label:"Hawaii",value:"HI"},{label:"Idaho",value:"ID"},{label:"Illinois",value:"IL"},{label:"Indiana",value:"IN"},{label:"Iowa",value:"IA"},{label:"Kansas",value:"KS"},{label:"Kentucky",value:"KY"},{label:"Louisiana",value:"LA"},{label:"Maine",value:"ME"},{label:"Maryland",value:"MD"},{label:"Massachusetts",value:"MA"},{label:"Michigan",value:"MI"},{label:"Minnesota",value:"MN"},{label:"Mississippi",value:"MS"},{label:"Missouri",value:"MO"},{label:"Montana",value:"MT"},{label:"Nebraska",value:"NE"},{label:"Nevada",value:"NV"},{label:"New Hampshire",value:"H"},{label:"New Jersey",value:"J"},{label:"New Mexico",value:"NM"},{label:"New York",value:"NY"},{label:"North Carolina",value:"NC"},{label:"North Dakota",value:"ND"},{label:"Ohio",value:"OH"},{label:"Oklahoma",value:"OK"},{label:"Oregon",value:"OR"},{label:"Pennsylvania",value:"PA"},{label:"Rhode Island",value:"RI"},{label:"South Carolina",value:"C"},{label:"South Dakota",value:"SD"},{label:"Tennessee",value:"TN"},{label:"Texas",value:"TX"},{label:"Utah",value:"UT"},{label:"Vermont",value:"VT"},{label:"Virginia",value:"VA"},{label:"Washington",value:"WA"},{label:"West Virginia",value:"WV"},{label:"Wisconsin",value:"WI"},{label:"Wyoming",value:"WY"}],S={title:"Components/Autocomplete",decorators:[g(`
      forge-autocomplete {
        width: 256px;
      }
    `)],render:e=>{const o=(l,t)=>(O(l,t),p.filter(a=>a.label.toLowerCase().includes(l.toLowerCase())));return m`
      <forge-autocomplete
        .debounce=${e.debounce}
        .filterOnFocus=${e.filterOnFocus}
        .filterFocusFirst=${e.filterFocusFirst}
        .mode=${e.mode}
        .multiple=${e.multiple}
        .observeScroll=${e.observeScroll}
        .observeScrollThreshold=${e.observeScrollThreshold}
        .optionLimit=${e.optionLimit}
        .filter=${o}
        .allowUnmatched=${e.allowUnmatched}
        .popupClasses=${e.popupClasses}
        .syncPopupWidth=${e.syncPopupWidth}
        .constrainPopupWidth=${e.constrainPopupWidth}
        .wrapOptionText=${e.wrapOptionText}
        .selectFirstOptionOnBlur=${e.selectFirstOptionOnBlur}
        empty-message=${x(e.emptyMessage)}
        @forge-autocomplete-change=${y}
        @forge-autocomplete-select=${$}
        @forge-autocomplete-scrolled-bottom=${A}>
        <forge-text-field show-clear popover-icon>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>
        </forge-text-field>
      </forge-autocomplete>
    `},component:d,argTypes:{...v({tagName:d,exclude:["value","popupTarget","filterText","optionBuilder","filter","selectedTextBuilder","popupElement","beforeValueChange","isInitialized","popupHeaderBuilder","popupFooterBuilder","matchKey","open","emptyStateBuilder"],controls:{mode:{control:"select",options:["default","stateless"]}}})},args:{debounce:500,filterOnFocus:!0,filterFocusFirst:!0,selectFirstOptionOnBlur:!1,mode:"default",optionLimit:10,observeScroll:!0,allowUnmatched:!1,multiple:!1,syncPopupWidth:!1,observeScrollThreshold:100,constrainPopupWidth:!0,wrapOptionText:!1}},n={},s={...b,render:()=>m`
      <forge-autocomplete .filter=${l=>p.filter(t=>t.label.toLowerCase().includes(l.toLowerCase()))} .optionBuilder=${l=>{const t=document.createElement("div");t.style.display="flex",t.style.gap="16px",t.style.alignItems="center";const a=document.createElement("forge-avatar");a.text=l.value.split("").join(" "),a.letterCount=2,t.appendChild(a);const r=document.createElement("span");return r.textContent=l.label,t.appendChild(r),t}}>
        <forge-text-field show-clear popover-icon>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>
        </forge-text-field>
      </forge-autocomplete>
    `},i={...b,render:()=>{const e=C();let o=[];const l=r=>(o=p.filter(c=>c.label.toLowerCase().includes(r.toLowerCase())).slice(0,5),o),t=()=>{const r=o.length,c=p.slice(r,r+5);o=[...o,...c],e.value?.appendOptions(c)},a=()=>{o=[]};return m`
      <forge-autocomplete
        ${h(e)}
        observe-scroll
        .filter=${l}
        @forge-autocomplete-scrolled-bottom=${t}
        .beforeCloseCallback=${a}>
        <forge-text-field popover-icon>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>
        </forge-text-field>
      </forge-autocomplete>
    `}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{}",...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const filterCb: AutocompleteFilterCallback = filterText => states.filter(state => state.label.toLowerCase().includes(filterText.toLowerCase()));
    const optionBuilder: AutocompleteOptionBuilder = option => {
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.gap = '16px';
      container.style.alignItems = 'center';
      const avatar = document.createElement('forge-avatar');
      avatar.text = option.value.split('').join(' ');
      avatar.letterCount = 2;
      container.appendChild(avatar);
      const text = document.createElement('span');
      text.textContent = option.label;
      container.appendChild(text);
      return container;
    };
    return html\`
      <forge-autocomplete .filter=\${filterCb} .optionBuilder=\${optionBuilder}>
        <forge-text-field show-clear popover-icon>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>
        </forge-text-field>
      </forge-autocomplete>
    \`;
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const autocompleteRef = createRef<IAutocompleteComponent>();
    let currentOptions: IOption[] = [];
    const filterCb: AutocompleteFilterCallback = filterText => {
      currentOptions = states.filter(state => state.label.toLowerCase().includes(filterText.toLowerCase())).slice(0, 5);
      return currentOptions;
    };
    const onScrolledBottom = (): void => {
      const currentLength = currentOptions.length;
      const nextOptions = states.slice(currentLength, currentLength + 5);
      currentOptions = [...currentOptions, ...nextOptions];
      autocompleteRef.value?.appendOptions(nextOptions);
    };
    const beforeClose = (): void => {
      // Reset the current options when the autocomplete is closed for demo purposes
      currentOptions = [];
    };
    return html\`
      <forge-autocomplete
        \${ref(autocompleteRef)}
        observe-scroll
        .filter=\${filterCb}
        @forge-autocomplete-scrolled-bottom=\${onScrolledBottom}
        .beforeCloseCallback=\${beforeClose}>
        <forge-text-field popover-icon>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>
        </forge-text-field>
      </forge-autocomplete>
    \`;
  }
}`,...i.parameters?.docs?.source}}};const w=["Demo","CustomOptions","InfiniteScroll"],Z=Object.freeze(Object.defineProperty({__proto__:null,CustomOptions:s,Demo:n,InfiniteScroll:i,__namedExportsOrder:w,default:S},Symbol.toStringTag,{value:"Module"}));export{Z as A,s as C,n as D,i as I};
