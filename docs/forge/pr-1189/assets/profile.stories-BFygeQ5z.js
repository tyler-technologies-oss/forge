import{b as d}from"./iframe-CYwqMFpx.js";import{s as u,g as f}from"./utils-BUEgyQuR.js";import"./service-adapter-gy1PbA1l.js";import"./accordion-BbAFW-zG.js";import"./app-bar-menu-button-fB8KMrPO.js";import"./app-bar-profile-button-rxBDKpp4.js";import{I as g,a as E,b,c as C,d as y}from"./icon-Tt8SKUgI.js";import"./menu-MsPtpkjZ.js";import"./linear-progress-BGu4ylYb.js";import"./list-CkoA38zs.js";import"./popover-B35Hts03.js";import"./overlay-Cs0NPCFb.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-LiqMF6t1.js";import"./list-item-CZAN63bf.js";import"./avatar-DXT36jsZ.js";import"./icon-button-DFwZyKlJ.js";import"./autocomplete-DeJJZqb-.js";import"./label-Dp2ZPcXR.js";import"./base-field-D_vR6NJB.js";import"./focus-indicator-ujSflWoB.js";import"./text-field-Clx__mgd.js";import"./backdrop-Cme44_g_.js";import"./badge-BgBaSQM8.js";import"./banner-BMSn9Uk5.js";import"./bottom-sheet-BpqXYMPv.js";import"./dialog-DltvDBv-.js";import"./button-area-COd3Yc_N.js";import"./button-toggle-group-KfojCQEN.js";import"./button-DHU_VBE6.js";import"./calendar-f9vYVO8l.js";import"./card-N-G0In5S.js";import"./checkbox-DNzhdoNi.js";import"./chip-set-BaQPIV90.js";import"./state-layer-D75fz-rw.js";import"./circular-progress-D4RaVrYZ.js";import"./color-picker-DHttPtra.js";import"./date-picker-mqNVZvo9.js";import"./date-range-picker-xWigc9us.js";import"./divider-CekVskZe.js";import"./base-drawer-BL5lye2C.js";import"./drawer-lU6k92RL.js";import"./modal-drawer-BZ72iO8w.js";import"./mini-drawer-OoNkqIRy.js";import"./expansion-panel-DX-93Wln.js";import"./open-icon-DQI1fgBS.js";import"./file-picker-Di9mAJ_f.js";import"./floating-action-button-CB2Xhyw3.js";import"./inline-message-BPZn-wv9.js";import"./key-item-C5O1zr69.js";import"./keyboard-shortcut-B59Hc7zC.js";import"./label-value-Arz5rsAk.js";import"./meter-group-JJaTCXmf.js";import"./page-state-DpE8pwA_.js";import"./paginator-DS9ek5iX.js";import"./radio-group-BhgzTalW.js";import"./scaffold-BVJBr1z1.js";import"./secret-BbAvbCcd.js";import"./select-dropdown-Ce_nBtiq.js";import"./select-BIGuyKav.js";import"./skip-link-B4nhO-Xi.js";import"./slider-CdwIts3-.js";import"./split-view-CaghH58h.js";import"./stack-k5bE-KTo.js";import"./stepper-Bj1HTAS-.js";import"./switch-DUXWpkCl.js";import"./table-CmRqRd4K.js";import"./tab-panel-DQc0Wb2z.js";import"./time-picker-BOSjJnW6.js";import"./timestamp-DfCxWnAj.js";import"./toast-Bs4ddvS2.js";import"./toolbar-BV7So2Bl.js";import"./tooltip-DctRAECl.js";import"./tree-item-c5WSOiC6.js";import"./view-switcher-BCdzMvcV.js";import"./deprecated-icon-button-BqTQJ6wG.js";import"./split-button-C8M2GJuz.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Gt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Gt as P,m as W};
