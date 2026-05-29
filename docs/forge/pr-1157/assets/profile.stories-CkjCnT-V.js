import{b as d}from"./iframe-MktPgWAA.js";import{s as u,g as f}from"./utils-C6q7qu_A.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Fy378HAt.js";import"./app-bar-profile-button-1elBJCcS.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-0-ZTEdj-.js";import"./menu-j1XxUNlP.js";import"./linear-progress-BmTkV8LG.js";import"./list-DgmFnUWQ.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-B84cpUiy.js";import"./icon-button-DJuSwMyH.js";import"./focus-indicator-C22xxO9c.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-B80xgOIJ.js";import"./label-Dsxzj2Q9.js";import"./button-CLmWBSd0.js";import"./button-toggle-group-CWHFPTny.js";import"./checkbox-DL9PJXu7.js";import"./switch-B9Ie-WGO.js";import"./base-field-AnwAwN2s.js";import"./text-field-CiiLUOIM.js";import"./backdrop-B-u3npFo.js";import"./badge-Dr5HatVf.js";import"./banner-BWYfQXcP.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-DvUgWqwd.js";import"./calendar-B-ceHf0O.js";import"./card-BmiOFj5P.js";import"./chip-set-BhMlB6zT.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-B7JDJbop.js";import"./date-picker-Cj_iAMyL.js";import"./date-range-picker-jaXRNd3W.js";import"./divider-DTjwMswR.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-DTtFpcfh.js";import"./open-icon-CHtGuw8k.js";import"./file-picker-DtAvtFBu.js";import"./floating-action-button-BwHSFqa3.js";import"./inline-message-rggUpLwV.js";import"./key-item-XH5wH2Ns.js";import"./keyboard-shortcut-DCGX6Hgb.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-BZBIcKbn.js";import"./page-state-B9wnmWpA.js";import"./paginator-BbWm05Rp.js";import"./scaffold-ALuq0Bgn.js";import"./secret-B3wB5k3u.js";import"./select-dropdown-81N8fl6D.js";import"./select-D7ZINvKO.js";import"./skip-link-DyHbneMa.js";import"./slider-Ca9nWQqy.js";import"./split-view-iaZI9VNa.js";import"./stack-DGYl-onA.js";import"./stepper-K87uGn21.js";import"./table-Ck2SRI76.js";import"./tab-bar-AkVqEWzv.js";import"./time-picker-DivAWA06.js";import"./toast-ETr2DTlu.js";import"./toolbar-DpB4c-Z2.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-ClL9IVgo.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-x7a_m4G_.js";import"./split-button-C697An96.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
