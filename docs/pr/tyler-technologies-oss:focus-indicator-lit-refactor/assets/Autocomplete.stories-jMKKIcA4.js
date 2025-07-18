import{x as m}from"./iframe-B36M3axR.js";import{g as w,s as $}from"./utils-JcRLWv5w.js";import{n as S,e as T}from"./ref-DJEQr53X.js";import{s as L}from"./decorators-DpQOWl7X.js";import"./service-adapter-BykFeYYZ.js";import"./autocomplete-D34Of8II.js";import"./label-1JbfAEsw.js";import"./index-CiLSBptl.js";import"./button-C9kCF3a-.js";import"./focus-indicator-u5r21UtO.js";import"./state-layer-BRTtEqto.js";import"./button-toggle-group-UVvL_rAk.js";import"./checkbox-DpCbezAn.js";import"./icon-button-CofNeE0G.js";import"./icon-eJOvSyyv.js";import"./switch-jdpZ6okj.js";import"./base-field-DkSU8scB.js";import"./linear-progress-BTaob5x2.js";import"./list-CIEcjlwx.js";import"./popover-BWs500m1.js";import"./overlay-DWLd4_Vp.js";import"./skeleton-fsmWNbya.js";import"./text-field-mNbxifo0.js";import"./avatar-BFafonG5.js";const{action:p}=__STORYBOOK_MODULE_ACTIONS__,b="forge-autocomplete",I=p("filter callback executed"),M=p("forge-autocomplete-change"),N=p("forge-autocomplete-select"),B=p("forge-autocomplete-scrolled-bottom"),u=[{label:"Alabama",value:"AL"},{label:"Alaska",value:"AK"},{label:"Arizona",value:"AZ"},{label:"Arkansas",value:"AR"},{label:"California",value:"CA"},{label:"Colorado",value:"CO"},{label:"Connecticut",value:"CT"},{label:"Delaware",value:"DE"},{label:"Florida",value:"FL"},{label:"Georgia",value:"GA"},{label:"Hawaii",value:"HI"},{label:"Idaho",value:"ID"},{label:"Illinois",value:"IL"},{label:"Indiana",value:"IN"},{label:"Iowa",value:"IA"},{label:"Kansas",value:"KS"},{label:"Kentucky",value:"KY"},{label:"Louisiana",value:"LA"},{label:"Maine",value:"ME"},{label:"Maryland",value:"MD"},{label:"Massachusetts",value:"MA"},{label:"Michigan",value:"MI"},{label:"Minnesota",value:"MN"},{label:"Mississippi",value:"MS"},{label:"Missouri",value:"MO"},{label:"Montana",value:"MT"},{label:"Nebraska",value:"NE"},{label:"Nevada",value:"NV"},{label:"New Hampshire",value:"H"},{label:"New Jersey",value:"J"},{label:"New Mexico",value:"NM"},{label:"New York",value:"NY"},{label:"North Carolina",value:"NC"},{label:"North Dakota",value:"ND"},{label:"Ohio",value:"OH"},{label:"Oklahoma",value:"OK"},{label:"Oregon",value:"OR"},{label:"Pennsylvania",value:"PA"},{label:"Rhode Island",value:"RI"},{label:"South Carolina",value:"C"},{label:"South Dakota",value:"SD"},{label:"Tennessee",value:"TN"},{label:"Texas",value:"TX"},{label:"Utah",value:"UT"},{label:"Vermont",value:"VT"},{label:"Virginia",value:"VA"},{label:"Washington",value:"WA"},{label:"West Virginia",value:"WV"},{label:"Wisconsin",value:"WI"},{label:"Wyoming",value:"WY"}],k={title:"Components/Autocomplete",decorators:[L(`
      forge-autocomplete {
        width: 256px;
      }
    `)],render:e=>{const o=(l,t)=>(I(l,t),u.filter(a=>a.label.toLowerCase().includes(l.toLowerCase())));return m`
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
        @forge-autocomplete-change=${M}
        @forge-autocomplete-select=${N}
        @forge-autocomplete-scrolled-bottom=${B}>
        <forge-text-field show-clear popover-icon>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>
        </forge-text-field>
      </forge-autocomplete>
    `},component:b,argTypes:{...w({tagName:b,exclude:["value","popupTarget","filterText","optionBuilder","filter","selectedTextBuilder","popupElement","beforeValueChange","isInitialized","popupHeaderBuilder","popupFooterBuilder","matchKey","open"],controls:{mode:{control:"select",options:["default","stateless"]}}})},args:{debounce:500,filterOnFocus:!0,filterFocusFirst:!0,mode:"default",optionLimit:10,observeScroll:!0,allowUnmatched:!1,multiple:!1,syncPopupWidth:!1,observeScrollThreshold:100,constrainPopupWidth:!0,wrapOptionText:!1}},n={},s={...$,render:()=>m`
      <forge-autocomplete .filter=${l=>u.filter(t=>t.label.toLowerCase().includes(l.toLowerCase()))} .optionBuilder=${l=>{const t=document.createElement("div");t.style.display="flex",t.style.gap="16px",t.style.alignItems="center";const a=document.createElement("forge-avatar");a.text=l.value.split("").join(" "),a.letterCount=2,t.appendChild(a);const r=document.createElement("span");return r.textContent=l.label,t.appendChild(r),t}}>
        <forge-text-field show-clear popover-icon>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>
        </forge-text-field>
      </forge-autocomplete>
    `},i={...$,render:()=>{const e=T();let o=[];const l=r=>(o=u.filter(c=>c.label.toLowerCase().includes(r.toLowerCase())).slice(0,5),o),t=()=>{var d;const r=o.length,c=u.slice(r,r+5);o=[...o,...c],(d=e.value)==null||d.appendOptions(c)},a=()=>{o=[]};return m`
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
}`,...(x=(g=s.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var O,y,A;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(A=(y=i.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};const F=["Demo","CustomOptions","InfiniteScroll"],re=Object.freeze(Object.defineProperty({__proto__:null,CustomOptions:s,Demo:n,InfiniteScroll:i,__namedExportsOrder:F,default:k},Symbol.toStringTag,{value:"Module"}));export{re as A,s as C,n as D,i as I};
