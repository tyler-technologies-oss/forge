import{b as d}from"./iframe-OKJOnn65.js";import{s as u,g as f}from"./utils-DqCQojVn.js";import"./service-adapter-8tADcN_b.js";import"./accordion-1Wb_5jme.js";import"./app-bar-menu-button-C5Ej8WRa.js";import"./app-bar-profile-button-CmW-_7h2.js";import{I as g}from"./icon-kMesbXGR.js";import"./menu-S-LzcTKH.js";import{a as E,b,c as C,d as y}from"./tyler-icons-_o7MAz4c.js";import"./linear-progress-BuMeIIdZ.js";import"./list-DniZS3dz.js";import"./popover-BMhk1re9.js";import"./overlay-9hcj7XWo.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-BCR8jCNf.js";import"./list-item-NCG5mfvg.js";import"./avatar-BD9OiFwz.js";import"./icon-button-NPCdlZc1.js";import"./autocomplete-CWDXghWg.js";import"./label-Bl7KteXW.js";import"./base-field-CUfsciqC.js";import"./focus-indicator-CILpCuRH.js";import"./text-field-Bd9kQUjl.js";import"./backdrop-ngk7d2eo.js";import"./badge-D7ByaKb1.js";import"./banner-Dj_yicYL.js";import"./bottom-sheet-C_13ai4K.js";import"./dialog-Bk_ymvZl.js";import"./button-area-DEc-Y5NJ.js";import"./button-toggle-group-DaSyTry0.js";import"./button-JBPpIXzS.js";import"./calendar-DiKz6ASn.js";import"./card-DIztIszQ.js";import"./checkbox-C8C3ZEET.js";import"./chip-set-BjblqTHO.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-BRkTX426.js";import"./date-picker-9TMg5NlR.js";import"./date-range-picker-CRU5UBGP.js";import"./divider-C7NPqQ_p.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-CaXumgMV.js";import"./open-icon-DQO8ZpC6.js";import"./file-picker-DDbL7eje.js";import"./floating-action-button-BswSsqCa.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-BYOFOnuE.js";import"./key-item-DtrNivLq.js";import"./keyboard-shortcut-PHWl3_TT.js";import"./label-value-C0-wovkK.js";import"./listbox-DkEwpF-v.js";import"./meter-group-C0XHcbF1.js";import"./page-state-DvaZGddB.js";import"./paginator-Du_WMkyQ.js";import"./process-stepper-DWmT4YH7.js";import"./radio-group-ChPOIDQB.js";import"./scaffold-Ca9xBuAs.js";import"./secret-Csuc8QZ7.js";import"./option-BIFfXZ-2.js";import"./select-dropdown-BUFtyu3X.js";import"./select-CYu1Y41G.js";import"./skip-link-DjYIvV0v.js";import"./slider-D-X1ZtdA.js";import"./split-view-R8xqalnw.js";import"./stack-BNz3vfmV.js";import"./stepper-DbtBrf1W.js";import"./switch-BhTs4Wa_.js";import"./table-6j8XgImK.js";import"./tab-panel-C-4sLZyC.js";import"./time-picker-CBuR4WRJ.js";import"./timestamp-6Xy2Capg.js";import"./toast-vKxcNGGA.js";import"./toolbar-DuLLCExW.js";import"./tooltip-Brrj6zMM.js";import"./tree-item-ueSn6bxD.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-CpreS6D-.js";import"./split-button-B9U9XQqs.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
