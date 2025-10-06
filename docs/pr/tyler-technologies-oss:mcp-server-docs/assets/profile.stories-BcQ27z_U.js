import{x as c}from"./iframe-BWh0ylRO.js";import{g as u,s as f}from"./utils-BGeMI972.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-52DczsbS.js";import"./expansion-panel-CtPm9dI4.js";import"./index-5CPwzmQS.js";import"./app-bar-profile-button-CXC3nnKc.js";import"./state-layer-gAgMwMHF.js";import"./focus-indicator-DtQWBIt4.js";import{I as g,t as E,a as b,b as C,c as y}from"./icon-kuXwuZAY.js";import"./menu-BJtO8-eJ.js";import"./linear-progress-r0Hzg69v.js";import"./list-CTWTY-cx.js";import"./popover-BWVazmya.js";import"./overlay-B5pGv-rV.js";import"./skeleton-BSiuL_ME.js";import"./avatar-DgwyJj9R.js";import"./icon-button-B8-Z9yGD.js";import"./autocomplete-BpBxDCk0.js";import"./label-RXgsLOUX.js";import"./button-DDeQkqOF.js";import"./button-toggle-group-CURJMNh-.js";import"./checkbox-DkQufZq1.js";import"./switch-1M3hzpUW.js";import"./base-field-WcSKv63v.js";import"./text-field-CiVqNgE6.js";import"./backdrop-BDRZVysw.js";import"./badge-CaIlguPT.js";import"./banner-DkSnsYBr.js";import"./bottom-sheet-fU2YBxmJ.js";import"./dialog-Dkd2fYmF.js";import"./button-area-Bjes0M6Z.js";import"./calendar-Q767TzAh.js";import"./card-CiLfdVmE.js";import"./chip-set-BF7V0fbR.js";import"./circular-progress-_RSm0FGC.js";import"./color-picker-1uXv_roD.js";import"./date-picker-DuXlZbbX.js";import"./date-range-picker-BRZwkMUO.js";import"./divider-NNdF1g4c.js";import"./base-drawer-CyECteXI.js";import"./drawer-B9FH5M3o.js";import"./modal-drawer-DeyGxZKd.js";import"./mini-drawer-BWLlcDZ8.js";import"./file-picker-BnDo9Kwh.js";import"./floating-action-button-CoVHsSe0.js";import"./inline-message-e4Sp2zCL.js";import"./key-item-Mhs0rnQ2.js";import"./keyboard-shortcut-rXqqnOKl.js";import"./label-value-BluYnIAQ.js";import"./meter-group-NgldaP5o.js";import"./page-state-Cd_K1Ccr.js";import"./paginator-alpxszju.js";import"./scaffold-BrokB2Ba.js";import"./select-dropdown-patH1Dn-.js";import"./select-BV_0kZf9.js";import"./skip-link-DKVlwDUN.js";import"./slider-DkuadMEJ.js";import"./split-view-CVmgXVEl.js";import"./stack-Ca0GDYK5.js";import"./stepper-CH7bKLrn.js";import"./table-BP5ND-5B.js";import"./tab-bar-C2n5sEWO.js";import"./time-picker-D5L7Gt-1.js";import"./toast-UH356D6a.js";import"./toolbar-U0axkpKl.js";import"./tooltip-B59ljHGY.js";import"./view-switcher-BUh552L0.js";import"./deprecated-icon-button-CHhrRrFX.js";import"./split-button-Co7MM-Kw.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=d("forge-profile-card-profile"),h=d("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>c`
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
    `,component:s,argTypes:{...u({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},l={},m={...f,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.log("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return c`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    function builder() {
      const listElement = document.createElement('forge-list');
      listElement.addEventListener('forge-list-item-select', ({
        detail
      }) => {
        console.log('[profile-card] Selected custom item:', detail.value);
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
}`,...m.parameters?.docs?.source}}};const x=["Demo","WithCustomContent"],Ft=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:x,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Ft as P,m as W};
