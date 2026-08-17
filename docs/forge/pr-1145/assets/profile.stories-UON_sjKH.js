import{b as d}from"./iframe-C_-ty6fL.js";import{s as u,g as f}from"./utils-BGcxM-UF.js";import"./service-adapter-8tADcN_b.js";import"./accordion-MAATiX3E.js";import"./app-bar-profile-button-COoemxu4.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-D9mSLRy4.js";import"./menu-CjTe72q_.js";import"./linear-progress-CsGp1g6o.js";import"./list-DC7JKMAb.js";import"./popover-DYZnCWEK.js";import"./overlay-6K9_GJW8.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CBiQXI5A.js";import"./avatar-IluyZrqh.js";import"./icon-button-C9FFS7_M.js";import"./focus-indicator-D2aoOwWz.js";import"./state-layer-Wu0zWm6m.js";import"./autocomplete-C1O4CziZ.js";import"./label-BHeKTlW4.js";import"./base-field-iqNZmbaE.js";import"./text-field-CFg9xGrE.js";import"./backdrop-3KzDwztH.js";import"./badge-zCFk7F59.js";import"./banner-CBphGk1O.js";import"./bottom-sheet-DmcGxX1L.js";import"./dialog-D9E1kPE3.js";import"./button-area-EwDZ0RHL.js";import"./button-toggle-group-BSI9DP6Q.js";import"./button-D_0nYvW8.js";import"./calendar-BTqk5J9c.js";import"./card-COk2gUDk.js";import"./checkbox-Bgdfqk2y.js";import"./chip-set-DAX24lfa.js";import"./circular-progress-DIduwjig.js";import"./color-picker-BP8zg1aU.js";import"./date-picker-D3K99V7Y.js";import"./date-range-picker-BxoO--wA.js";import"./divider-CZo7glzo.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DV7w1-5L.js";import"./modal-drawer-BwzSP7R6.js";import"./mini-drawer-liQMnkLy.js";import"./expansion-panel-R28_EX7C.js";import"./open-icon-g3bM26yh.js";import"./file-picker-_C-FIMcC.js";import"./floating-action-button-BPDVwd8N.js";import"./inline-message-fj34p3Px.js";import"./key-item-CNGSkFgy.js";import"./keyboard-shortcut-BQbj3zB9.js";import"./label-value-cTsUvwyw.js";import"./meter-group-Cfc6ZBIX.js";import"./page-state-DDjhdZbK.js";import"./paginator-_tU1nHi9.js";import"./radio-group-DEqXjA8X.js";import"./scaffold-CufLEZ-a.js";import"./secret-CuDTYl7X.js";import"./select-dropdown-BhU0S_8v.js";import"./select-23OOIxFK.js";import"./skip-link-BMuQG7xt.js";import"./slider-DsTYji5G.js";import"./split-view-DbnpYREW.js";import"./stack-Bc7kWG9C.js";import"./stepper-CXqbzh1C.js";import"./switch-DWfopykd.js";import"./table-CbeKKlW0.js";import"./tab-panel-D_IjWCaA.js";import"./time-picker-Bor_aKaw.js";import"./timestamp-sz8jqDdj.js";import"./toast-ydcEff9Q.js";import"./toolbar-CF49daLt.js";import"./tooltip-BFJ4vWye.js";import"./tree-item-BMODedYf.js";import"./view-switcher-BSHD_isP.js";import"./deprecated-icon-button-rZUZnjxh.js";import"./split-button-vbF-2qS2.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Yt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Yt as P,m as W};
