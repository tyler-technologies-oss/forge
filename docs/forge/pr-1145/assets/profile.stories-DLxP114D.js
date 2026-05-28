import{b as d}from"./iframe-iI7vCRME.js";import{s as u,g as f}from"./utils-Brx6mRIm.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CYwoJ2nr.js";import"./app-bar-profile-button-DkVqSIh9.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-UwhQj35m.js";import"./menu-CoO6r1HU.js";import"./linear-progress-BmTkV8LG.js";import"./list-BUsqjfZg.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-BoJ7s1sZ.js";import"./icon-button-BVyqdVOA.js";import"./focus-indicator-BWYR6p2h.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-2B6r139X.js";import"./label-CQsjH8g4.js";import"./button-BqmJVrNJ.js";import"./button-toggle-group-CFfihWp2.js";import"./checkbox-CnBUkyRk.js";import"./switch--t3SDEji.js";import"./base-field-BJc23bAe.js";import"./text-field-VRyTBpea.js";import"./backdrop-B-u3npFo.js";import"./badge-CnOwzB7O.js";import"./banner-Bnurm0h3.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-Bs-5WVO-.js";import"./calendar-DebB8zDA.js";import"./card-B6dmVjSB.js";import"./chip-set-Fgj-0LSB.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-CaKKTN5a.js";import"./date-picker-ByRjx4Nz.js";import"./date-range-picker-D5BqVg6R.js";import"./divider-D8RyW1Mq.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-B48k-lVg.js";import"./open-icon-BVqx9kDE.js";import"./file-picker-BFs6qmbE.js";import"./floating-action-button-1hixytSz.js";import"./inline-message-rggUpLwV.js";import"./key-item-CplJgAfO.js";import"./keyboard-shortcut-D6AB_CRI.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-CIK1oHIZ.js";import"./page-state-B9wnmWpA.js";import"./paginator-DBb_3VSX.js";import"./scaffold-ALuq0Bgn.js";import"./secret-zr6582j5.js";import"./select-dropdown-BXaH-aYu.js";import"./select-BDdWAvyz.js";import"./skip-link-CvaWvy5z.js";import"./slider-C2fFaO2t.js";import"./split-view-6ekXfWt7.js";import"./stack-DGYl-onA.js";import"./stepper-lpCVovol.js";import"./table-P5gQgL8S.js";import"./tab-bar-C8KNATVp.js";import"./time-picker-BEguKJAm.js";import"./toast-CLD8vsKC.js";import"./toolbar-DUvH1SqL.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-D6uHP3_3.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-CtcNAxvq.js";import"./split-button-BK03fFXb.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],zt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,zt as P,m as W};
