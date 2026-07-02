import{b as d}from"./iframe-Bn92obe2.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BUkeJmnK.js";import"./app-bar-profile-button-BBQwGzDw.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CkNeFONk.js";import"./menu-CWnGeyZk.js";import"./linear-progress-dFUODLVX.js";import"./list-D8Oj1l7N.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./avatar-D3XnF2EQ.js";import"./icon-button-C6iTxPUM.js";import"./focus-indicator-DmHtM5vf.js";import"./state-layer-CKPcsXao.js";import"./autocomplete-B_JT8jak.js";import"./label-CCJpr-qV.js";import"./base-field-PzDk_a04.js";import"./text-field-B6xlw1GL.js";import"./backdrop--ezx6yHr.js";import"./badge-BnwiyHMV.js";import"./banner-CrXk_l2q.js";import"./bottom-sheet-D4YyTlPZ.js";import"./dialog-D3n85AUX.js";import"./button-area-C44BB9bW.js";import"./button-toggle-group-JYRI8rkn.js";import"./button-1Czk2qyT.js";import"./calendar-CnG4vARW.js";import"./card-1C3Wc8IR.js";import"./checkbox-BYJHKJQR.js";import"./chip-set-Bl4SV-NN.js";import"./circular-progress-BvJErdQG.js";import"./color-picker-CWk9Adp3.js";import"./date-picker-4_C6TaDq.js";import"./date-range-picker-YB3ulCsx.js";import"./divider-BkeYNiIg.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BJC8mhbC.js";import"./modal-drawer-C_HzRa2f.js";import"./mini-drawer-CJFzgWnt.js";import"./expansion-panel-CPNhCr6e.js";import"./open-icon-Db2Rr9Yg.js";import"./file-picker-8xot-3jv.js";import"./floating-action-button-7GvQ3a6k.js";import"./inline-message-1YYbEfHN.js";import"./key-item-C_Rqt3NJ.js";import"./keyboard-shortcut-CjDYBsRl.js";import"./label-value-CMJEsLJf.js";import"./meter-group-CT1HTPs_.js";import"./page-state-BwPC_Hd9.js";import"./paginator-dcdy5pb_.js";import"./radio-group-Bu7JqbUe.js";import"./scaffold-BAVRvYZ-.js";import"./secret-CsWcLBid.js";import"./select-dropdown-DLa_tXVp.js";import"./select-BeDFTmHi.js";import"./skip-link-DZS-P9Y2.js";import"./slider-Brr2_Lim.js";import"./split-view-31J_VHfW.js";import"./stack-BRmnsrL_.js";import"./stepper-DWvVnCgt.js";import"./switch-BPoHUd3B.js";import"./table-DmTCalR8.js";import"./tab-bar-Bxouh2Lu.js";import"./time-picker-qS7TFG-v.js";import"./toast-D4GtcTp2.js";import"./toolbar-m2auwteb.js";import"./tooltip-CE7u4Ary.js";import"./tree-item-t3ULkl82.js";import"./view-switcher-B4ao6iwI.js";import"./deprecated-icon-button-B4VDFGYq.js";import"./split-button-BMwfXP7P.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
