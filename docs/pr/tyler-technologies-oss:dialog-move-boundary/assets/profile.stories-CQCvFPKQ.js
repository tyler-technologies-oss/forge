import{x as b}from"./iframe-nl-b_ISB.js";import{g as y,s as I}from"./utils-CtrDDikH.js";import"./feature-detection-uS6p5jc8.js";import"./accordion-9V_eyO_B.js";import"./expansion-panel-CTn5fG9B.js";import"./index-CiLSBptl.js";import"./app-bar-profile-button-zEhFqDD_.js";import"./state-layer-C7sW6v-0.js";import"./focus-indicator-BeibAi2h.js";import{I as h,t as v,a as x,b as L,c as _}from"./icon-B8CdcxqJ.js";import"./menu-KOOvy-C_.js";import"./linear-progress-2PahUgVv.js";import"./list-CkPu5vu3.js";import"./popover-CjB4Fwlr.js";import"./overlay-CewVvJzX.js";import"./skeleton-C4EH8VF8.js";import"./avatar-OKVrQfcR.js";import"./icon-button-C-UNXlAt.js";import"./autocomplete-ByF7hwI9.js";import"./label-v2fBLVwj.js";import"./button-DEhPRUdY.js";import"./button-toggle-group-DWRuBNed.js";import"./checkbox-B1PtNwCH.js";import"./switch-c2I0wwHc.js";import"./base-field-7hlMWjmp.js";import"./text-field-dq_nRcFS.js";import"./backdrop-BZvWLwDX.js";import"./badge-p5vzqXcx.js";import"./banner-QHyOK8k2.js";import"./bottom-sheet-BcybCdmL.js";import"./dialog-DvvDkIKd.js";import"./button-area-CvGonkWs.js";import"./calendar-hvTO47o9.js";import"./card-CUNZWoPk.js";import"./chip-set-DJEem7sd.js";import"./circular-progress-xrl2HF46.js";import"./color-picker-DId1aiuP.js";import"./date-picker-DShcIo1m.js";import"./date-range-picker-BO2QezLj.js";import"./divider-DoNAUeHX.js";import"./base-drawer-BSbu5Knl.js";import"./drawer-BX8jbqp4.js";import"./modal-drawer-DepTplO4.js";import"./mini-drawer-DjSpDxYe.js";import"./file-picker-CdSWg5yT.js";import"./floating-action-button-BZKxYF82.js";import"./inline-message-By3BVHSa.js";import"./key-item-B18c4deQ.js";import"./keyboard-shortcut-Cs_3tUZu.js";import"./label-value-CaouEyrO.js";import"./meter-group-DTU3vwck.js";import"./page-state-em5vC-QK.js";import"./paginator-Dco3Y6FE.js";import"./scaffold-CGyusmPL.js";import"./select-dropdown-BJvb0E8g.js";import"./select-CWcwFsa7.js";import"./skip-link-DJlCqVT5.js";import"./slider-B2_itZtp.js";import"./split-view-D2-Og0qd.js";import"./stack-niTWfPr5.js";import"./stepper-DqIaGwaQ.js";import"./table-B5b2RS9l.js";import"./tab-bar-Bhq4Ed9L.js";import"./time-picker-pfgkxEWJ.js";import"./toast-bjL5K8Dp.js";import"./toolbar-Byb6kcao.js";import"./tooltip-Chj_0PH7.js";import"./view-switcher-EfMcYRc9.js";import"./deprecated-icon-button-Bk-wT-6i.js";import"./split-button-Cj4ySonK.js";const{action:C}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",O=C("forge-profile-card-profile"),P=C("forge-profile-card-sign-out");h.define([v,x,L,_]);const S={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>b`
      <forge-app-bar title-text="Profile">
        <forge-app-bar-profile-button
          slot="end"
          @forge-profile-card-profile=${O}
          @forge-profile-card-sign-out=${P}
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
    `,component:s,argTypes:{...y({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},l={},m={...I,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.log("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return b`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};var c,d,u;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(u=(d=l.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var f,g,E;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(E=(g=m.parameters)==null?void 0:g.docs)==null?void 0:E.source}}};const $=["Demo","WithCustomContent"],Yt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:$,default:S},Symbol.toStringTag,{value:"Module"}));export{l as D,Yt as P,m as W};
