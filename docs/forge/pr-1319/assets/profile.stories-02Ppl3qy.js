import{b as d}from"./iframe-DTNkYg14.js";import{s as u,g as f}from"./utils-YYNEckME.js";import"./service-adapter-8tADcN_b.js";import"./accordion-EEhc-i9L.js";import"./app-bar-menu-button-D5YkSG_Z.js";import"./app-bar-profile-button-f3zVk6na.js";import{I as g}from"./icon-DVhmv0eN.js";import"./menu-Bl0m91vI.js";import{a as E,b,c as C,d as y}from"./tyler-icons-Bg2kTxF-.js";import"./linear-progress-BuMeIIdZ.js";import"./list-BdMAL8iF.js";import"./popover-CY5Ry9Cs.js";import"./overlay-iZgM2dxp.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-BaOIlBwe.js";import"./list-item-6yDHUfH_.js";import"./avatar-SbpAm0DU.js";import"./icon-button-CUU1GWio.js";import"./autocomplete-Cuq3TQUr.js";import"./label-DjcObiwP.js";import"./base-field-Cdf0dwgO.js";import"./focus-indicator-3EiKPbSh.js";import"./text-field-Be6g3VTz.js";import"./backdrop-ngk7d2eo.js";import"./badge-DvAoB_om.js";import"./banner-B4NKF44k.js";import"./bottom-sheet-p42obXmZ.js";import"./dialog-LplVWkyl.js";import"./breadcrumb-overflow-menu-BjwZwXCr.js";import"./button-area-seiXvS-i.js";import"./button-toggle-group-9ja3uLea.js";import"./button-X3pBuwRw.js";import"./calendar-BUXRvIbD.js";import"./card-F2PCVnMB.js";import"./checkbox-evezQi-A.js";import"./chip-set-Dl0Xf43W.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-wWppRo29.js";import"./date-picker-DOPRTY2B.js";import"./date-range-picker-nHVEo6h6.js";import"./divider-kzdg1MSU.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-wltvlIhI.js";import"./open-icon-C4_OLN1T.js";import"./file-picker-CYrUkBMK.js";import"./floating-action-button-njcs7fR9.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-BZLAS7Mi.js";import"./key-item-6zmQhDw2.js";import"./keyboard-shortcut-Y9aphNi9.js";import"./label-value-C0-wovkK.js";import"./listbox-DtstewWm.js";import"./meter-group-BXU9ej4x.js";import"./page-state-DvaZGddB.js";import"./paginator-8sAlXZnq.js";import"./process-stepper-DIr3_ubM.js";import"./radio-group-BSJ3dK2a.js";import"./scaffold-Ca9xBuAs.js";import"./secret-CuMGJHwr.js";import"./option-Dc7EVbrO.js";import"./select-dropdown-DMqgSGUd.js";import"./select-9m4CbelP.js";import"./skip-link-Cg7NjCqn.js";import"./slider-CdRCfW40.js";import"./split-view-XKJpo26S.js";import"./stack-BZ9L2zYz.js";import"./stepper-DVhAxsag.js";import"./switch-BiHjuj94.js";import"./table-D9TsrJLm.js";import"./tab-panel-CN_mU4KY.js";import"./time-picker-DTHpMCrc.js";import"./timestamp-C6Zzap8T.js";import"./toast-Co8DtpTf.js";import"./toolbar-CpplmqNI.js";import"./tooltip-Bgv5ULhC.js";import"./tree-item-CCtIJ6WB.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-CExO_p9w.js";import"./split-button-Dzc1SVMt.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
