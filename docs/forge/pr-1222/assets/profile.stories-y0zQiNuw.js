import{b as d}from"./iframe-Dql2U7ym.js";import{s as u,g as f}from"./utils-Dx9-RsVp.js";import"./service-adapter-8tADcN_b.js";import"./accordion-B5b4KX8c.js";import"./app-bar-menu-button-DpQdu7bU.js";import"./app-bar-profile-button-C051y7LE.js";import{I as g}from"./icon-BQY5G9aX.js";import"./menu-mRwpImnh.js";import{a as E,b,c as C,d as y}from"./tyler-icons-BSgf1RSL.js";import"./linear-progress-kQO48laS.js";import"./list-6il26rgh.js";import"./popover-C21Z74UF.js";import"./overlay-NF8Tg9gz.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-ywBvlsHe.js";import"./list-item-h7d83OmT.js";import"./avatar-BhZnE0ad.js";import"./icon-button-CsrN_6vz.js";import"./autocomplete-whSP2lol.js";import"./label-PohRN3hn.js";import"./base-field-CajsbtNg.js";import"./focus-indicator-C82PZry3.js";import"./text-field-CHgjtMN3.js";import"./backdrop-C9lBlb_d.js";import"./badge-CwUcz7YW.js";import"./banner-o69sFFmy.js";import"./bottom-sheet-JTaAAo4i.js";import"./dialog-L6C-FO8i.js";import"./button-area-CC0Xeg7s.js";import"./button-toggle-group-DjXa17v_.js";import"./button-B_lbOGzp.js";import"./calendar-CPbT5bJY.js";import"./card-8wX2RMbV.js";import"./checkbox-DmjikLZ6.js";import"./chip-set-BA6lcYQV.js";import"./state-layer-CZIH5add.js";import"./circular-progress-CfoxEQ_B.js";import"./color-picker-CxSbA9Md.js";import"./date-picker-a4qMlLCi.js";import"./date-range-picker-bUMkzM5Q.js";import"./divider-ByX1qgHg.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-6XaMN4pJ.js";import"./modal-drawer-B7CU3QM4.js";import"./mini-drawer-Dj8wQkgb.js";import"./expansion-panel-7zvknYhH.js";import"./open-icon-CnA43KCZ.js";import"./file-picker-DAVSGpkw.js";import"./floating-action-button-DeBEUWDY.js";import"./inline-message-BKecgmUf.js";import"./kbd-DB4mi8QB.js";import"./key-item-miAsJtTM.js";import"./keyboard-shortcut-Bij-xdTW.js";import"./label-value-06gdOjV6.js";import"./meter-group-C4GtroT0.js";import"./page-state-DdcxjGPv.js";import"./paginator-COWBoi0I.js";import"./radio-group-Bi9mu56L.js";import"./scaffold-ua4VSBPI.js";import"./secret-CY11vgXI.js";import"./select-dropdown-BZ17yLTC.js";import"./select-D_aVGHPB.js";import"./skip-link-DPrijJfM.js";import"./slider-baYGc-B5.js";import"./split-view-up9wDy2R.js";import"./stack-CzasDS03.js";import"./stepper-hmiprVGU.js";import"./switch-y3R_rla-.js";import"./table-CoglVQmR.js";import"./tab-panel-BiVUImSy.js";import"./time-picker-DAN7VozQ.js";import"./timestamp-BpD9Gr_v.js";import"./toast-YSXWxT0V.js";import"./toolbar-B_BYwz5U.js";import"./tooltip-DEr-sMn6.js";import"./tree-item-BC6OpDWV.js";import"./view-switcher-B1N5uMXB.js";import"./deprecated-icon-button-Y-84y7oW.js";import"./split-button-Bl7lvKxh.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
