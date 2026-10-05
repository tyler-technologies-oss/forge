import{b as d}from"./iframe-Q5Y6f9_2.js";import{s as u,g as f}from"./utils-CMQDsowF.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DsiFsvkS.js";import"./app-bar-menu-button-DYxVzecB.js";import"./app-bar-profile-button-eSQkBmGF.js";import{I as g}from"./icon-CCxVJeCf.js";import"./menu-mGzVzeq9.js";import{a as E,b,c as C,d as y}from"./tyler-icons-_o7MAz4c.js";import"./linear-progress-BuMeIIdZ.js";import"./list-Dipdj3Cz.js";import"./popover-B4mnVz4Z.js";import"./overlay-BkGC6i7p.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-Btc2_5ZV.js";import"./list-item-i9N1Pjln.js";import"./avatar-CPZHKmQP.js";import"./icon-button-btwNpeCp.js";import"./autocomplete-DLYTm6mI.js";import"./label-DixtrICL.js";import"./base-field-Du0AVBZp.js";import"./focus-indicator-DqJ5p9rG.js";import"./text-field-BbVn4awb.js";import"./backdrop-ngk7d2eo.js";import"./badge-DN88PClb.js";import"./banner-mUSVEBV8.js";import"./bottom-sheet-CWEsHpPT.js";import"./dialog-swqg_AKW.js";import"./button-area-_0uCXhu3.js";import"./button-toggle-group-B2fbgfyH.js";import"./button-pGUTgqOB.js";import"./calendar-KYt-9WCq.js";import"./card-BwLVvmyQ.js";import"./checkbox-DITcLgty.js";import"./chip-set-4Bsltn7F.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-D9AsMNpU.js";import"./date-picker-CIzTfNQa.js";import"./date-range-picker-lkUwa_qg.js";import"./divider-BzO45Rfk.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-eoaNWshX.js";import"./open-icon-CYa-Pieg.js";import"./file-picker-CoPvQztK.js";import"./floating-action-button-CAm3VVGh.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-DK7slNqD.js";import"./key-item-RC6OGVFD.js";import"./keyboard-shortcut-5eW5h7Wb.js";import"./label-value-C0-wovkK.js";import"./listbox-CyjuQ-Id.js";import"./meter-group-BB-xqn_Y.js";import"./page-state-DvaZGddB.js";import"./paginator-BjBrK1ug.js";import"./process-stepper-B5ZymMN5.js";import"./radio-group-DRy0HhkU.js";import"./scaffold-Ca9xBuAs.js";import"./secret-CPislPO4.js";import"./option-9FimUq1N.js";import"./select-dropdown-Dv9OLqVG.js";import"./select-DQTlfzNb.js";import"./skip-link-5wLVTjaA.js";import"./slider-BlO9Kr_M.js";import"./split-view-MYGMgNqo.js";import"./stack-Bd7iC-xk.js";import"./stepper-BFoHUQjg.js";import"./switch-B5RV0qPG.js";import"./table-DlfEz7Nv.js";import"./tab-panel-B-I8yLbg.js";import"./time-picker-B4PLeshn.js";import"./timestamp-BVqqpi7b.js";import"./toast-CtJuwt_N.js";import"./toolbar-BAqfK8WK.js";import"./tooltip-DV18Ft3B.js";import"./tree-item-D9KV4ZT8.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-CbSH_EdX.js";import"./split-button-CBpOngS1.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
