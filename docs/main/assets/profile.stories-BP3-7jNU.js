import{a as p}from"./chunk-454WOBUV-CM0pFb8Z.js";import"./lit-element-Dk2-kgKT.js";import{k as g}from"./lit-html-DZH-Jm0H.js";import{g as d}from"./utils-CCkBKb7B.js";import"./constants-DjE6emXm.js";import"./app-bar-profile-button-D7Aqv1qF.js";import"./state-layer-DTKAXCUq.js";import"./focus-indicator-_fDu4ZqT.js";import"./index-Dh0vMUMR.js";import"./badge-CO5a_--I.js";import"./icon-DHpZ4R73.js";import"./menu-B6n9OCw8.js";import"./linear-progress-CcMix19v.js";import"./list-ePbvhvCk.js";import"./popover-ClXodM0C.js";import"./overlay-BjQy6-wl.js";import"./skeleton-Cs99PVGD.js";import"./avatar-Cja6atCs.js";import"./icon-button-Bwf4zXUE.js";const t="forge-app-bar-profile-button",b=p("forge-profile-card-profile"),$=p("forge-profile-card-sign-out"),B={title:"Components/App Bar/Profile",render:({profileButton:i,profileButtonText:l,signOutButton:n,signOutButtonText:m,open:s,fullName:f,email:u,avatarLetterCount:c=2})=>g`
      <forge-app-bar title-text="Profile">
        <forge-app-bar-profile-button
          slot="end"
          @forge-profile-card-profile=${b}
          @forge-profile-card-sign-out=${$}
          .avatarLetterCount=${c}
          .profileButton=${i}
          .profileButtonText=${l}
          .signOutButton=${n}
          .signOutButtonText=${m}
          .fullName=${f}
          .email=${u}
          .open=${s}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `,component:t,argTypes:{...d({tagName:t,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},r={};var o,e,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:"{}",...(a=(e=r.parameters)==null?void 0:e.docs)==null?void 0:a.source}}};const x=["Demo"],M=Object.freeze(Object.defineProperty({__proto__:null,Demo:r,__namedExportsOrder:x,default:B},Symbol.toStringTag,{value:"Module"}));export{r as D,M as P};
