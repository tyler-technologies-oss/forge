import{x as m}from"./iframe-TK8e1Aaz.js";import{g as f,s as b}from"./utils-f-9lfKsg.js";import{n as v,e as h}from"./ref-Ca_X5JZn.js";import{s as C}from"./decorators-CqLquvfx.js";import"./service-adapter-CffG5Lhq.js";import"./autocomplete-4XhemIT9.js";import"./label-BXAMiPO0.js";import"./index-DTwfV0k0.js";import"./button-D-_pvVZT.js";import"./focus-indicator-r6jPcSl0.js";import"./state-layer-BEEsPoZf.js";import"./button-toggle-group-CG-Wgbj8.js";import"./checkbox-eJQKgkD_.js";import"./icon-button-C7XbQQVi.js";import"./icon-Uwxy940_.js";import"./switch-DiIwmj43.js";import"./base-field-dZZd44V_.js";import"./linear-progress-r0Hzg69v.js";import"./list-Ch6gYAwG.js";import"./popover-DE3KaoDh.js";import"./overlay-DbqVLn-W.js";import"./skeleton-BSiuL_ME.js";import"./text-field-PgyPT3Gh.js";import"./avatar-D_Xb1ibY.js";const{action:p}=__STORYBOOK_MODULE_ACTIONS__,d="forge-autocomplete",g=p("filter callback executed"),x=p("forge-autocomplete-change"),O=p("forge-autocomplete-select"),y=p("forge-autocomplete-scrolled-bottom"),u=[{label:"Alabama",value:"AL"},{label:"Alaska",value:"AK"},{label:"Arizona",value:"AZ"},{label:"Arkansas",value:"AR"},{label:"California",value:"CA"},{label:"Colorado",value:"CO"},{label:"Connecticut",value:"CT"},{label:"Delaware",value:"DE"},{label:"Florida",value:"FL"},{label:"Georgia",value:"GA"},{label:"Hawaii",value:"HI"},{label:"Idaho",value:"ID"},{label:"Illinois",value:"IL"},{label:"Indiana",value:"IN"},{label:"Iowa",value:"IA"},{label:"Kansas",value:"KS"},{label:"Kentucky",value:"KY"},{label:"Louisiana",value:"LA"},{label:"Maine",value:"ME"},{label:"Maryland",value:"MD"},{label:"Massachusetts",value:"MA"},{label:"Michigan",value:"MI"},{label:"Minnesota",value:"MN"},{label:"Mississippi",value:"MS"},{label:"Missouri",value:"MO"},{label:"Montana",value:"MT"},{label:"Nebraska",value:"NE"},{label:"Nevada",value:"NV"},{label:"New Hampshire",value:"H"},{label:"New Jersey",value:"J"},{label:"New Mexico",value:"NM"},{label:"New York",value:"NY"},{label:"North Carolina",value:"NC"},{label:"North Dakota",value:"ND"},{label:"Ohio",value:"OH"},{label:"Oklahoma",value:"OK"},{label:"Oregon",value:"OR"},{label:"Pennsylvania",value:"PA"},{label:"Rhode Island",value:"RI"},{label:"South Carolina",value:"C"},{label:"South Dakota",value:"SD"},{label:"Tennessee",value:"TN"},{label:"Texas",value:"TX"},{label:"Utah",value:"UT"},{label:"Vermont",value:"VT"},{label:"Virginia",value:"VA"},{label:"Washington",value:"WA"},{label:"West Virginia",value:"WV"},{label:"Wisconsin",value:"WI"},{label:"Wyoming",value:"WY"}],$={title:"Components/Autocomplete",decorators:[C(`
      forge-autocomplete {
        width: 256px;
      }
    `)],render:e=>{const o=(l,t)=>(g(l,t),u.filter(a=>a.label.toLowerCase().includes(l.toLowerCase())));return m`
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
        @forge-autocomplete-change=${x}
        @forge-autocomplete-select=${O}
        @forge-autocomplete-scrolled-bottom=${y}>
        <forge-text-field show-clear popover-icon>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>
        </forge-text-field>
      </forge-autocomplete>
    `},component:d,argTypes:{...f({tagName:d,exclude:["value","popupTarget","filterText","optionBuilder","filter","selectedTextBuilder","popupElement","beforeValueChange","isInitialized","popupHeaderBuilder","popupFooterBuilder","matchKey","open"],controls:{mode:{control:"select",options:["default","stateless"]}}})},args:{debounce:500,filterOnFocus:!0,filterFocusFirst:!0,selectFirstOptionOnBlur:!1,mode:"default",optionLimit:10,observeScroll:!0,allowUnmatched:!1,multiple:!1,syncPopupWidth:!1,observeScrollThreshold:100,constrainPopupWidth:!0,wrapOptionText:!1}},n={},s={...b,render:()=>m`
      <forge-autocomplete .filter=${l=>u.filter(t=>t.label.toLowerCase().includes(l.toLowerCase()))} .optionBuilder=${l=>{const t=document.createElement("div");t.style.display="flex",t.style.gap="16px",t.style.alignItems="center";const a=document.createElement("forge-avatar");a.text=l.value.split("").join(" "),a.letterCount=2,t.appendChild(a);const r=document.createElement("span");return r.textContent=l.label,t.appendChild(r),t}}>
        <forge-text-field show-clear popover-icon>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>
        </forge-text-field>
      </forge-autocomplete>
    `},i={...b,render:()=>{const e=h();let o=[];const l=r=>(o=u.filter(c=>c.label.toLowerCase().includes(r.toLowerCase())).slice(0,5),o),t=()=>{const r=o.length,c=u.slice(r,r+5);o=[...o,...c],e.value?.appendOptions(c)},a=()=>{o=[]};return m`
      <forge-autocomplete
        ${v(e)}
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
    const filterCb: AutocompleteFilterCallback = filterText => {
      return states.filter(state => state.label.toLowerCase().includes(filterText.toLowerCase()));
    };
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
    const onScrolledBottom = () => {
      const currentLength = currentOptions.length;
      const nextOptions = states.slice(currentLength, currentLength + 5);
      currentOptions = [...currentOptions, ...nextOptions];
      autocompleteRef.value?.appendOptions(nextOptions);
    };
    const beforeClose = () => {
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
}`,...i.parameters?.docs?.source}}};const A=["Demo","CustomOptions","InfiniteScroll"],J=Object.freeze(Object.defineProperty({__proto__:null,CustomOptions:s,Demo:n,InfiniteScroll:i,__namedExportsOrder:A,default:$},Symbol.toStringTag,{value:"Module"}));export{J as A,s as C,n as D,i as I};
