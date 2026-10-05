import{b as d}from"./iframe-QHnGQDtP.js";import{s as u,g as f}from"./utils-BRc3IP6u.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Q1HGT5Uz.js";import"./app-bar-menu-button-Cxhb9IKE.js";import"./app-bar-profile-button-CFPQWuoF.js";import{I as g}from"./icon-BWWEOavI.js";import"./menu-CJCj9x9w.js";import{a as E,b,c as C,d as y}from"./tyler-icons-_o7MAz4c.js";import"./linear-progress-BuMeIIdZ.js";import"./list-DJaCZBbg.js";import"./popover-DPWANUhZ.js";import"./overlay-ByTJNYJL.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-BdK8ueUU.js";import"./list-item-Ddu71ZoD.js";import"./avatar-DosdD1FJ.js";import"./icon-button-2CdELZX7.js";import"./autocomplete-LQ8sTcZA.js";import"./label-C6PsXbDy.js";import"./base-field-DzunuqQH.js";import"./focus-indicator-Dgurg4EK.js";import"./text-field-DIiKAx27.js";import"./backdrop-ngk7d2eo.js";import"./badge-B4vlFk6b.js";import"./banner-CmPqjF52.js";import"./bottom-sheet-UYOMGK_e.js";import"./dialog-CWUQkKMT.js";import"./button-area-BEE2VWyK.js";import"./button-toggle-group-S7Pa65cF.js";import"./button-C0j7tAEZ.js";import"./calendar-3_lKxM_O.js";import"./card-BMRDEp9B.js";import"./checkbox-B1TSJwlE.js";import"./chip-set-CmRhRBs9.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-YsNCA6AW.js";import"./date-picker-BfkpwHAU.js";import"./date-range-picker-Bggc5owH.js";import"./divider-BRLcTfRH.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-BOjjiTze.js";import"./open-icon-DEd-bgbL.js";import"./file-picker-B7DHLXX4.js";import"./floating-action-button-cTWiIaA2.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-cGe-hmev.js";import"./key-item-e5LPquw-.js";import"./keyboard-shortcut-x3ntbjYJ.js";import"./label-value-C0-wovkK.js";import"./listbox-qdfVdpZd.js";import"./meter-group-DcpO6zio.js";import"./page-state-DvaZGddB.js";import"./paginator-D0B9rSMO.js";import"./process-stepper-G8j88njp.js";import"./radio-group-DBjwwdQv.js";import"./scaffold-Ca9xBuAs.js";import"./secret-PP1sN4BX.js";import"./option-Z4BKmanb.js";import"./select-dropdown-yArpPgI6.js";import"./select-Caj4LuHm.js";import"./skip-link-BrcEqJpl.js";import"./slider-DxNMbrrY.js";import"./split-view-C0s6abOt.js";import"./stack-Bd7iC-xk.js";import"./stepper-D301WCuz.js";import"./switch-WlqxXxRI.js";import"./table-o09BSKia.js";import"./tab-panel-ByVfF3md.js";import"./time-picker-C5RwO2gJ.js";import"./timestamp-CgJeJNh2.js";import"./toast-B_Jdhi5F.js";import"./toolbar-CI1IEgf3.js";import"./tooltip-WIBbVpRv.js";import"./tree-item-mlDOVy4J.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-CK9pwHd8.js";import"./split-button-CFEmczuV.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...l.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Zt=Object.freeze(Object.defineProperty({__proto__:null,Demo:m,WithCustomContent:l,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{m as D,Zt as P,l as W};
