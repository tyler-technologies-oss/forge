import{b as d}from"./iframe-BK3r3gy1.js";import{s as u,g as f}from"./utils-ZPyYhNMY.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CBK0azhz.js";import"./app-bar-profile-button-Bc88X_6L.js";import"./icon-CXw8uXM_.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-uU9Yd7lf.js";import"./menu-oM4UPGdx.js";import"./linear-progress-D8EbdkBB.js";import"./list-CRxpAe8T.js";import"./popover-HtFB3a_u.js";import"./overlay-B3G4TIM3.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./skeleton-CAo0Ux7j.js";import"./avatar-B9BCroA5.js";import"./icon-button-Mxsm8Q6s.js";import"./focus-indicator-BBtCjyD8.js";import"./state-layer-Kw6pmYRH.js";import"./autocomplete-DJ63dKj8.js";import"./label-BfNTkqXX.js";import"./button-558tNDpa.js";import"./button-toggle-group-B_NQutYT.js";import"./checkbox-Czva33aP.js";import"./switch-AGgnckDO.js";import"./base-field-DWygkCL_.js";import"./text-field-Cel5Wjfj.js";import"./backdrop-a1S5RG8l.js";import"./badge-QMYMXgwr.js";import"./banner-J5qP2dCT.js";import"./bottom-sheet-D5T4IZuN.js";import"./dialog-DJEPAlvV.js";import"./button-area-DiGtPAb0.js";import"./calendar-B1JeLOEF.js";import"./card-Ck5qVP45.js";import"./chip-set-DfdspMPI.js";import"./circular-progress-Si-T5t1M.js";import"./color-picker-BprQxU5o.js";import"./date-picker-OGT6zjhS.js";import"./date-range-picker-BIF25fiL.js";import"./divider-BG1pHrzo.js";import"./base-drawer-CUYrr1Bq.js";import"./drawer-CDB0iEbf.js";import"./modal-drawer-C8vaVfK9.js";import"./mini-drawer-Bip3vlRk.js";import"./expansion-panel-Hh-RCnGo.js";import"./open-icon-CFmphaM2.js";import"./file-picker-O1FH0qPW.js";import"./floating-action-button-7aUsPFml.js";import"./inline-message-tKqAf8mr.js";import"./key-item-DS-jHBM0.js";import"./keyboard-shortcut-CvBjdgZr.js";import"./label-value-Cdqxole-.js";import"./meter-group-XUAI_tEJ.js";import"./page-state-B_vh_0Mk.js";import"./paginator-B-YVev9D.js";import"./scaffold-4YYLz8U4.js";import"./secret-BZStBRQF.js";import"./select-dropdown-DpeBoWee.js";import"./select-c4QyAe02.js";import"./skip-link-DAfehOCZ.js";import"./slider-n8CY4O4L.js";import"./split-view-vxLkhmwW.js";import"./stack-B-rTgSVu.js";import"./stepper-DbM8aFYp.js";import"./table-DzQmg83A.js";import"./view-switcher-BULqZKYq.js";import"./tab-bar-BoE821TQ.js";import"./time-picker-DbRN0xjg.js";import"./toast-CvAPX4Su.js";import"./toolbar-BB4q_Mxo.js";import"./tooltip-CePIGaWS.js";import"./tree-item-B6EW5pNY.js";import"./deprecated-icon-button-DA0u0hVr.js";import"./split-button-DAdsS1aE.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
