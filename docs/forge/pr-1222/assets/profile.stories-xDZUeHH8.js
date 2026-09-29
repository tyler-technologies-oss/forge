import{b as d}from"./iframe-B0EMVDc7.js";import{s as u,g as f}from"./utils-Dx9-RsVp.js";import"./service-adapter-8tADcN_b.js";import"./accordion-D1RrxDFN.js";import"./app-bar-menu-button-Bz0TYTpE.js";import"./app-bar-profile-button-DqfWQLzf.js";import{I as g}from"./icon-C1AADWlB.js";import"./menu-DW_0Y_u0.js";import{a as E,b,c as C,d as y}from"./tyler-icons-BSgf1RSL.js";import"./linear-progress-kQO48laS.js";import"./list-B3Ua5Jq9.js";import"./popover-Dj3mHcTQ.js";import"./overlay-BiMQPje5.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-O3NFwJYz.js";import"./list-item-CqtgjLMz.js";import"./avatar-AChA-iGf.js";import"./icon-button-Cfus7nrp.js";import"./autocomplete-B8jvGsfm.js";import"./label-BHpjXJmF.js";import"./base-field-CMhue0TG.js";import"./focus-indicator-fOfraOtv.js";import"./text-field-DN9Z-9eu.js";import"./backdrop-C9lBlb_d.js";import"./badge-CN80SK-J.js";import"./banner-C4v5XUfQ.js";import"./bottom-sheet-CsQM36u3.js";import"./dialog-B49nv5T6.js";import"./button-area-biIIUdah.js";import"./button-toggle-group-DzAS1uKv.js";import"./button-RIwWqmi5.js";import"./calendar-DNEltBVj.js";import"./card-B9NJkrSg.js";import"./checkbox-yyje2zEv.js";import"./chip-set-H6KnpuyL.js";import"./state-layer-CZIH5add.js";import"./circular-progress-CfoxEQ_B.js";import"./color-picker-uVY3aJj4.js";import"./date-picker-nbIUfbVQ.js";import"./date-range-picker-CTTR5TRs.js";import"./divider-tMnvnZGL.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-6XaMN4pJ.js";import"./modal-drawer-B7CU3QM4.js";import"./mini-drawer-Dj8wQkgb.js";import"./expansion-panel-DClQKHR4.js";import"./open-icon-DSbPGXzC.js";import"./file-picker-BQLlgw9k.js";import"./floating-action-button-CcjKNsdt.js";import"./inline-message-BKecgmUf.js";import"./kbd-CZEuOVAY.js";import"./key-item-6yo2kGKT.js";import"./keyboard-shortcut-B9jrniMA.js";import"./label-value-06gdOjV6.js";import"./meter-group-Dxd_fGqH.js";import"./page-state-DdcxjGPv.js";import"./paginator-C-vyTGRR.js";import"./radio-group-C10pj7zM.js";import"./scaffold-ua4VSBPI.js";import"./secret-BKCcA-zi.js";import"./select-dropdown-DwPtBLXn.js";import"./select-B3GuSeL7.js";import"./skip-link-dSW92KEQ.js";import"./slider-DMDnbkvA.js";import"./split-view-B4uEhJlG.js";import"./stack-CzasDS03.js";import"./stepper-DbRGIBUg.js";import"./switch-D4wIiIi5.js";import"./table-DNoePop1.js";import"./tab-panel-Ddv_7U3S.js";import"./time-picker-D8uHPrVR.js";import"./timestamp-DgiUGxoy.js";import"./toast-CMlUQiX1.js";import"./toolbar-D8HmtTbd.js";import"./tooltip-DvlG9nEu.js";import"./tree-item-iLmI6ls2.js";import"./view-switcher-B1N5uMXB.js";import"./deprecated-icon-button-BAyFHASl.js";import"./split-button-bdjXLNDL.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
