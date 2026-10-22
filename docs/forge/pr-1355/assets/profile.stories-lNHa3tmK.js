import{b as d}from"./iframe-B2G4zKPj.js";import{s as u,g as f}from"./utils-2_OYILP2.js";import"./service-adapter-8tADcN_b.js";import"./accordion-RGp8mPk9.js";import"./app-bar-menu-button-Dg0OuAkc.js";import"./app-bar-profile-button-Feak5l3S.js";import{I as g}from"./icon-CzY8gUKj.js";import"./menu-DG9z46vu.js";import{a as E,b,c as C,d as y}from"./tyler-icons-6f2n3B-C.js";import"./linear-progress-BNAgl3n6.js";import"./list-CWBEI486.js";import"./popover-l-fAYctd.js";import"./overlay-DWH89yjz.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-HIoiQfSw.js";import"./list-item-Cy6LxyEf.js";import"./avatar-DkBn85xu.js";import"./icon-button-Dd9p4EqL.js";import"./autocomplete-Llo7YDQM.js";import"./label-D1p99XXI.js";import"./base-field-i1QPAbu6.js";import"./focus-indicator-bDn075UK.js";import"./text-field-CStdahpR.js";import"./backdrop-ngk7d2eo.js";import"./badge-fRwJYFgL.js";import"./banner-DDO6bPot.js";import"./bottom-sheet-CMrbJygg.js";import"./dialog-DoQxHo6b.js";import"./button-area-BCuUtls4.js";import"./button-toggle-group-DYu0eIwt.js";import"./button-CrQUc-I0.js";import"./calendar-BDLG8XWU.js";import"./card-DeaTEzB2.js";import"./checkbox-BAoyAqJd.js";import"./chip-set-CEmIH3lk.js";import"./state-layer-oVncPkRT.js";import"./circular-progress-BAYLkjmK.js";import"./color-picker-BBvykwO2.js";import"./date-picker-CwA54Kus.js";import"./date-range-picker-BA4jnfo9.js";import"./divider-Bq2uY91e.js";import"./base-drawer-CRoTqCXm.js";import"./drawer-B-CimXk8.js";import"./modal-drawer-CrxWsVl8.js";import"./mini-drawer-Bt5EnS2p.js";import"./expansion-panel-B3DguqGf.js";import"./open-icon-DI7x5dkm.js";import"./file-picker-BQzVOfoK.js";import"./floating-action-button-DR0locxF.js";import"./inline-message-XoyeymbY.js";import"./kbd-CqzH-ZC6.js";import"./key-item-DyJ-fk19.js";import"./keyboard-shortcut-CpNbfXPl.js";import"./label-value-C0-wovkK.js";import"./listbox-CSMOe6-m.js";import"./meter-group-DJf2_PRS.js";import"./page-state-DvaZGddB.js";import"./paginator-BWLFOZDN.js";import"./process-stepper-f6nhD94P.js";import"./radio-group-CSGkvXVs.js";import"./scaffold-Ca9xBuAs.js";import"./secret-Bntkjl2I.js";import"./option-group-CNQVuVA6.js";import"./select-dropdown-lAUiWRBT.js";import"./select-DXofdOy4.js";import"./skip-link-DmnI0S7d.js";import"./slider-zzop_Pan.js";import"./split-view-Ch3jCkrq.js";import"./stack-p3E4so40.js";import"./stepper-CHxbeSa3.js";import"./switch-DsxJTttj.js";import"./table-BHGAoQfB.js";import"./tab-panel-ALJksaB0.js";import"./time-picker-CzcPht0z.js";import"./timestamp-DnL64eQh.js";import"./toast-IEztLA5v.js";import"./toolbar-C4ep4NAp.js";import"./tooltip-DdRl_dqo.js";import"./tree-item-Bhiswv9K.js";import"./view-switcher-BSXTg3U6.js";import"./deprecated-icon-button-xCVUjACm.js";import"./split-button-DFZU8YjP.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
