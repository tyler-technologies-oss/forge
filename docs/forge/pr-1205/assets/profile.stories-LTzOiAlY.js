import{b as d}from"./iframe-C8ybUYbn.js";import{s as u,g as f}from"./utils-E9-_u7-I.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BgV8KvDV.js";import"./app-bar-profile-button-CRKMvjir.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CRlGDmUG.js";import"./menu-DShisam-.js";import"./linear-progress-BuTzYSPq.js";import"./list-DG8ewqF7.js";import"./popover-D2oimSag.js";import"./overlay-BLe9QgxT.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DAg_CUT8.js";import"./avatar-Bs6PZd28.js";import"./icon-button-Cy4k6hOV.js";import"./focus-indicator-BUamxVwB.js";import"./state-layer-B1dog9AJ.js";import"./autocomplete-D0l47dsh.js";import"./label-DlinoIlG.js";import"./base-field-CoaBVvua.js";import"./text-field-o0oDmfCJ.js";import"./backdrop-CIiH6Dag.js";import"./badge-BgAtsOx9.js";import"./banner-jUNf50WC.js";import"./bottom-sheet-q6S3FJW_.js";import"./dialog-DT-DUhM1.js";import"./button-area-DUa8j7xs.js";import"./button-toggle-group-DmyRpvBl.js";import"./button-O8hUbfqZ.js";import"./calendar-_Q_V2CNj.js";import"./card-Cd_KWw2Y.js";import"./checkbox-JalKMRMJ.js";import"./chip-set-Dn9nz41M.js";import"./circular-progress-BqNemWjC.js";import"./color-picker-BMXRquWo.js";import"./date-picker-CI-61pfS.js";import"./date-range-picker-rlt-FzYi.js";import"./divider-Dcn-_5Ud.js";import"./base-drawer-H_Vclf0e.js";import"./drawer-VrFasrSd.js";import"./modal-drawer-B5TY4Qqi.js";import"./mini-drawer-j_wQw-o8.js";import"./expansion-panel-B1Cm6tr7.js";import"./open-icon-B_-5ETw7.js";import"./file-picker-2WrfLDcX.js";import"./floating-action-button-On1F4hAj.js";import"./inline-message-Bn0Suvrv.js";import"./key-item-BufjNmMi.js";import"./keyboard-shortcut-DKP1Ny49.js";import"./label-value-BBtWzpWn.js";import"./listbox-UTgo24Yv.js";import"./meter-group-BHSKMVhs.js";import"./page-state-CbLkYdiz.js";import"./paginator-0CK0uE9v.js";import"./radio-group-Cca84TeK.js";import"./scaffold-DgAVuyRY.js";import"./secret-8J-kiwwv.js";import"./option-mPqn71yb.js";import"./select-dropdown-V9Qp8vHp.js";import"./select-BTJz8574.js";import"./skip-link--NinZ010.js";import"./slider-PgrbLZp_.js";import"./split-view-BCx3k0R0.js";import"./stack-BJj2fenZ.js";import"./stepper-DD9edTRv.js";import"./switch-Djd3HgJY.js";import"./table-C-mjaMW7.js";import"./tab-panel-BGFCov6B.js";import"./time-picker-Do4DWGgd.js";import"./timestamp-B_-ROkKy.js";import"./toast-DSS-wDSN.js";import"./toolbar-BZryCujz.js";import"./tooltip-CqXIqgYQ.js";import"./tree-item-it637Jgr.js";import"./view-switcher-Cke0UXCI.js";import"./deprecated-icon-button-DTvpZpb2.js";import"./split-button-pBWjDD2O.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
