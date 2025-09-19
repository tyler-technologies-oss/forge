import{x as c}from"./iframe-BnJdS9oE.js";import{g as u,s as f}from"./utils-D7XrLKwY.js";import"./feature-detection-BwPJgXni.js";import"./accordion-DewnkRfw.js";import"./expansion-panel-BUfwVSJ6.js";import"./index-5CPwzmQS.js";import"./app-bar-profile-button-BlFWKmDX.js";import"./state-layer-CLjAHnoF.js";import"./focus-indicator-B9KMEBVK.js";import{I as g,t as E,a as b,b as C,c as y}from"./icon-FzRol6Tl.js";import"./menu-CioYiqb-.js";import"./linear-progress-CfBpjTvZ.js";import"./list-ucSdTmS4.js";import"./popover-CCIxKg31.js";import"./overlay-B72xXWi5.js";import"./skeleton-1JRnRe4N.js";import"./avatar-DzJTtdPC.js";import"./icon-button-DpLi6_yQ.js";import"./autocomplete-B1FrCjfl.js";import"./label-73doN4RE.js";import"./button-Bjtey6FZ.js";import"./button-toggle-group-C96H3ppB.js";import"./checkbox-DYAJ7rMi.js";import"./switch-WjqoziFM.js";import"./base-field-DVdLvhJA.js";import"./text-field-DqRG6OMZ.js";import"./backdrop-uKV88UE6.js";import"./badge-ChhdTTh-.js";import"./banner-B9AGOWqC.js";import"./bottom-sheet-uQt0svWI.js";import"./dialog-CYY7E81K.js";import"./button-area-CyLBxpnc.js";import"./calendar-T0WD8t_P.js";import"./card-C6TDrjqN.js";import"./chip-set-DulgInB8.js";import"./circular-progress-Dih7K_6W.js";import"./color-picker-DRQcKKVY.js";import"./date-picker-BfahCCs1.js";import"./date-range-picker-DXPaVzXb.js";import"./divider-BXP9Ondm.js";import"./base-drawer-BHAH5ckk.js";import"./drawer-DSWr6wim.js";import"./modal-drawer-Cxt7ntIm.js";import"./mini-drawer-BAJSYwdd.js";import"./file-picker-D40GCFNb.js";import"./floating-action-button-BMYMk_3v.js";import"./inline-message-Bbte0O1S.js";import"./key-item-BrjQMKfy.js";import"./keyboard-shortcut-CDvIh3ZR.js";import"./label-value-BkhC4aHj.js";import"./meter-group-a2PsEd-S.js";import"./page-state-C5yaja5I.js";import"./paginator-E1-Ev5po.js";import"./scaffold-CwOy6RR7.js";import"./select-dropdown-Du1d_a8s.js";import"./select-CJYQS9kr.js";import"./skip-link-k1_M2gBN.js";import"./slider-7FGCWCSZ.js";import"./split-view-BtMpIIy6.js";import"./stack-C3jLvSVi.js";import"./stepper-vvbxIg4W.js";import"./table-GIlIYoBK.js";import"./tab-bar-DdL2OpRI.js";import"./time-picker-PqMxmKNj.js";import"./toast-03iTv5n6.js";import"./toolbar-BtzJRWgQ.js";import"./tooltip-DcL6iv1E.js";import"./view-switcher-C2ZLZ4UU.js";import"./deprecated-icon-button--kS5FpP2.js";import"./split-button-XqnzyKsl.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=d("forge-profile-card-profile"),h=d("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>c`
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
