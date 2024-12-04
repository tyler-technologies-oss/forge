import{a as p}from"./chunk-D5ZWXAHU-CGElDDNX.js";import"./lit-element-CgJqSpuc.js";import{x as g}from"./lit-html-paDGiEfB.js";import{g as d}from"./utils-CbH-gv82.js";import"./constants-CFf81ck9.js";import"./app-bar-profile-button-Bm7x_ILw.js";import"./state-layer-COSQHCpS.js";import"./focus-indicator-DesOnyyZ.js";import"./index-BmocOEUj.js";import"./badge-CflmfcPU.js";import"./icon-FszQmWVN.js";import"./menu-CNDrq6h_.js";import"./linear-progress-DKZR2TB_.js";import"./list-CZ9CZlmI.js";import"./popover-CFhwSXnG.js";import"./overlay-DUpFUxF7.js";import"./skeleton-RPu_OG0b.js";import"./avatar-BlmOt8Ln.js";import"./icon-button-CSqhF-TJ.js";const t="forge-app-bar-profile-button",b=p("forge-profile-card-profile"),$=p("forge-profile-card-sign-out"),x={title:"Components/App Bar/Profile",render:({profileButton:i,profileButtonText:l,signOutButton:n,signOutButtonText:m,open:s,fullName:f,email:u,avatarLetterCount:c=2})=>g`
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
    `,component:t,argTypes:{...d({tagName:t,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},r={};var o,e,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:"{}",...(a=(e=r.parameters)==null?void 0:e.docs)==null?void 0:a.source}}};const B=["Demo"],M=Object.freeze(Object.defineProperty({__proto__:null,Demo:r,__namedExportsOrder:B,default:x},Symbol.toStringTag,{value:"Module"}));export{r as D,M as P};
