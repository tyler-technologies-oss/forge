import{b as d}from"./iframe-DMo3MVJF.js";import{s as u,g as f}from"./utils-BAJ2NYw0.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BtGAEhuz.js";import"./app-bar-profile-button-D9aAkVjq.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CLRB61lC.js";import"./menu-DwiJ9gyK.js";import"./linear-progress-DLb8lZjg.js";import"./list-DsLQLLR8.js";import"./popover-CEB7wJ9f.js";import"./overlay-CO6PgNVS.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-jvDFel5Y.js";import"./avatar-S1ZnP54j.js";import"./icon-button-BfpH_20H.js";import"./focus-indicator-BIvf68Ln.js";import"./state-layer-cKdDztbm.js";import"./autocomplete-DdxTRlS2.js";import"./label-MBhdfpnc.js";import"./button-CrfmxSql.js";import"./button-toggle-group-CBfl-rR_.js";import"./checkbox-CLsZjF62.js";import"./switch-B7XBRa8V.js";import"./base-field-DVohQNNY.js";import"./text-field-BG2fNnwF.js";import"./backdrop-Br-v5NXK.js";import"./badge-BPpoJdYu.js";import"./banner-Dfr0UOxd.js";import"./bottom-sheet-DW0bVRhV.js";import"./dialog-d1olEQgx.js";import"./button-area-CA-DoEIl.js";import"./calendar-DtAAKzmA.js";import"./card-DP576ngI.js";import"./chip-set-DyCCN5V_.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-Dnmf1tGU.js";import"./date-picker-BlVWlJjx.js";import"./date-range-picker-CvisavCJ.js";import"./divider-COow-TVH.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-Bk4QKaOa.js";import"./modal-drawer-CinZNACQ.js";import"./mini-drawer-DpFIFw8V.js";import"./expansion-panel-Bhumm2Fb.js";import"./open-icon-CLpApPQ_.js";import"./file-picker-DQIKbfFG.js";import"./floating-action-button-DRl50Gn9.js";import"./inline-message-EO-dHXbB.js";import"./key-item-Cwmv-IqD.js";import"./keyboard-shortcut-DD950MXw.js";import"./label-value-C46r41pN.js";import"./meter-group-DnmkkfjE.js";import"./page-state-BeEclPwI.js";import"./paginator-pGkAC21y.js";import"./scaffold-B-1oYF3d.js";import"./secret-BjtuwVCL.js";import"./select-dropdown-D75Ksk7z.js";import"./select-CEfUyNnX.js";import"./skip-link-B89wPmah.js";import"./slider-DDlpyjMj.js";import"./split-view-BOA46rO1.js";import"./stack-DskzmGQg.js";import"./stepper-CXWaEwKK.js";import"./table-B4RgWhlS.js";import"./tab-bar-_6e16EBZ.js";import"./time-picker-DEbq4NnC.js";import"./toast-BP7hCEld.js";import"./toolbar-C7Yoq6pb.js";import"./tooltip-BITM9ydT.js";import"./tree-item-CXChPvRW.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-BdhMKPmU.js";import"./split-button-VyxZz8yK.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
