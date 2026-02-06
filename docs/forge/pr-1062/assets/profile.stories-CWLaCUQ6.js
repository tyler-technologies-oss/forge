import{b as d}from"./iframe-DdIHyASQ.js";import{s as u,g as f}from"./utils-CahvXhhw.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-BbIQ9d_o.js";import"./expansion-panel-D1y0KEEj.js";import"./open-icon-BK25xsdk.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-Bqc_fXik.js";import"./state-layer-u9rLNX9t.js";import"./focus-indicator-uodH7OpA.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-B0WPf66k.js";import"./menu-YVmc8C5m.js";import"./linear-progress-CsYLd0m5.js";import"./list-BUAyRRaS.js";import"./popover-oAFRtu_9.js";import"./overlay-BhwPRyah.js";import"./skeleton-DllEP8un.js";import"./avatar--XQgll8F.js";import"./icon-button-4Ugq7Vza.js";import"./autocomplete-DCbBWGo6.js";import"./label-D0awfgcq.js";import"./button-BicBGy8b.js";import"./button-toggle-group-CpmH90E6.js";import"./checkbox-DkUBqL33.js";import"./switch-jtBvLIJF.js";import"./base-field-CR62eHRX.js";import"./text-field-MOo4FAf4.js";import"./backdrop-ZqVEdIYI.js";import"./badge-CRt7zSJ4.js";import"./banner-wS4VpkEo.js";import"./bottom-sheet-DeyRABAG.js";import"./dialog-Dic_j1BD.js";import"./button-area-DMfOJJX-.js";import"./calendar-DYUGkwpT.js";import"./card-cHHft-TI.js";import"./chip-set-DvZSc5kk.js";import"./circular-progress-Ctu3rS_y.js";import"./color-picker-CnEeeBvF.js";import"./date-picker-BcnUol4f.js";import"./date-range-picker-CQKrHw2a.js";import"./divider-DtS4IZ9-.js";import"./base-drawer-DUX87HBk.js";import"./drawer-eo8EwIfW.js";import"./modal-drawer-BrDtoKSB.js";import"./mini-drawer-B6eLxgR7.js";import"./file-picker-NepK9WOd.js";import"./floating-action-button-dN4mmoWy.js";import"./inline-message-BmHmX7vQ.js";import"./key-item-DSN5puQy.js";import"./keyboard-shortcut-C5gmWfMz.js";import"./label-value-D-KSqHDU.js";import"./meter-group-CYr1w50N.js";import"./page-state-BU7mMB2L.js";import"./paginator-DZ0j5vHQ.js";import"./scaffold-B_qTjcmL.js";import"./select-dropdown-BKs-WjZ1.js";import"./select-CJzUOcWx.js";import"./skip-link-DWi9tiJS.js";import"./slider-BP9-rgm4.js";import"./split-view-BDGYzXgW.js";import"./stack-D2V5d6LJ.js";import"./stepper-BwwqaVCk.js";import"./table-Z6MF_nPv.js";import"./tab-bar-B64ExacE.js";import"./time-picker-DIAGdMvL.js";import"./toast-DlZtx6lb.js";import"./toolbar-BK4uxBaY.js";import"./tooltip-D8ywo7jr.js";import"./tree-item-BsRTlYL0.js";import"./view-switcher-BOebY1Oz.js";import"./deprecated-icon-button-CSKkaM1I.js";import"./split-button-Dz074bXH.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
