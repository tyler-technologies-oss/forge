import{b as d}from"./iframe-BTmUWVwH.js";import{s as u,g as f}from"./utils-Cu3TicFl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CMXvbJEx.js";import"./app-bar-profile-button-DY7NB-jR.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-Dm9kVKGO.js";import"./menu-Davrh2ix.js";import"./linear-progress-BvuLf7up.js";import"./list-5-sNw3FD.js";import"./popover-nR64di3F.js";import"./overlay-DRBmjWU5.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-IZvJiFBF.js";import"./avatar-DGRn3LTw.js";import"./icon-button-DNSyxmm6.js";import"./focus-indicator-DQKlHuL5.js";import"./state-layer-DRsbBcDh.js";import"./autocomplete-DdpSCmDA.js";import"./label-CI7PxrYK.js";import"./base-field-ComZmZ30.js";import"./text-field-CYRZj-sj.js";import"./backdrop-SMwLBDG5.js";import"./badge-BvGupbIC.js";import"./banner-BzIwdi2t.js";import"./bottom-sheet-CrPMJblw.js";import"./dialog-CcEC3WqU.js";import"./button-area-BDd-ry7N.js";import"./button-toggle-group-D9HAsf89.js";import"./button-DVCkK0hu.js";import"./calendar-Z6Lb8jmO.js";import"./card-DzWcAfpK.js";import"./checkbox-Bhz4-l9m.js";import"./chip-set-Cfs2ly6l.js";import"./circular-progress-yFB3Uh8Q.js";import"./color-picker-CCmXErEH.js";import"./date-picker-B9V7AOy1.js";import"./date-range-picker-EFGB1xtE.js";import"./divider-DpX8I4m5.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-DthgZrcs.js";import"./modal-drawer-DDnthQ-H.js";import"./mini-drawer-Bis_TD9h.js";import"./expansion-panel-DEdhFBI3.js";import"./open-icon-06xTWQce.js";import"./file-picker-0OiJzqWK.js";import"./floating-action-button-B0-6Sw_c.js";import"./inline-message-Dej6nioH.js";import"./key-item-CJCl-fWO.js";import"./keyboard-shortcut-CuM9gL5P.js";import"./label-value-CJDyRgCt.js";import"./meter-group-CRpOTHh-.js";import"./page-state-xtTZreUO.js";import"./paginator-CUjOF-tH.js";import"./radio-group-CcmpflHx.js";import"./scaffold-l7cEUk27.js";import"./secret-CZAmZN0r.js";import"./select-dropdown-CBMtUHT4.js";import"./select-BA56KeuA.js";import"./skip-link-Cmj_EBmq.js";import"./slider-h7q8wBPP.js";import"./split-view-BZlwh5La.js";import"./stack-DYrRnd9D.js";import"./stepper-75S1glZf.js";import"./switch-B_4RPJuC.js";import"./table--m_oba3d.js";import"./tab-bar-BywJzXuM.js";import"./time-picker-BdiUTkAU.js";import"./toast-CcS9jaa-.js";import"./toolbar-B53_l6vS.js";import"./tooltip-CK3n2hL6.js";import"./tree-item--E2ApP4-.js";import"./view-switcher-xUv-lFl9.js";import"./deprecated-icon-button-CLBWnFC_.js";import"./split-button-BfupTdCo.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
    <forge-app-bar title-text="Profile">
      <forge-app-bar-profile-button
        slot="end"
        @forge-profile-card-profile=${I}
        @forge-profile-card-sign-out=${h}
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
  `,component:s,argTypes:{...f({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},l={},m={...u,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.warn("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return d`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    function builder(): HTMLElement {
      const listElement = document.createElement('forge-list');
      listElement.addEventListener('forge-list-item-select', ({
        detail
      }) => {
        console.warn('[profile-card] Selected custom item:', detail.value);
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Kt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Kt as P,m as W};
