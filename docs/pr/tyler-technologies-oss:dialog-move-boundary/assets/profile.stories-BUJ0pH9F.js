import{x as b}from"./iframe-Dk6FLRDb.js";import{g as y,s as I}from"./utils-QLgq-F6h.js";import"./feature-detection-uS6p5jc8.js";import"./accordion-C9RSixQz.js";import"./expansion-panel-BNaYdpp_.js";import"./index-CiLSBptl.js";import"./app-bar-profile-button-DqvvmGNO.js";import"./state-layer-CDmGOVud.js";import"./focus-indicator-13Sfphtk.js";import{I as h,t as v,a as x,b as L,c as _}from"./icon-B8CdcxqJ.js";import"./menu-COBLhr1H.js";import"./linear-progress-2PahUgVv.js";import"./list-BoYqkH2U.js";import"./popover-DCwSavHj.js";import"./overlay-Dg-i6Kxe.js";import"./skeleton-C4EH8VF8.js";import"./avatar-USdFneRN.js";import"./icon-button-CvGVrMJL.js";import"./autocomplete-CT01K3nf.js";import"./label-DwYtoavE.js";import"./button-BApUEgZW.js";import"./button-toggle-group-C313Qpis.js";import"./checkbox-BNaDur5-.js";import"./switch-B3HYUxdj.js";import"./base-field-DnyNt-Yd.js";import"./text-field-CpSfPocF.js";import"./backdrop-BZvWLwDX.js";import"./badge-CH-ibTj3.js";import"./banner-Ce9sAkFw.js";import"./bottom-sheet-C1jDSkxP.js";import"./dialog-D3BzxWt2.js";import"./button-area-VUYCJpLs.js";import"./calendar-DKVitxlb.js";import"./card-BmuWhvgj.js";import"./chip-set-CVBElNQP.js";import"./circular-progress-xrl2HF46.js";import"./color-picker-DSXxCxs3.js";import"./date-picker-C9K_r-7i.js";import"./date-range-picker-lIY1FBrt.js";import"./divider-DoNAUeHX.js";import"./base-drawer-DcDVrIqr.js";import"./drawer-BllaMlBA.js";import"./modal-drawer-CZ3WTkcn.js";import"./mini-drawer-B7yhXATB.js";import"./file-picker-CC5nSgSq.js";import"./floating-action-button-DgbsMxI1.js";import"./inline-message-By3BVHSa.js";import"./key-item-Dd3UCsSn.js";import"./keyboard-shortcut-Cs_3tUZu.js";import"./label-value-CaouEyrO.js";import"./meter-group-EOQUdhg7.js";import"./page-state-em5vC-QK.js";import"./paginator-CMQOcW-K.js";import"./scaffold-CGyusmPL.js";import"./select-dropdown-CZftB_AV.js";import"./select-DjvyOcF1.js";import"./skip-link-BP1PC1Az.js";import"./slider-DzAe4ZmL.js";import"./split-view-CRtxdIks.js";import"./stack-niTWfPr5.js";import"./stepper-DJWPwbnX.js";import"./table-eEsyXCkt.js";import"./tab-bar-C6TF7M88.js";import"./time-picker-Dl0YYNuB.js";import"./toast-BWBdWgdg.js";import"./toolbar-Byb6kcao.js";import"./tooltip-BZNSu0mZ.js";import"./view-switcher-EfMcYRc9.js";import"./deprecated-icon-button-DbRud03D.js";import"./split-button-Bh5M47Us.js";const{action:C}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",O=C("forge-profile-card-profile"),P=C("forge-profile-card-sign-out");h.define([v,x,L,_]);const S={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>b`
      <forge-app-bar title-text="Profile">
        <forge-app-bar-profile-button
          slot="end"
          @forge-profile-card-profile=${O}
          @forge-profile-card-sign-out=${P}
          .avatarLetterCount=${n}
          .profileButton=${p}
          .profileButtonText=${e}
          .signOutButton=${t}
          .signOutButtonText=${o}
          .fullName=${r}
          .email=${i}
          .open=${a}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `,component:s,argTypes:{...y({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},l={},m={...I,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.log("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return b`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};var c,d,u;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(u=(d=l.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var f,g,E;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    function builder() {
      const listElement = document.createElement('forge-list');
      listElement.addEventListener('forge-list-item-select', ({
        detail
      }) => {
        console.log('[profile-card] Selected custom item:', detail.value);
      });
      listElement.style.setProperty('--forge-list-padding', '0');
      listElement.appendChild(document.createElement('forge-divider'));
      listElement.appendChild(buildListItemElement('My Reports', 'assignment', 'reports'));
      listElement.appendChild(buildListItemElement('My Workflow', 'work_outline', 'workflow'));
      listElement.appendChild(buildListItemElement('My Alerts', 'warning', 'alerts'));
      listElement.appendChild(buildListItemElement('My Preferences', 'settings', 'preferences'));
      return listElement;
    }
    function buildListItemElement(text: string, icon: string, value: string): HTMLElement {
      const listItemElement = document.createElement('forge-list-item');
      listItemElement.value = value;
      const iconElement = document.createElement('forge-icon');
      iconElement.slot = 'leading';
      iconElement.name = icon;
      listItemElement.appendChild(iconElement);
      const buttonElement = document.createElement('button');
      buttonElement.type = 'button';
      buttonElement.innerText = text;
      listItemElement.appendChild(buttonElement);
      return listItemElement;
    }
    return html\`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=\${builder}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    \`;
  }
}`,...(E=(g=m.parameters)==null?void 0:g.docs)==null?void 0:E.source}}};const $=["Demo","WithCustomContent"],Yt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:$,default:S},Symbol.toStringTag,{value:"Module"}));export{l as D,Yt as P,m as W};
