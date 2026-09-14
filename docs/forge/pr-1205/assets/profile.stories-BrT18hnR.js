import{b as d}from"./iframe-BJPqycEt.js";import{s as u,g as f}from"./utils-CRT-IimF.js";import"./service-adapter-8tADcN_b.js";import"./accordion-uwz1aiXv.js";import"./app-bar-profile-button-CF4BOGc0.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DNkpPon9.js";import"./menu-CEHEj-7z.js";import"./linear-progress-C6Yw2NU-.js";import"./list-DgxEhhpR.js";import"./popover-DmcVXRTb.js";import"./overlay-Dzu_blL_.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-PcZLAGQ_.js";import"./avatar-5ILapoRQ.js";import"./icon-button-BZVzCxro.js";import"./focus-indicator-DFu3RSBr.js";import"./state-layer-BUK1_NC2.js";import"./autocomplete-B0fQFgbw.js";import"./label-iiA2WfmW.js";import"./base-field-BraIRaqt.js";import"./text-field-ClU7jdd4.js";import"./backdrop-DuggoVs4.js";import"./badge-DEiBWQE7.js";import"./banner-CryTB1Yh.js";import"./bottom-sheet-DAHF8E72.js";import"./dialog-kIOpZrZ0.js";import"./button-area-yXui8G8W.js";import"./button-toggle-group-BEwPe7Gg.js";import"./button-BRy-f3-q.js";import"./calendar-BJ-sv8r8.js";import"./card-N3qjjXm_.js";import"./checkbox-Os92ujye.js";import"./chip-set-BGTK1FJM.js";import"./circular-progress-DsGMumuf.js";import"./color-picker-BnAyJbh6.js";import"./date-picker-CtBEhIZX.js";import"./date-range-picker-3ymYQ553.js";import"./divider-BafjqDBo.js";import"./base-drawer-H_Vclf0e.js";import"./drawer-DkNif9Rq.js";import"./modal-drawer-De0rlrxt.js";import"./mini-drawer-CJIvvL-H.js";import"./expansion-panel-CPQPdK-O.js";import"./open-icon-CB3evKBE.js";import"./file-picker-B78ebjl0.js";import"./floating-action-button-2madmOeY.js";import"./inline-message-BBlUMEcD.js";import"./key-item-BsVsKizD.js";import"./keyboard-shortcut-Dwsc744x.js";import"./label-value-BKZYa59d.js";import"./listbox-BVpOTX7r.js";import"./meter-group-D6D0Q45k.js";import"./page-state-B2CTwiCg.js";import"./paginator-DBTmQAnU.js";import"./radio-group-B8JjHdri.js";import"./scaffold-DVCC5lGr.js";import"./secret-BTINAjOR.js";import"./select-dropdown-Ck9qPcd0.js";import"./select-DHZasYFw.js";import"./skip-link-BMvQ3avx.js";import"./slider-DaUGvJ2y.js";import"./split-view-CfAkaOuL.js";import"./stack-DIeJ-nuE.js";import"./stepper-CeWVIGAW.js";import"./switch-2tvk8uD3.js";import"./table-BqX3Ia3I.js";import"./tab-panel-BBP_DtIW.js";import"./time-picker-DjEXbTt6.js";import"./timestamp-CyHsgPRX.js";import"./toast-BebJOAAP.js";import"./toolbar-B851t6lS.js";import"./tooltip-2qibAw6I.js";import"./tree-item-C1MdXtBz.js";import"./view-switcher-B_53bUYO.js";import"./deprecated-icon-button-CZcz0erk.js";import"./split-button-BxWXE0G1.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],qt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,qt as P,m as W};
