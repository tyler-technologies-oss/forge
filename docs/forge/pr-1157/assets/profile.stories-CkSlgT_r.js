import{b as d}from"./iframe-TV9XAvMj.js";import{s as u,g as f}from"./utils-BzaDkCLg.js";import"./service-adapter-8tADcN_b.js";import"./accordion--nfOL1O2.js";import"./app-bar-profile-button-DlEk9JLR.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DbetBFcH.js";import"./menu-DDhOX8zX.js";import"./linear-progress-BmTkV8LG.js";import"./list-CiW1kkYd.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-Blfnk1s_.js";import"./icon-button--NOIsf5y.js";import"./focus-indicator-9dYm11yZ.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-D2OAtmF8.js";import"./label-DF0EySA1.js";import"./button-NWWsfIKK.js";import"./button-toggle-group-Dok9C68H.js";import"./checkbox-DFyRkJoF.js";import"./switch-B11zG3es.js";import"./base-field-DHTLlkkA.js";import"./text-field-D4g4iwkK.js";import"./backdrop-B-u3npFo.js";import"./badge-CLsv49gK.js";import"./banner-CXpHPohl.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-DM_6_F4R.js";import"./calendar-DHnglAPv.js";import"./card-CiAkEZr5.js";import"./chip-set-CpjmwFSR.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-KrsAOypy.js";import"./date-picker-DpCvKUtN.js";import"./date-range-picker-CIWAwDou.js";import"./divider-CybbUVbI.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-Ho34_dpQ.js";import"./open-icon-CgVNkZ6Y.js";import"./file-picker-d6_NCGKN.js";import"./floating-action-button-CI2nXyzr.js";import"./inline-message-rggUpLwV.js";import"./key-item-DhoYhbH1.js";import"./keyboard-shortcut-DpkrgRTl.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-CVpWccEx.js";import"./page-state-B9wnmWpA.js";import"./paginator-DQu2xwmm.js";import"./scaffold-ALuq0Bgn.js";import"./secret-DIPYrx0Q.js";import"./select-dropdown-CE0Xdp0L.js";import"./select-r_u1mfaY.js";import"./skip-link-CsagLECr.js";import"./slider-BKV36bzD.js";import"./split-view-fdY652S8.js";import"./stack-DGYl-onA.js";import"./stepper-ZvYNLOo6.js";import"./table-DgyGrrns.js";import"./tab-bar-CVte6fK7.js";import"./time-picker-C3We4td2.js";import"./toast-BAKadwUy.js";import"./toolbar-Ce9HD0Yv.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-ChLbqBrl.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-8DIaw4AB.js";import"./split-button-CTccJ27K.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
