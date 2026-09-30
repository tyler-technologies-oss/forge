import{b as d}from"./iframe-3UUTJgvy.js";import{s as u,g as f}from"./utils-BUwrw5lO.js";import"./service-adapter-8tADcN_b.js";import"./accordion-D5RbUHav.js";import"./app-bar-menu-button-1CiALXW3.js";import"./app-bar-profile-button-BLPqUQ1d.js";import{I as g}from"./icon-aW4TmUba.js";import"./menu-BT-lDu_m.js";import{a as E,b,c as C,d as y}from"./tyler-icons-CA7Bw7CG.js";import"./linear-progress-kQO48laS.js";import"./list-DJeCxiYa.js";import"./popover-CZN9KQv2.js";import"./overlay-C1VCwoHu.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DKwtbTm9.js";import"./list-item-Cur4DZAE.js";import"./avatar-CUDVkILd.js";import"./icon-button-Co9D746x.js";import"./autocomplete-HztifWZK.js";import"./label-B2Y1jFr3.js";import"./base-field-Cc5e0id5.js";import"./focus-indicator-DfyOOFaI.js";import"./text-field-BdKTgEWN.js";import"./backdrop-C9lBlb_d.js";import"./badge-BaKvZRLh.js";import"./banner-9CuVnbC5.js";import"./bottom-sheet-DYN7w_p5.js";import"./dialog-thBFnlfL.js";import"./button-area-BnmllXCK.js";import"./button-toggle-group-C4N3qzmg.js";import"./button-DH6t8nYG.js";import"./calendar-DY96ERvZ.js";import"./card-BOaGdFbO.js";import"./checkbox-B-mT5VdM.js";import"./chip-set-Dp3YObFi.js";import"./state-layer-CZIH5add.js";import"./circular-progress-CfoxEQ_B.js";import"./color-picker-CihbpsHu.js";import"./date-picker-AOt5O_WK.js";import"./date-range-picker-B-dNmH1m.js";import"./divider-BI9tW1qT.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-6XaMN4pJ.js";import"./modal-drawer-B7CU3QM4.js";import"./mini-drawer-Dj8wQkgb.js";import"./expansion-panel--_gLVO8b.js";import"./open-icon-DcGzml4q.js";import"./file-picker-CHw0BQhR.js";import"./floating-action-button-wzxQPbzt.js";import"./inline-message-BKecgmUf.js";import"./kbd-NxJFxEcB.js";import"./key-item-8xuZfYUr.js";import"./keyboard-shortcut-7nvHNiWG.js";import"./label-value-06gdOjV6.js";import"./meter-group-CPW5t8EL.js";import"./page-state-DdcxjGPv.js";import"./paginator-CnjETXcG.js";import"./process-stepper-BB2stbFs.js";import"./radio-group-BaQvU3iO.js";import"./scaffold-ua4VSBPI.js";import"./secret-BnVY4wA4.js";import"./select-dropdown-DrVg23YJ.js";import"./select-DTvC0Ash.js";import"./skip-link-IAxZZ9ok.js";import"./slider-CXmbBvkG.js";import"./split-view-BDpcSaeA.js";import"./stack-CzasDS03.js";import"./stepper-B7nFEHoG.js";import"./switch-CpWcjskA.js";import"./table-CZoVgADs.js";import"./tab-panel-CDuzGElt.js";import"./time-picker-D3R8ZnWG.js";import"./timestamp-DTY3Ua8D.js";import"./toast-DId5oN2y.js";import"./toolbar-Ddg2nt1F.js";import"./tooltip-BHVODbPX.js";import"./tree-item-Beru7x2e.js";import"./view-switcher-B1N5uMXB.js";import"./deprecated-icon-button-mHDl57l3.js";import"./split-button-r9t3VfEW.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...l.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Vt=Object.freeze(Object.defineProperty({__proto__:null,Demo:m,WithCustomContent:l,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{m as D,Vt as P,l as W};
