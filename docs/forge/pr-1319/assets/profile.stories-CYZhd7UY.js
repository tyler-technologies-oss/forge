import{b as d}from"./iframe-BgRf1TIz.js";import{s as u,g as f}from"./utils-C-EU7_QI.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DIMt2wMW.js";import"./app-bar-menu-button-Ct0gHWkg.js";import"./app-bar-profile-button-ZJwJDMB3.js";import{I as g}from"./icon-BF2rMxkr.js";import"./menu-BWjOvr8h.js";import{a as E,b,c as C,d as y}from"./tyler-icons-_o7MAz4c.js";import"./linear-progress-BuMeIIdZ.js";import"./list-BguBqZQ5.js";import"./popover-CGb2usu3.js";import"./overlay-COLivfx5.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-C-3--dH7.js";import"./list-item-s49tr2Wv.js";import"./avatar-CreChVbB.js";import"./icon-button-DplwJpAj.js";import"./autocomplete-BmWVBsTI.js";import"./label-CpMUNpM9.js";import"./base-field-DLD_aOaf.js";import"./focus-indicator-Ddo_7foI.js";import"./text-field-MEI4fPKh.js";import"./backdrop-ngk7d2eo.js";import"./badge-DPF0JC0v.js";import"./banner-DMkZG2Kw.js";import"./bottom-sheet-UrJKR3RW.js";import"./dialog-fROW1iWI.js";import"./breadcrumb-overflow-menu-BPPisnZR.js";import"./button-area-DkDdpvUc.js";import"./button-toggle-group-k49QOIkr.js";import"./button-CnMjXOLQ.js";import"./calendar-CC46VsaJ.js";import"./card-CZw_lNnO.js";import"./checkbox-dejgc4dw.js";import"./chip-set-7VJtRl8L.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-DJXvpA6I.js";import"./date-picker-BkIurqKu.js";import"./date-range-picker-J74tJH7d.js";import"./divider-C5_Mh1Jj.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-CX5eiwQl.js";import"./open-icon-TppMAFMH.js";import"./file-picker-DJN8KjfT.js";import"./floating-action-button-pZWsD7VE.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-ChRaLj5a.js";import"./key-item-DvKfX1H3.js";import"./keyboard-shortcut-DveRArDR.js";import"./label-value-C0-wovkK.js";import"./listbox-C3kQ6OXv.js";import"./meter-group-DMShNQ59.js";import"./page-state-DvaZGddB.js";import"./paginator-BcSGc_vI.js";import"./process-stepper-CJf02Ccl.js";import"./radio-group-DV58pug7.js";import"./scaffold-Ca9xBuAs.js";import"./secret-CGdXzd0G.js";import"./option-HuS1C3qt.js";import"./select-dropdown-3pKvfPGW.js";import"./select-CRpjEf2r.js";import"./skip-link-C4Zcj1ZB.js";import"./slider-kMxioyHV.js";import"./split-view-DkJ3nz7o.js";import"./stack-BFYODGK6.js";import"./stepper-BAU3dDyU.js";import"./switch-DmcPrUFX.js";import"./table-B58Rwhk3.js";import"./tab-panel-BPbatE74.js";import"./time-picker-DbgPa_oW.js";import"./timestamp-DNL-_ucl.js";import"./toast-C0lgEQFI.js";import"./toolbar-C0s16xqk.js";import"./tooltip-BDLKK-c_.js";import"./tree-item-CbOEPZpo.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-DZMor45M.js";import"./split-button-ysr-GRyK.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
