import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-C-z8vi0w.js";import{_ as i,m as a,s as o}from"./utils-BktKkMbo.js";import{n as s,t as c}from"./decorators-Eg-GwljX.js";import{n as l}from"./avatar-BAP6hUjV.js";import{t as u}from"./autocomplete-CC-XvYZW.js";import{r as d,t as f}from"./if-defined-B1ve8lTA.js";import{i as p,n as m,t as h}from"./ref-tIG-hx5K.js";var g=t({CustomOptions:()=>E,Demo:()=>T,InfiniteScroll:()=>D,__namedExportsOrder:()=>O,default:()=>w}),_,v,y,b,x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{r(),a(),h(),c(),f(),u(),l(),{action:_}=__STORYBOOK_MODULE_ACTIONS__,v=`forge-autocomplete`,y=_(`filter callback executed`),b=_(`forge-autocomplete-change`),x=_(`forge-autocomplete-select`),S=_(`forge-autocomplete-scrolled-bottom`),C=[{label:`Alabama`,value:`AL`},{label:`Alaska`,value:`AK`},{label:`Arizona`,value:`AZ`},{label:`Arkansas`,value:`AR`},{label:`California`,value:`CA`},{label:`Colorado`,value:`CO`},{label:`Connecticut`,value:`CT`},{label:`Delaware`,value:`DE`},{label:`Florida`,value:`FL`},{label:`Georgia`,value:`GA`},{label:`Hawaii`,value:`HI`},{label:`Idaho`,value:`ID`},{label:`Illinois`,value:`IL`},{label:`Indiana`,value:`IN`},{label:`Iowa`,value:`IA`},{label:`Kansas`,value:`KS`},{label:`Kentucky`,value:`KY`},{label:`Louisiana`,value:`LA`},{label:`Maine`,value:`ME`},{label:`Maryland`,value:`MD`},{label:`Massachusetts`,value:`MA`},{label:`Michigan`,value:`MI`},{label:`Minnesota`,value:`MN`},{label:`Mississippi`,value:`MS`},{label:`Missouri`,value:`MO`},{label:`Montana`,value:`MT`},{label:`Nebraska`,value:`NE`},{label:`Nevada`,value:`NV`},{label:`New Hampshire`,value:`H`},{label:`New Jersey`,value:`J`},{label:`New Mexico`,value:`NM`},{label:`New York`,value:`NY`},{label:`North Carolina`,value:`NC`},{label:`North Dakota`,value:`ND`},{label:`Ohio`,value:`OH`},{label:`Oklahoma`,value:`OK`},{label:`Oregon`,value:`OR`},{label:`Pennsylvania`,value:`PA`},{label:`Rhode Island`,value:`RI`},{label:`South Carolina`,value:`C`},{label:`South Dakota`,value:`SD`},{label:`Tennessee`,value:`TN`},{label:`Texas`,value:`TX`},{label:`Utah`,value:`UT`},{label:`Vermont`,value:`VT`},{label:`Virginia`,value:`VA`},{label:`Washington`,value:`WA`},{label:`West Virginia`,value:`WV`},{label:`Wisconsin`,value:`WI`},{label:`Wyoming`,value:`WY`}],w={title:`Components/Autocomplete`,decorators:[s(`
      forge-autocomplete {
        width: 256px;
      }
    `)],render:e=>n`
      <forge-autocomplete
        .debounce=${e.debounce}
        .filterOnFocus=${e.filterOnFocus}
        .filterFocusFirst=${e.filterFocusFirst}
        .mode=${e.mode}
        .multiple=${e.multiple}
        .observeScroll=${e.observeScroll}
        .observeScrollThreshold=${e.observeScrollThreshold}
        .optionLimit=${e.optionLimit}
        .filter=${(e,t)=>(y(e,t),C.filter(t=>t.label.toLowerCase().includes(e.toLowerCase())))}
        .allowUnmatched=${e.allowUnmatched}
        .popupClasses=${e.popupClasses}
        .syncPopupWidth=${e.syncPopupWidth}
        .constrainPopupWidth=${e.constrainPopupWidth}
        .wrapOptionText=${e.wrapOptionText}
        .selectFirstOptionOnBlur=${e.selectFirstOptionOnBlur}
        empty-message=${d(e.emptyMessage)}
        @forge-autocomplete-change=${b}
        @forge-autocomplete-select=${x}
        @forge-autocomplete-scrolled-bottom=${S}>
        <forge-text-field show-clear popover-icon>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>
        </forge-text-field>
      </forge-autocomplete>
    `,component:v,argTypes:{...o({tagName:v,exclude:[`value`,`popupTarget`,`filterText`,`optionBuilder`,`filter`,`selectedTextBuilder`,`popupElement`,`beforeValueChange`,`isInitialized`,`popupHeaderBuilder`,`popupFooterBuilder`,`matchKey`,`open`,`emptyStateBuilder`],controls:{mode:{control:`select`,options:[`default`,`stateless`]}}})},args:{debounce:500,filterOnFocus:!0,filterFocusFirst:!0,selectFirstOptionOnBlur:!1,mode:`default`,optionLimit:10,observeScroll:!0,allowUnmatched:!1,multiple:!1,syncPopupWidth:!1,observeScrollThreshold:100,constrainPopupWidth:!0,wrapOptionText:!1}},T={},E={...i,render:()=>n`
      <forge-autocomplete .filter=${e=>C.filter(t=>t.label.toLowerCase().includes(e.toLowerCase()))} .optionBuilder=${e=>{let t=document.createElement(`div`);t.style.display=`flex`,t.style.gap=`16px`,t.style.alignItems=`center`;let n=document.createElement(`forge-avatar`);n.text=e.value.split(``).join(` `),n.letterCount=2,t.appendChild(n);let r=document.createElement(`span`);return r.textContent=e.label,t.appendChild(r),t}}>
        <forge-text-field show-clear popover-icon>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>
        </forge-text-field>
      </forge-autocomplete>
    `},D={...i,render:()=>{let e=m(),t=[];return n`
      <forge-autocomplete
        ${p(e)}
        observe-scroll
        .filter=${e=>(t=C.filter(t=>t.label.toLowerCase().includes(e.toLowerCase())).slice(0,5),t)}
        @forge-autocomplete-scrolled-bottom=${()=>{let n=t.length,r=C.slice(n,n+5);t=[...t,...r],e.value?.appendOptions(r)}}
        .beforeCloseCallback=${()=>{t=[]}}>
        <forge-text-field popover-icon>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>
        </forge-text-field>
      </forge-autocomplete>
    `}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}},O=[`Demo`,`CustomOptions`,`InfiniteScroll`]})))()}export{k as a,D as i,E as n,T as r,g as t};