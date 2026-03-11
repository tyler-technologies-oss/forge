import{b as d}from"./iframe-DGoJ1nOJ.js";import{s as u,g as f}from"./utils-DQ34OAOC.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DMbhM-ys.js";import"./app-bar-profile-button-DvUImR3J.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-JNKrLD-g.js";import"./menu-Dq9iuAq3.js";import"./linear-progress-DP1CUIRM.js";import"./list-CCUg2Cq5.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-D_lZwLCW.js";import"./icon-button-lFY3CnB1.js";import"./focus-indicator-VcUYsfiB.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-BnJh-uzG.js";import"./label-CMM9d_wI.js";import"./button-N89Sx3kH.js";import"./button-toggle-group-CFSiWMz_.js";import"./checkbox-BBeq_hsZ.js";import"./switch-Bm7MIFD1.js";import"./base-field-BQqHVraz.js";import"./text-field-DlBvbEi2.js";import"./backdrop-B_VtJyIN.js";import"./badge-DsjalJQN.js";import"./banner-jaCWRCdz.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-Dc40aCPp.js";import"./calendar-Qp1MDLGD.js";import"./card-DOHfN5Yw.js";import"./chip-set-DzU89uq6.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-DcKfZ-kt.js";import"./date-picker-Ckj3Desg.js";import"./date-range-picker-g7TsgCVY.js";import"./divider-D_YlOpYa.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-46Qrd-pr.js";import"./open-icon-MaY7KraM.js";import"./file-picker-CVMGh-Lg.js";import"./floating-action-button-C-pvUU6E.js";import"./inline-message-BK9gijHu.js";import"./key-item-B4uuCnA_.js";import"./keyboard-shortcut-Yjw9zQ29.js";import"./label-value-BE9wSmbi.js";import"./meter-group-CQwQowGj.js";import"./page-state-BYBCycIs.js";import"./paginator-DSiK4VwW.js";import"./scaffold-D_SIXSFE.js";import"./select-dropdown-D9K-ZfiH.js";import"./select-BKWHDGZZ.js";import"./skip-link-DAdvNWyw.js";import"./slider-CPq6Qqjn.js";import"./split-view-DVckXxqQ.js";import"./stack-BuaXNRar.js";import"./stepper-BGB4-kcP.js";import"./table-RX6vvyVP.js";import"./tab-bar-BHP75fiG.js";import"./time-picker-B6-1KOrb.js";import"./toast-__sn1v0m.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-CJyEoaTL.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-CvcXKUiE.js";import"./split-button-D6Glyg-E.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Ut=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Ut as P,m as W};
