import{b as d}from"./iframe-C2tbTTep.js";import{s as u,g as f}from"./utils-Bsdkh331.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Dex9s6oc.js";import"./app-bar-menu-button-Dv89AzoJ.js";import"./app-bar-profile-button-CxUC0AC5.js";import{I as g}from"./icon-BUL8G3Nr.js";import"./menu-DDzOkKJ8.js";import{a as E,b,c as C,d as y}from"./tyler-icons-Bg2kTxF-.js";import"./linear-progress-BuMeIIdZ.js";import"./list-lEXLfzM5.js";import"./popover-DaBw5jPK.js";import"./overlay-BFhhKY6N.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-oYJB8r8o.js";import"./list-item-CwupyuZA.js";import"./avatar-qkOuDDm8.js";import"./icon-button-D2ZGiyZb.js";import"./autocomplete-ejxYiiyg.js";import"./label-VJX2jvbl.js";import"./base-field-sIYoBuEj.js";import"./focus-indicator-CBGjEHrW.js";import"./text-field-CFvYacqU.js";import"./backdrop-ngk7d2eo.js";import"./badge-B8gPrdQh.js";import"./banner-Jkss_ToJ.js";import"./bottom-sheet-Qv3G1Hjw.js";import"./dialog-yWvAyi9a.js";import"./breadcrumb-overflow-menu-CbYO1wM6.js";import"./button-area-uZqknXUf.js";import"./button-toggle-group-oelG3Sfq.js";import"./button-DHMiuwIf.js";import"./calendar-CL68f913.js";import"./card-BOATGnnB.js";import"./checkbox-D0WGSCc8.js";import"./chip-set-BaIeaMS7.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-BBoJAPiq.js";import"./date-picker-O6umjSMV.js";import"./date-range-picker-Dz8sZ8k9.js";import"./divider-CVzHyOiX.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-dTxW9VbA.js";import"./open-icon-B-eBDTYX.js";import"./file-picker-_hSrJktI.js";import"./floating-action-button-DP5Tz7Et.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-js5FatP2.js";import"./key-item-R1lbac8s.js";import"./keyboard-shortcut-h7SzJYSg.js";import"./label-value-C0-wovkK.js";import"./listbox-BkREhwWi.js";import"./meter-group-CWeAkSzY.js";import"./page-state-DvaZGddB.js";import"./paginator-C6edBCYG.js";import"./process-stepper-B9TRWvUF.js";import"./radio-group-xvIg_W1w.js";import"./scaffold-Ca9xBuAs.js";import"./secret-CHLaeqqW.js";import"./option-RXBRoJSW.js";import"./select-dropdown-DZwK_Q-1.js";import"./select-BW_PIRnz.js";import"./skip-link-BifsULf1.js";import"./slider-NgJ36A-Z.js";import"./split-view-DlRgvNWG.js";import"./stack-DUezg1vg.js";import"./stepper-DDt15hYu.js";import"./switch-DX2tWfi7.js";import"./table-CcK-PIGY.js";import"./tab-panel-CoV6V2gV.js";import"./time-picker-CpXuqsdK.js";import"./timestamp-JEFwdOui.js";import"./toast-CNro4A1A.js";import"./toolbar-CmpNhgJf.js";import"./tooltip-DJjJ4Er1.js";import"./tree-item-DFwL2k8E.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-Beh0wUW9.js";import"./split-button-DcIKgGxW.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...l.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],te=Object.freeze(Object.defineProperty({__proto__:null,Demo:m,WithCustomContent:l,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{m as D,te as P,l as W};
