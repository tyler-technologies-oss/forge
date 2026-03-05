import{b as d}from"./iframe-B_EPTatV.js";import{s as u,g as f}from"./utils-BUOWcVje.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-BmDSuovC.js";import"./expansion-panel-gMXAXjxL.js";import"./open-icon-DrWvebNv.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-CmDriE6l.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-B4xXB1kz.js";import"./menu-BcJc7hM8.js";import"./linear-progress-CdLostcG.js";import"./list-PZUn4syt.js";import"./popover-C9ytRj8r.js";import"./overlay-BayhLl23.js";import"./skeleton-pRzfknAa.js";import"./avatar-Ba66sh6a.js";import"./icon-button-Dkrov9e0.js";import"./focus-indicator-B6DsizqW.js";import"./state-layer-n7PzpGlA.js";import"./autocomplete-GyCzMDE0.js";import"./label-CxbNeDya.js";import"./button-C9EdhuMP.js";import"./button-toggle-group-CSyLmzsf.js";import"./checkbox-BX3_i02m.js";import"./switch-BqZ88lwZ.js";import"./base-field-BYUC_oyN.js";import"./text-field-Cg-Ph0uy.js";import"./backdrop-C92f0qEt.js";import"./badge-BowbXbpI.js";import"./banner-CKjrFAmR.js";import"./bottom-sheet-C3I4Q7_b.js";import"./dialog-6H06GjyS.js";import"./button-area-LAuaAr6f.js";import"./calendar-BPKrpaEt.js";import"./card-_CegzURb.js";import"./chip-set-DC7ER8Tg.js";import"./circular-progress-Bjkv8PLj.js";import"./color-picker-qaeGPW9n.js";import"./date-picker-Gkjm58Xr.js";import"./date-range-picker-DMgdyf9D.js";import"./divider-B0lv7rW8.js";import"./base-drawer-CehscPHD.js";import"./drawer-wD-VciIb.js";import"./modal-drawer-BeSECNts.js";import"./mini-drawer-DAoV4H3z.js";import"./file-picker-iP2WifmW.js";import"./floating-action-button-DKtq_1uY.js";import"./inline-message-9zvVMjFA.js";import"./key-item-b48_0zm3.js";import"./keyboard-shortcut-BkmFWtpY.js";import"./label-value-CW81Czz-.js";import"./meter-group-gWbH_LTU.js";import"./page-state-Cg6BV8eb.js";import"./paginator-Db7pzfGH.js";import"./scaffold-cHzeNvE0.js";import"./select-dropdown-CkA16L-s.js";import"./select-B41K0D2P.js";import"./skip-link-DvlqA0Fh.js";import"./slider-BeZdc4AW.js";import"./split-view-BreZ-jiq.js";import"./stack-4trrgLzF.js";import"./stepper-Cn6Wpu9I.js";import"./table-qXWF0Anl.js";import"./tab-bar-BJfofAK1.js";import"./time-picker-s0RQSPVE.js";import"./toast-CbqduD09.js";import"./toolbar-C0v5iIUr.js";import"./tooltip-Csbspw17.js";import"./tree-item-CWpohSXK.js";import"./view-switcher-FtobpJhv.js";import"./deprecated-icon-button-Cb2kTmZH.js";import"./split-button-BpDxUCCg.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Ht=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Ht as P,m as W};
