import{b as d}from"./iframe-DolTQ_ZR.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-COYwcQSM.js";import"./app-bar-profile-button-B2oCDLHe.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-Bh89NwkQ.js";import"./menu-DW7qqDjL.js";import"./linear-progress-BmTkV8LG.js";import"./list-d6YAPAYp.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-C4pPAbJp.js";import"./icon-button-iKM7uPGI.js";import"./focus-indicator-BpougP6D.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-D8HDpLgg.js";import"./label-COj995Lw.js";import"./button-DFTAto27.js";import"./button-toggle-group-DC0jQM5f.js";import"./checkbox-D1aEUqzm.js";import"./switch-4U6lO5JQ.js";import"./base-field-zfp_RuVG.js";import"./text-field-D9MPoXtx.js";import"./backdrop-B-u3npFo.js";import"./badge-h2iYL_uV.js";import"./banner-Cu9lGG0r.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-K6DZIvNG.js";import"./calendar-BuV4oYNF.js";import"./card-BMdtMQOe.js";import"./chip-set-JH949XGm.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-2pLAL-yV.js";import"./date-picker-DuAO64wP.js";import"./date-range-picker-zXItNhC9.js";import"./divider-CARX-6j1.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-B5LIaFGu.js";import"./open-icon-BNLN8PKz.js";import"./file-picker-111eG-t-.js";import"./floating-action-button-Bzgnv6Lt.js";import"./inline-message-rggUpLwV.js";import"./key-item-DyUBpwXp.js";import"./keyboard-shortcut-0lrQCeK9.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-BPeX8Vhy.js";import"./page-state-B9wnmWpA.js";import"./paginator-rvYnnmyT.js";import"./scaffold-ALuq0Bgn.js";import"./secret-DHoeDQEg.js";import"./select-dropdown-C4BwYZZH.js";import"./select-B79WFlvw.js";import"./skip-link-BTAW-aS6.js";import"./slider-Dh3TeHsa.js";import"./split-view-C4puSYMq.js";import"./stack-DGYl-onA.js";import"./stepper-BttI_fpD.js";import"./table-DQK3DO3-.js";import"./tab-bar-Ds_gaU6Z.js";import"./time-picker-DZVbp-7O.js";import"./toast-tnp0fWMZ.js";import"./toolbar-DUvH1SqL.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-CIqIdBfn.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-BwlHE4ov.js";import"./split-button-CB4IJzv4.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],zt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,zt as P,m as W};
