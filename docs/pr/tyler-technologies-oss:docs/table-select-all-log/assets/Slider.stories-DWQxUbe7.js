import{a as t}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{c,e as p,g as u,s as f}from"./utils-tyit5L24.js";import{s as b}from"./decorators-DJTA_amK.js";import"./constants-CFf81ck9.js";import"./slider-CmahUt9W.js";import"./index-BmocOEUj.js";const y="body.sb-show-main.sb-main-padded{padding-top:48px}",n="forge-slider",S=t("forge-slider-input"),v=t("forge-slider-change"),E=t("forge-slider-range-input"),h=t("forge-slider-range-change"),x={title:"Components/Slider",render:s=>{const e=c(n,s);return s.range?(e.setAttribute("data-aria-label-start","Start"),e.setAttribute("data-aria-label-end","End")):e.setAttribute("data-aria-label","Value"),e.addEventListener("forge-slider-input",S),e.addEventListener("forge-slider-change",v),e.addEventListener("forge-slider-range-input",E),e.addEventListener("forge-slider-range-change",h),e},component:n,decorators:[b(y)],parameters:{docs:{source:{transform:p}}},argTypes:{...u({tagName:n,exclude:["labelBuilder","name","nameStart","nameEnd","form","labels"],controls:{value:{if:{arg:"range",truthy:!1},control:{type:"range",min:0,max:100,step:1}},valueStart:{if:{arg:"range"},control:{type:"range",min:0,max:100,step:1}},valueEnd:{if:{arg:"range"},control:{type:"range",min:0,max:100,step:1}},label:{if:{arg:"range",truthy:!1}},labelStart:{if:{arg:"range"}},labelEnd:{if:{arg:"range"}}}})},args:{value:50,valueStart:33,valueEnd:67,min:0,max:100,step:1,range:!1,tickmarks:!1,labeled:!0,disabled:!1,readonly:!1}},a={},r={...f,args:{range:!0}};var o,l,i;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:"{}",...(i=(l=a.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var d,g,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    range: true
  }
}`,...(m=(g=r.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};const A=["Demo","Range"],O=Object.freeze(Object.defineProperty({__proto__:null,Demo:a,Range:r,__namedExportsOrder:A,default:x},Symbol.toStringTag,{value:"Module"}));export{a as D,r as R,O as S};
