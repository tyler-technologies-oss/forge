import{b as d}from"./iframe-Debf3RpE.js";import{s as u,g as f}from"./utils-Cu3TicFl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BGAJj60I.js";import"./app-bar-profile-button-DFNHAfUI.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-smjcwUxp.js";import"./menu-CMGME8AS.js";import"./linear-progress-BvuLf7up.js";import"./list-BAXeXT-v.js";import"./popover-BF-Kcufs.js";import"./overlay-89T5TdFh.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CKi6B6Gm.js";import"./avatar-B91fIaYU.js";import"./icon-button-4wqwmjQ1.js";import"./focus-indicator-B4L8Ogqc.js";import"./state-layer-DRsbBcDh.js";import"./autocomplete-B2wWVE8I.js";import"./label-sD5AzVZ1.js";import"./base-field-BLnhZgRJ.js";import"./text-field-DSLqnf2L.js";import"./backdrop-SMwLBDG5.js";import"./badge-DWKtwawN.js";import"./banner-ByKzfOLR.js";import"./bottom-sheet-CrPMJblw.js";import"./dialog-CcEC3WqU.js";import"./button-area-D3y7jgOi.js";import"./button-toggle-group-Ce1HuTpb.js";import"./button-BpweU4pD.js";import"./calendar-BN13nvvl.js";import"./card-B_cPufRR.js";import"./checkbox-B3iv-mfc.js";import"./chip-set-BeI6wUM9.js";import"./circular-progress-yFB3Uh8Q.js";import"./color-picker-8zQW0jxn.js";import"./date-picker-BCPhyxBW.js";import"./date-range-picker-B5ZKxNkK.js";import"./divider-BageLr2e.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-DthgZrcs.js";import"./modal-drawer-DDnthQ-H.js";import"./mini-drawer-Bis_TD9h.js";import"./expansion-panel-DjWq-85a.js";import"./open-icon-BD_fBp6K.js";import"./file-picker-BVyNe5s7.js";import"./floating-action-button-DVC1zbJx.js";import"./inline-message-Dej6nioH.js";import"./key-item-C9nJj8QM.js";import"./keyboard-shortcut-DV0pMZL-.js";import"./label-value-CJDyRgCt.js";import"./meter-group-LVRNKz0W.js";import"./page-state-xtTZreUO.js";import"./paginator-CWvAqX0H.js";import"./radio-group-BpCWSXMM.js";import"./scaffold-l7cEUk27.js";import"./secret-DI_7oJUi.js";import"./select-dropdown-LjpOR_85.js";import"./select--7QXKLHw.js";import"./skip-link-3piM0H92.js";import"./slider-BrpjRkk9.js";import"./split-view-CpucTGJb.js";import"./stack-DYrRnd9D.js";import"./stepper-BwzXv6EY.js";import"./switch-wqJFgsrh.js";import"./table-BJnxWv7w.js";import"./tab-bar-2PlKnhEu.js";import"./time-picker-Dvg45B3x.js";import"./toast-BPRqUmu-.js";import"./toolbar-CpPg4Ncu.js";import"./tooltip-aoH8qUuW.js";import"./tree-item-tsG0jWYu.js";import"./view-switcher-xUv-lFl9.js";import"./deprecated-icon-button-CDVg1QO9.js";import"./split-button-B57fzeN5.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Kt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Kt as P,m as W};
