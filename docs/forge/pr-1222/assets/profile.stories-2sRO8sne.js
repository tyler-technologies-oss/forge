import{b as d}from"./iframe-CeKgC4Tg.js";import{s as u,g as f}from"./utils-D6ldXT3I.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CZ5CrEx2.js";import"./app-bar-menu-button-CE3vqm4N.js";import"./app-bar-profile-button-DQqARlTH.js";import{I as g}from"./icon-BaAa1Ck7.js";import"./menu-nDrc3LKh.js";import{a as E,b,c as C,d as y}from"./tyler-icons-BSgf1RSL.js";import"./linear-progress-kQO48laS.js";import"./list-Oak2HfaZ.js";import"./popover-BaM9yRL2.js";import"./overlay-B0nIhxxX.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-Cp3qj50X.js";import"./list-item-STGQfT7T.js";import"./avatar-DQkbUFZT.js";import"./icon-button-BgdhWm-e.js";import"./autocomplete-Bhs_oqXW.js";import"./label-Wh14ysll.js";import"./base-field-B_sZ86kO.js";import"./focus-indicator-DJB1EMSX.js";import"./text-field-CSZs9ENS.js";import"./backdrop-C9lBlb_d.js";import"./badge-CVBE5I1d.js";import"./banner-CHgrK1ly.js";import"./bottom-sheet-BKlDie0_.js";import"./dialog-CAL1jFxe.js";import"./button-area-BsSFlCJJ.js";import"./button-toggle-group-YG3JNBOK.js";import"./button-DkeZ1DSR.js";import"./calendar-BZYO17-K.js";import"./card-Dv3Ot_ZX.js";import"./checkbox-B6bAGvJX.js";import"./chip-set-CAA2YcNR.js";import"./state-layer-CZIH5add.js";import"./circular-progress-CfoxEQ_B.js";import"./color-picker-Co2HpyuF.js";import"./date-picker-DpPUT1z5.js";import"./date-range-picker-BTbZPj5G.js";import"./divider-BMFeCfb2.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-6XaMN4pJ.js";import"./modal-drawer-B7CU3QM4.js";import"./mini-drawer-Dj8wQkgb.js";import"./expansion-panel-BDtGseSE.js";import"./open-icon-CV--GR_T.js";import"./file-picker-O6evC40i.js";import"./floating-action-button-CxsyLVsF.js";import"./inline-message-BKecgmUf.js";import"./kbd-Da9tNz5r.js";import"./key-item-DhbOhth3.js";import"./keyboard-shortcut-BZtcrVof.js";import"./label-value-06gdOjV6.js";import"./meter-group-byNSiqny.js";import"./page-state-DdcxjGPv.js";import"./paginator-CdeiCc4Y.js";import"./radio-group-Ca3UcLGs.js";import"./scaffold-ua4VSBPI.js";import"./secret-B0C19AFh.js";import"./select-dropdown-VFdbTQ9U.js";import"./select-VwVQToCw.js";import"./skip-link-gFtx3YaW.js";import"./slider-DKcuD3LY.js";import"./split-view-B03ysKAl.js";import"./stack-CzasDS03.js";import"./stepper-BMeLjyJ6.js";import"./switch-B1yyLXJp.js";import"./table-brHAZfvQ.js";import"./tab-panel-CpK6uauY.js";import"./time-picker-CaCMPU6-.js";import"./timestamp-BSS4bcG-.js";import"./toast-B85WfXYk.js";import"./toolbar-k9nL1GJf.js";import"./tooltip-dfcTj2Ex.js";import"./tree-item-DPzFX9TA.js";import"./view-switcher-B1N5uMXB.js";import"./deprecated-icon-button-DLGn0NgM.js";import"./split-button-CnjlK5Vs.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
  `,component:s,argTypes:{...f({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},m={},l={...u,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.warn("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return d`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"{}",...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Qt=Object.freeze(Object.defineProperty({__proto__:null,Demo:m,WithCustomContent:l,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{m as D,Qt as P,l as W};
