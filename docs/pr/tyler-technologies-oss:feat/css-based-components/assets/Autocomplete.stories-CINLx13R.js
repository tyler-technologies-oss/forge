import"./lit-element-Dk2-kgKT.js";import{k as m}from"./lit-html-DZH-Jm0H.js";import{a as u}from"./chunk-454WOBUV-CM0pFb8Z.js";import{g as w,s as A}from"./utils-CmNCmodr.js";import{K as S,i as T}from"./ref-9TtedaQt.js";import"./constants-DjE6emXm.js";import"./autocomplete-BElBkNft.js";import"./text-field-By0mC--H.js";import"./base-field-CfB2Uzg4.js";import"./focus-indicator-BpCDYqsq.js";import"./index-Dh0vMUMR.js";import"./label-kORtmqyo.js";import"./button-DJU3J9XV.js";import"./state-layer-DkOkOFSZ.js";import"./button-toggle-group-BMiaMm6c.js";import"./checkbox-7ZtPo8kA.js";import"./icon-button-DSVS47IC.js";import"./icon-DHpZ4R73.js";import"./switch-BDI72jLc.js";import"./linear-progress-BjLGzdmZ.js";import"./list-tzlsEZgh.js";import"./popover-DMO_rraq.js";import"./overlay-oQigVWsx.js";import"./skeleton-AD7XJ-QC.js";import"./avatar-9nkaewEO.js";const b="forge-autocomplete",L=u("filter callback executed"),I=u("forge-autocomplete-change"),M=u("forge-autocomplete-select"),N=u("forge-autocomplete-scrolled-bottom"),p=[{label:"Alabama",value:"AL"},{label:"Alaska",value:"AK"},{label:"Arizona",value:"AZ"},{label:"Arkansas",value:"AR"},{label:"California",value:"CA"},{label:"Colorado",value:"CO"},{label:"Connecticut",value:"CT"},{label:"Delaware",value:"DE"},{label:"Florida",value:"FL"},{label:"Georgia",value:"GA"},{label:"Hawaii",value:"HI"},{label:"Idaho",value:"ID"},{label:"Illinois",value:"IL"},{label:"Indiana",value:"IN"},{label:"Iowa",value:"IA"},{label:"Kansas",value:"KS"},{label:"Kentucky",value:"KY"},{label:"Louisiana",value:"LA"},{label:"Maine",value:"ME"},{label:"Maryland",value:"MD"},{label:"Massachusetts",value:"MA"},{label:"Michigan",value:"MI"},{label:"Minnesota",value:"MN"},{label:"Mississippi",value:"MS"},{label:"Missouri",value:"MO"},{label:"Montana",value:"MT"},{label:"Nebraska",value:"NE"},{label:"Nevada",value:"NV"},{label:"New Hampshire",value:"H"},{label:"New Jersey",value:"J"},{label:"New Mexico",value:"NM"},{label:"New York",value:"NY"},{label:"North Carolina",value:"NC"},{label:"North Dakota",value:"ND"},{label:"Ohio",value:"OH"},{label:"Oklahoma",value:"OK"},{label:"Oregon",value:"OR"},{label:"Pennsylvania",value:"PA"},{label:"Rhode Island",value:"RI"},{label:"South Carolina",value:"C"},{label:"South Dakota",value:"SD"},{label:"Tennessee",value:"TN"},{label:"Texas",value:"TX"},{label:"Utah",value:"UT"},{label:"Vermont",value:"VT"},{label:"Virginia",value:"VA"},{label:"Washington",value:"WA"},{label:"West Virginia",value:"WV"},{label:"Wisconsin",value:"WI"},{label:"Wyoming",value:"WY"}],k={title:"Components/Autocomplete",render:e=>{const o=(l,t)=>(L(l,t),p.filter(a=>a.label.toLowerCase().includes(l.toLowerCase())));return m`
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
        @forge-autocomplete-change=${I}
        @forge-autocomplete-select=${M}
        @forge-autocomplete-scrolled-bottom=${N}>
        <forge-text-field show-clear popover-icon>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>
        </forge-text-field>
      </forge-autocomplete>
    `},component:b,argTypes:{...w({tagName:b,exclude:["value","popupTarget","filterText","optionBuilder","filter","selectedTextBuilder","popupElement","beforeValueChange","isInitialized","popupHeaderBuilder","popupFooterBuilder","matchKey","open"],controls:{mode:{control:"select",options:["default","stateless"]}}})},args:{debounce:500,filterOnFocus:!0,filterFocusFirst:!0,mode:"default",optionLimit:10,observeScroll:!0,allowUnmatched:!1,multiple:!1,popupClasses:"",syncPopupWidth:!1,observeScrollThreshold:100,constrainPopupWidth:!0,wrapOptionText:!1}},n={},s={...A,render:()=>m`
      <forge-autocomplete .filter=${l=>p.filter(t=>t.label.toLowerCase().includes(l.toLowerCase()))} .optionBuilder=${l=>{const t=document.createElement("div");t.style.display="flex",t.style.gap="16px",t.style.alignItems="center";const a=document.createElement("forge-avatar");a.text=l.value.split("").join(" "),a.letterCount=2,t.appendChild(a);const r=document.createElement("span");return r.textContent=l.label,t.appendChild(r),t}}>
        <forge-text-field show-clear popover-icon>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>
        </forge-text-field>
      </forge-autocomplete>
    `},i={...A,render:()=>{const e=T();let o=[];const l=r=>(o=p.filter(c=>c.label.toLowerCase().includes(r.toLowerCase())).slice(0,5),o),t=()=>{var d;const r=o.length,c=p.slice(r,r+5);o=[...o,...c],(d=e.value)==null||d.appendOptions(c)},a=()=>{o=[]};return m`
      <forge-autocomplete
        ${S(e)}
        observe-scroll
        .filter=${l}
        @forge-autocomplete-scrolled-bottom=${t}
        .beforeCloseCallback=${a}>
        <forge-text-field popover-icon>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>
        </forge-text-field>
      </forge-autocomplete>
    `}};var f,v,h;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:"{}",...(h=(v=n.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var C,g,x;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(x=(g=s.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var O,y,$;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...($=(y=i.parameters)==null?void 0:y.docs)==null?void 0:$.source}}};const B=["Demo","CustomOptions","InfiniteScroll"],re=Object.freeze(Object.defineProperty({__proto__:null,CustomOptions:s,Demo:n,InfiniteScroll:i,__namedExportsOrder:B,default:k},Symbol.toStringTag,{value:"Module"}));export{re as A,s as C,n as D,i as I};
