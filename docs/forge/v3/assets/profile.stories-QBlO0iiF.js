import{b as d}from"./iframe-CyVzs1iA.js";import{s as u,g as f}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-8uIaden7.js";import"./app-bar-profile-button-C45B2yt1.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CcLmWY47.js";import"./menu-CCucIb9F.js";import"./linear-progress-DP1CUIRM.js";import"./list-HPvAg-NU.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-CMU6kkVX.js";import"./icon-button-6oaFCuoN.js";import"./focus-indicator-BpO-inXx.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-Cdbhl1Dd.js";import"./label-Dw5qbEnQ.js";import"./button-CGKDyspu.js";import"./button-toggle-group-BF0L_G8B.js";import"./checkbox-TbTJHJyy.js";import"./switch-CUDOX5Fd.js";import"./base-field-Cs4v-MR6.js";import"./text-field-BUI-l4kM.js";import"./backdrop-B_VtJyIN.js";import"./badge-7L3gC5Tv.js";import"./banner-hD4bI13g.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-3P0Bi4Zm.js";import"./calendar-BFoFZI8F.js";import"./card-5gOCyX6F.js";import"./chip-set-qDdMP3ny.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-DVVtmP8v.js";import"./date-picker-I2rdToKR.js";import"./date-range-picker-DVlqrSQo.js";import"./divider-BgJBz89g.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-Cto-xzSm.js";import"./open-icon-AXl56-Xc.js";import"./file-picker-fvhhuO9Z.js";import"./floating-action-button-DUeTdfo1.js";import"./inline-message-BK9gijHu.js";import"./key-item-XlirVHgu.js";import"./keyboard-shortcut-Cmavp7zB.js";import"./label-value-BE9wSmbi.js";import"./meter-group-B_BHeYa0.js";import"./page-state-BYBCycIs.js";import"./paginator-CViQZP3z.js";import"./scaffold-D_SIXSFE.js";import"./secret-DbvGK_G1.js";import"./select-dropdown-CLUcXVpn.js";import"./select-DuI9Db9T.js";import"./skip-link-79utm5uO.js";import"./slider-C9IyT4f_.js";import"./split-view-Bp_yy-JD.js";import"./stack-BuaXNRar.js";import"./stepper-DWPixe2e.js";import"./table-DWNB0bXJ.js";import"./tab-bar-BiNcymz1.js";import"./time-picker-DmNhuWuc.js";import"./toast-nAxcUbIM.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-DPnpi0j2.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-C8iRRWla.js";import"./split-button-Cymg0eNl.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
