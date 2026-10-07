import{b as d}from"./iframe-Doaa3Kdk.js";import{s as u,g as f}from"./utils-C8_-3lrC.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Dq6gaTuh.js";import"./app-bar-menu-button-BI3-6Nbs.js";import"./app-bar-profile-button-CYjUw1jw.js";import{I as g}from"./icon-ozIZoPIz.js";import"./menu-CX3Zlgon.js";import{a as E,b,c as C,d as y}from"./tyler-icons-NVf08gHb.js";import"./linear-progress-BuMeIIdZ.js";import"./list-BGzEP44Z.js";import"./popover-K4jtrW_G.js";import"./overlay-DNJXwLw8.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-CC97axfM.js";import"./list-item-MbhLyvqr.js";import"./avatar-dCcjkuLa.js";import"./icon-button-Ck8_ypsD.js";import"./autocomplete-D7k4YWRD.js";import"./label-BOpEXGDh.js";import"./base-field-DX5e91B5.js";import"./focus-indicator-D4pryyUP.js";import"./text-field-CNwTSEf7.js";import"./backdrop-ngk7d2eo.js";import"./badge-CM5voPsO.js";import"./banner-CofdR0KH.js";import"./bottom-sheet-CH7RXbzd.js";import"./dialog-B2ssQpdh.js";import"./breadcrumb-overflow-menu-D1b5zGow.js";import"./button-area-DtLpw-_5.js";import"./button-toggle-group-BJqA20sx.js";import"./button-BsMnzWz3.js";import"./calendar-VPeJtWAd.js";import"./card-DwPfAMk0.js";import"./checkbox-CRSkxL3h.js";import"./chip-set-D-lmWwOv.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-DRYwZzHk.js";import"./date-picker-BJpOYU92.js";import"./date-range-picker-DP3OJrfb.js";import"./divider-JZ_ptvWl.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-BBWAoecH.js";import"./open-icon-CFItYUrW.js";import"./file-picker-C0K8SsId.js";import"./floating-action-button-BwAR3kUn.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-BkP6kXGa.js";import"./key-item-B7WUakp2.js";import"./keyboard-shortcut-CEKCD8s9.js";import"./label-value-C0-wovkK.js";import"./listbox-BBVim-EX.js";import"./meter-group-CgQ7-Ky0.js";import"./page-state-DvaZGddB.js";import"./paginator-DIauSFAN.js";import"./process-stepper-C-Zo0kfd.js";import"./radio-group-DHeoS_Gf.js";import"./scaffold-Ca9xBuAs.js";import"./secret-DLIvxLGQ.js";import"./option-BwVWcwOm.js";import"./select-dropdown-CdUODfb8.js";import"./select-CJ6dOpu1.js";import"./skip-link-C_GLmhdr.js";import"./slider-BiBjMheJ.js";import"./split-view-B56sc0LN.js";import"./stack-BAhihQL5.js";import"./stepper-BbWX5NT7.js";import"./switch-BNgZHKR-.js";import"./table-Dg2XF4pw.js";import"./tab-panel-BQs--9ZD.js";import"./time-picker-CraE9zB1.js";import"./timestamp-DlemHXde.js";import"./toast-_AgZqPeU.js";import"./toolbar-CTtntFiQ.js";import"./tooltip-BZoCBE_e.js";import"./tree-item--Oih3Grz.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-BcaXIqLC.js";import"./split-button-DN6FTMHy.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
