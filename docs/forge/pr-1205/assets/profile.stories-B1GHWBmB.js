import{b as d}from"./iframe-BsWNYj34.js";import{s as u,g as f}from"./utils-DkXHK9oa.js";import"./service-adapter-8tADcN_b.js";import"./accordion-C6ao4EhU.js";import"./app-bar-menu-button-BTh7rlBG.js";import"./app-bar-profile-button-BN4iSukw.js";import{I as g}from"./icon-BUxeVNUp.js";import"./menu-Bh9SI4ea.js";import{a as E,b,c as C,d as y}from"./tyler-icons-D62AQmQV.js";import"./linear-progress-BuMeIIdZ.js";import"./list-DRNq441o.js";import"./popover-Dlk7E9HG.js";import"./overlay-Cf6QOhOg.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BlJfl3pU.js";import"./list-item-DedBsUVI.js";import"./avatar-DkcDFkeW.js";import"./icon-button-Csig8kiH.js";import"./autocomplete-Dm5z513T.js";import"./label-4k9r-Qn3.js";import"./base-field-DZXXPrI8.js";import"./focus-indicator-Bk7H1xfH.js";import"./text-field-BSJIXTpk.js";import"./backdrop-ngk7d2eo.js";import"./badge-C4OPzmQY.js";import"./banner-BGyv3iY1.js";import"./bottom-sheet-BEAK8IOK.js";import"./dialog-C4E5MayG.js";import"./button-area-B3IFehQI.js";import"./button-toggle-group-D9_VQRRc.js";import"./button-CtcS03YF.js";import"./calendar-BsymnUPU.js";import"./card-DkzXc1IY.js";import"./checkbox-CLo5fYIE.js";import"./chip-set-Bz3yABRx.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-H94OCY-1.js";import"./date-picker-DxEI2jHB.js";import"./date-range-picker-eK5w9-ib.js";import"./divider-Cmk3s280.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-BGJNt33U.js";import"./open-icon-IVeTfib_.js";import"./file-picker-BXfFNVfE.js";import"./floating-action-button-BDPUnYok.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-C44u2d7L.js";import"./key-item-BNwqht-o.js";import"./keyboard-shortcut-D8EYddO3.js";import"./label-value-C0-wovkK.js";import"./listbox-D4mRABlT.js";import"./meter-group-CtYb9oU0.js";import"./page-state-DvaZGddB.js";import"./paginator-BfqjPAY_.js";import"./process-stepper-HWDRv281.js";import"./radio-group-OYJH5zYu.js";import"./scaffold-Ca9xBuAs.js";import"./secret-Bbz0OcjG.js";import"./option-Cy1-rc0E.js";import"./select-dropdown-CZqsN6Fs.js";import"./select-HmDDw0Qu.js";import"./skip-link-BcgGo4hu.js";import"./slider-C2cLtmca.js";import"./split-view-YUDK9oYA.js";import"./stack-Bd7iC-xk.js";import"./stepper-BSiPPjLY.js";import"./switch-BRJRVWBB.js";import"./table-BER0ReRP.js";import"./tab-panel-DNZ73mhU.js";import"./time-picker-C9NkIxOM.js";import"./timestamp-CnvbvGtP.js";import"./toast-JEv--8LH.js";import"./toolbar-M4wgHqgc.js";import"./tooltip-vxqZR3qG.js";import"./tree-item-Dh9RQzK9.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-BkVtAq31.js";import"./split-button-BrWekVhd.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
