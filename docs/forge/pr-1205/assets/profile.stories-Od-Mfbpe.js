import{b as d}from"./iframe-Ce60v_-f.js";import{s as u,g as f}from"./utils-E9-_u7-I.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CnZm-K6y.js";import"./app-bar-profile-button-BNvLGhsJ.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-QQy6qJP1.js";import"./menu-zI_-gNeq.js";import"./linear-progress-BuTzYSPq.js";import"./list-tSsBcS4l.js";import"./popover-bYTsRCvd.js";import"./overlay-BNDDgKF7.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DjMJjvPK.js";import"./avatar-C7LF3Z_Q.js";import"./icon-button-s40OUgVh.js";import"./focus-indicator-Bp7--dbz.js";import"./state-layer-B1dog9AJ.js";import"./autocomplete-Cw8KtIWT.js";import"./label-BAtycYFU.js";import"./base-field-CfQJ5Dx6.js";import"./text-field-BheLYwpD.js";import"./backdrop-CIiH6Dag.js";import"./badge-BOH3n2xT.js";import"./banner-CwnAI-oM.js";import"./bottom-sheet-CbZ0b--i.js";import"./dialog-D0mbnYjz.js";import"./button-area-BkPr8tTE.js";import"./button-toggle-group-BmkR2IlZ.js";import"./button-CRDfQpBx.js";import"./calendar-D5YuQqI-.js";import"./card-M5cMUYXh.js";import"./checkbox-BDQi2elE.js";import"./chip-set-8-pGi0iM.js";import"./circular-progress-BqNemWjC.js";import"./color-picker-B693nt-O.js";import"./date-picker-DcvAm5Md.js";import"./date-range-picker-ZrKCuSmw.js";import"./divider-BWbyVKK_.js";import"./base-drawer-H_Vclf0e.js";import"./drawer-VrFasrSd.js";import"./modal-drawer-B5TY4Qqi.js";import"./mini-drawer-j_wQw-o8.js";import"./expansion-panel-CaAUr0KD.js";import"./open-icon-C5O7QBme.js";import"./file-picker-p3BFrVar.js";import"./floating-action-button-B2ZjBovy.js";import"./inline-message-Bn0Suvrv.js";import"./key-item-D5TXHike.js";import"./keyboard-shortcut-D86mLEga.js";import"./label-value-BBtWzpWn.js";import"./listbox-DgiMwbxN.js";import"./meter-group-DyVRbYi7.js";import"./page-state-CbLkYdiz.js";import"./paginator-TEYTmTG0.js";import"./radio-group-BFmbcTHj.js";import"./scaffold-DgAVuyRY.js";import"./secret-BjSHOYqm.js";import"./option-BZF4Fqol.js";import"./select-dropdown-W7_rCzCh.js";import"./select-Do1dXFcP.js";import"./skip-link-RT48FQCp.js";import"./slider-Br6D5Jvw.js";import"./split-view-DxDfNJg8.js";import"./stack-BJj2fenZ.js";import"./stepper-CUYiZRPA.js";import"./switch-7MgN0hVZ.js";import"./table-De7eUGOE.js";import"./tab-panel-DkdaykXt.js";import"./time-picker-Cqq0dvKU.js";import"./timestamp-DDvrGAl4.js";import"./toast-D87Me6UN.js";import"./toolbar-DlV02oAk.js";import"./tooltip-Bb9XI6kj.js";import"./tree-item-D-dyzBzd.js";import"./view-switcher-Cke0UXCI.js";import"./deprecated-icon-button-BIvpUPCv.js";import"./split-button-b5_iD7P6.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Gt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Gt as P,m as W};
