import{b as d}from"./iframe-Bsuj_4wG.js";import{s as u,g as f}from"./utils-Bq4aulu2.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DaTLEUTh.js";import"./app-bar-menu-button-DpoLaQIC.js";import"./app-bar-profile-button-CO2AmyjA.js";import{I as g}from"./icon-CCr3iGf2.js";import"./menu-DqZ1Hh63.js";import{a as E,b,c as C,d as y}from"./tyler-icons-_o7MAz4c.js";import"./linear-progress-BuMeIIdZ.js";import"./list-B2ijZ_Q_.js";import"./popover-kdG4uISC.js";import"./overlay-BB4_WJc7.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-DHgAi1uJ.js";import"./list-item-D2ojZ1MM.js";import"./avatar-B4t4XLFH.js";import"./icon-button-BRi3tEJf.js";import"./autocomplete-CgOLJLNs.js";import"./label-nfa9NigO.js";import"./base-field-CUFB2h0Q.js";import"./focus-indicator-6vgszVnP.js";import"./text-field-DQXkglfR.js";import"./backdrop-ngk7d2eo.js";import"./badge-DLX7a0ZJ.js";import"./banner-Bv53ZhXP.js";import"./bottom-sheet-CmW01Z9T.js";import"./dialog-CnmiEdKB.js";import"./breadcrumb-overflow-menu-Cl5SGDrd.js";import"./button-area-Bf0x-DkD.js";import"./button-toggle-group-C7kUS4VZ.js";import"./button-DnKmUXer.js";import"./calendar-DFyvcgXc.js";import"./card-CMjIWlyF.js";import"./checkbox-DjJxQCjO.js";import"./chip-set-B4QbOjkj.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-DNGuWfOK.js";import"./date-picker-Dfkdf_6u.js";import"./date-range-picker-CBhon4cj.js";import"./divider-BiWkrst8.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-0TrCyGiO.js";import"./open-icon-B_dytjnf.js";import"./file-picker-CDDXyOWq.js";import"./floating-action-button-DUinKX0l.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-7nncIk_l.js";import"./key-item-4scF8sNv.js";import"./keyboard-shortcut-Cz2iaOHZ.js";import"./label-value-C0-wovkK.js";import"./listbox-DgEpk-G8.js";import"./meter-group-BwQoaRQJ.js";import"./page-state-DvaZGddB.js";import"./paginator-CVwh3Fmf.js";import"./process-stepper-CkE60wRe.js";import"./radio-group-zUU4DfxE.js";import"./scaffold-Ca9xBuAs.js";import"./secret-Bl5efnHT.js";import"./option-iajmwKnE.js";import"./select-dropdown-CyX48eTV.js";import"./select-B9w2iZQH.js";import"./skip-link-CKaPuHtE.js";import"./slider-BJ6MFRQe.js";import"./split-view-X0Bh_3EC.js";import"./stack-CUiSSWZj.js";import"./stepper-CxjOx7FR.js";import"./switch-BJU9dA3M.js";import"./table-1SWIwa4y.js";import"./tab-panel-DAdRk1l2.js";import"./time-picker-B05yCVhA.js";import"./timestamp-C7iP3OzQ.js";import"./toast-DQAMOmsq.js";import"./toolbar-Dwjr8kfj.js";import"./tooltip-BUZUYzwW.js";import"./tree-item-BFiDl7Kw.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-sTHrW3Zv.js";import"./split-button-C7cJupcU.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
