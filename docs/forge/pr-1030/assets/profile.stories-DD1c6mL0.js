import{b as d}from"./iframe-BNLeoktC.js";import{s as u,g as f}from"./utils-BA5-_s-B.js";import"./service-adapter-8tADcN_b.js";import"./accordion-avAUU6P8.js";import"./app-bar-profile-button-CnISwz8G.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DaMGoXCH.js";import"./menu-BrWvPA6r.js";import"./linear-progress-DP1CUIRM.js";import"./list-CjEsMWX-.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-Bmu0Npo4.js";import"./icon-button-ddudemr_.js";import"./focus-indicator-xuYWsIuh.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-BX0kjFiw.js";import"./label-BGKP06YU.js";import"./button-DeRmPT5Y.js";import"./button-toggle-group-sYeHA9TV.js";import"./checkbox-D3j5v1XL.js";import"./switch-CW_PluLC.js";import"./base-field-C6D8FPjg.js";import"./text-field-DVwdQ3nA.js";import"./backdrop-B_VtJyIN.js";import"./badge-DOOApDnr.js";import"./banner-DqhUM9Sg.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-DINjpw9V.js";import"./calendar-BztJLuQJ.js";import"./card-DaEQJesg.js";import"./chip-set-DKv1SJtc.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-CK6J0Bds.js";import"./date-picker-UYOoPr0u.js";import"./date-range-picker-BsURPYGs.js";import"./divider-BOAJpmI8.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-W5Woa9Gy.js";import"./open-icon-qH5vns2T.js";import"./file-picker-CTIRAvSX.js";import"./floating-action-button-Cwqpgr0-.js";import"./inline-message-BK9gijHu.js";import"./key-item-5M-X1oOI.js";import"./keyboard-shortcut-qa5mBgr6.js";import"./label-value-BE9wSmbi.js";import"./meter-group-DShkYXO2.js";import"./page-state-BYBCycIs.js";import"./paginator-DbrXbhjN.js";import"./scaffold-D_SIXSFE.js";import"./secret-v_yDruc5.js";import"./select-dropdown-bvH3u27W.js";import"./select-DtfO4iOP.js";import"./skip-link-Clkvl2gQ.js";import"./slider-DiNsq51S.js";import"./split-view-jfrcLzMN.js";import"./stack-BuaXNRar.js";import"./stepper-BCF3BsrT.js";import"./table-usTH9Rkz.js";import"./tab-bar-DTxwJqo6.js";import"./time-picker-BhDeJ30s.js";import"./toast-CByq-LmW.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-Bfg-mkl4.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-3iNEGkZD.js";import"./split-button-xsIfqJIH.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
