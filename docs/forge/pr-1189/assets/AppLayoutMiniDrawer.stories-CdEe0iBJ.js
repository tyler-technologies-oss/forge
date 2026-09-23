import{b as t}from"./iframe-DhPPATOI.js";import"./service-adapter-gy1PbA1l.js";import"./app-layout-CZI6WVbn.js";import"./badge-C-_a_oin.js";import"./button-D5tK2bf-.js";import"./card-xZjk_lrn.js";import"./date-picker-Bvgn5KHz.js";import"./calendar-B1HggwMd.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./icon-button-C2v-Sinx.js";import"./icon-DaCKLlYs.js";import"./text-field-BWtqe7xr.js";import"./base-field-Mwf4T1kF.js";import"./focus-indicator-Cy6URCXv.js";import"./label-D4E_mm-6.js";import"./divider-DrBQytg-.js";import"./list-BQeID-EI.js";import"./list-item-Czcdb5bP.js";import"./select-dropdown-B-Jd_TaC.js";import"./linear-progress-BGu4ylYb.js";import"./popover-B6Lyp91L.js";import"./overlay-DnA59UKB.js";import"./skeleton-D0Kw-TGm.js";import"./select-Z-fll7Bu.js";import"./stack-k5bE-KTo.js";import"./tab-panel-CLq4K60J.js";import"./toolbar-7MtW3mBN.js";import"./tooltip-BJ-I3FD9.js";import"./preload-helper-PPVm8Dsz.js";import"./property-Dg1Vmfps.js";import"./state-Co1I3z7K.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./base-DVmwUFg0.js";import"./when-CI7b_ccM.js";import"./base-lit-element-HaqO9pkv.js";import"./directive-CwRn8Fwj.js";import"./utils-DrKqfkBZ.js";import"./app-bar-menu-button-DD6-mDnN.js";import"./class-map-CEQgffN4.js";import"./a11y-utils-CbIWIoQU.js";import"./dom-utils-Dwl6Rho5.js";import"./feature-detection-Q4q-Y4Ic.js";import"./constants-BPFI0b36.js";import"./base-component-RfQ5fKAq.js";import"./icon-button-constants-CAk_t8Bl.js";import"./base-button-DXDc4OJ8.js";import"./query-assigned-elements-43hYArgI.js";import"./state-layer-D75fz-rw.js";import"./base-adapter-CdkfKU0P.js";import"./dialog-DGghfkK0.js";import"./backdrop-Cme44_g_.js";import"./dismissible-stack-Hc6LlN2C.js";import"./drawer-lU6k92RL.js";import"./base-drawer-BL5lye2C.js";import"./event-utils-zQ4FLDwK.js";import"./mini-drawer-OoNkqIRy.js";import"./scaffold-BVJBr1z1.js";import"./button-constants-G4LMDyUn.js";import"./base-date-picker-core--5N4MVvv.js";import"./a11y-BxM9_46k.js";import"./event-utils-C1SDeUaq.js";import"./with-label-aware-Bp1VGc65.js";import"./button-toggle-group-constants-Dk2L7VtD.js";import"./checkbox-constants-CDXOwsBo.js";import"./switch-constants-GNrCf0tQ.js";import"./with-element-internals-CFSngiIf.js";import"./circular-progress-D4RaVrYZ.js";import"./with-longpress-listener-D8NLSSJF.js";import"./with-form-associated-BWTKA2C1.js";import"./list-dropdown-aware-core-DFEHM-H2.js";import"./list-dropdown-D_9KJkm_.js";import"./consume-Dn26QDt8.js";const l="forge-app-layout",Ae={title:"Components/App Layout",component:l,render:o=>{const e={heading3:"forge-typography--heading1",heading4:"forge-typography--heading2",heading5:"forge-typography--heading3",body1:"forge-typography--body1",label1:"forge-typography--label1"};return t`
      <style>
        * {
          box-sizing: border-box !important;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          padding: 0;
          margin: 0;
        }

        forge-app-layout:state(small) {
          .main-content-container {
            grid-template-columns: 1fr;
          }

          .column-2 {
            grid-column: 1;
          }
        }

        body {
          margin: 0 !important;
          padding: 0 !important;
        }

        .secondary-header {
          --forge-toolbar-background: transparent;
        }

        .body {
          height: 100%;
          background-color: var(--forge-theme-surface-dim);
          padding-inline: var(--forge-spacing-medium);
        }

        .tab-container {
          grid-column: 1 / -1;
        }

        .main-content-container {
          display: grid;
          grid-template-columns: 9fr 3fr;
          gap: var(--forge-spacing-medium);
          grid-auto-rows: min-content;
          margin-block-start: var(--forge-spacing-medium);
        }

        .details-card {
          grid-column: 1;
        }

        .column-2 {
          grid-column: 2;
          display: flex;
          flex-direction: column;
          gap: var(--forge-spacing-medium);
        }

        .label-value-grid {
          display: grid;
          grid-template-columns: 180px 1fr;
          column-gap: var(--forge-spacing-medium);
          row-gap: var(--forge-spacing-xsmall);
          align-items: center;
        }

        forge-button[variant='tonal'] {
          --forge-button-tonal-background: #e5e8f7;
        }
      </style>
      <forge-app-layout app-title=${o.appTitle} breakpoint=${o.breakpoint} use-mini-drawer ?mini-hover=${o.miniHover}>
        <forge-list navlist slot="navigation" data-forge-app-layout-close>
          <forge-list-item selected id="tooltip-host-dashboard">
            ${o.miniHover?"":t`<forge-tooltip anchor="tooltip-host-dashboard">Dashboard</forge-tooltip>`}
            <forge-icon slot="leading" name="visibility" external></forge-icon>
            <button type="button">Dashboard</button>
          </forge-list-item>
          <forge-list-item id="tooltip-host-analytics">
            ${o.miniHover?"":t`<forge-tooltip anchor="tooltip-host-analytics">Analytics</forge-tooltip>`}
            <forge-icon slot="leading" name="analytics" external></forge-icon>
            <button type="button">Analytics</button>
          </forge-list-item>
          <forge-list-item id="tooltip-host-reports">
            ${o.miniHover?"":t`<forge-tooltip anchor="tooltip-host-reports">Reports</forge-tooltip>`}
            <forge-icon slot="leading" name="assessment" external></forge-icon>
            <button type="button">Reports</button>
          </forge-list-item>
          <forge-list-item id="tooltip-host-users">
            ${o.miniHover?"":t`<forge-tooltip anchor="tooltip-host-users">Users</forge-tooltip>`}
            <forge-icon slot="leading" name="people" external></forge-icon>
            <button type="button">Users</button>
          </forge-list-item>
          <forge-list-item id="tooltip-host-settings">
            ${o.miniHover?"":t`<forge-tooltip anchor="tooltip-host-settings">Settings</forge-tooltip>`}
            <forge-icon slot="leading" name="settings" external></forge-icon>
            <button type="button">Settings</button>
          </forge-list-item>
          <forge-list-item id="tooltip-host-help">
            ${o.miniHover?"":t`<forge-tooltip anchor="tooltip-host-help">Help</forge-tooltip>`}
            <forge-icon slot="leading" name="help" external></forge-icon>
            <button type="button">Help</button>
          </forge-list-item>
        </forge-list>

        <main slot="body" class="body">
          <forge-toolbar class="secondary-header" no-divider>
            <!-- Back button - always visible -->
            <forge-stack inline alignment="center" gap="32" slot="before-start">
              <forge-stack alignment="center" inline gap="8">
                <forge-icon-button aria-label="Go back" density="small">
                  <forge-icon name="arrow_back" external></forge-icon>
                </forge-icon-button>
                <h2 class="${e.heading5}">Cory Ander</h2>
              </forge-stack>
              <forge-stack inline alignment="center" gap="8">
                <forge-badge theme="secondary">Interview pending</forge-badge>
                <forge-badge theme="info">Internal</forge-badge>
              </forge-stack>
            </forge-stack>
          </forge-toolbar>
          <div class="tab-container">
            <forge-tab-bar data-aria-label="Demo tabs" active-tab="0" clustered slot="start">
              <forge-tab>Applicant information</forge-tab>
              <forge-tab>Documents</forge-tab>
              <forge-tab>Interviews</forge-tab>
              <forge-tab>Messages</forge-tab>
            </forge-tab-bar>
          </div>

          <div class="main-content-container">
            <forge-card class="details-card">
              <forge-stack gap="24">
                <h3 class="${e.heading4}">Details</h3>
                <div class="label-value-grid">
                  <label slot="label" class="${e.label1}">Applied for</label>
                  <span slot="value" class="${e.body1}">Senior software engineer</span>
                  <label slot="label" class="${e.label1}">Application date</label>
                  <span slot="value" class="${e.body1}">January 1, 2024</span>
                </div>
                <div class="tab-container">
                  <forge-tab-bar data-aria-label="Demo tabs" active-tab="0" clustered slot="start">
                    <forge-tab>Personal information</forge-tab>
                    <forge-tab>Qualifications</forge-tab>
                    <forge-tab>Work history</forge-tab>
                    <forge-tab>References</forge-tab>
                  </forge-tab-bar>
                </div>
                <forge-stack gap="24">
                  <h4 class="${e.heading3}">Education</h4>
                  <forge-stack gap="24">
                    <div class="label-value-grid">
                      <label slot="label" class="${e.label1}">Institution</label>
                      <span slot="value" class="${e.body1}">Massachusetts Institute of Technology</span>
                      <label slot="label" class="${e.label1}">Degree</label>
                      <span slot="value" class="${e.body1}">Masters of Science</span>
                      <label slot="label" class="${e.label1}">Area 1</label>
                      <span slot="value" class="${e.body1}">Computer Science</span>
                      <label slot="label" class="${e.label1}">Area 2</label>
                      <span slot="value" class="${e.body1}">Mathematics</span>
                    </div>
                    <div class="label-value-grid">
                      <label slot="label" class="${e.label1}">Institution</label>
                      <span slot="value" class="${e.body1}">University of California, Berkeley</span>
                      <label slot="label" class="${e.label1}">Degree</label>
                      <span slot="value" class="${e.body1}">Bachelors of Science</span>
                      <label slot="label" class="${e.label1}">Area 1</label>
                      <span slot="value" class="${e.body1}">Computer Engineering</span>
                      <label slot="label" class="${e.label1}">Area 2</label>
                      <span slot="value" class="${e.body1}">Mathematics</span>
                    </div>
                  </forge-stack>
                </forge-stack>
                <forge-divider></forge-divider>

                <forge-stack gap="24">
                  <h4 class="${e.heading3}">Certifications</h4>
                  <forge-stack gap="24">
                    <div class="label-value-grid">
                      <label slot="label" class="${e.label1}">Type</label>
                      <span slot="value" class="${e.body1}">AWS Certified Solutions Architect</span>
                      <label slot="label" class="${e.label1}">Area</label>
                      <span slot="value" class="${e.body1}">Cloud Computing</span>
                      <label slot="label" class="${e.label1}">Level</label>
                      <span slot="value" class="${e.body1}">Professional</span>
                      <label slot="label" class="${e.label1}">Effective date</label>
                      <span slot="value" class="${e.body1}">01/01/2026</span>
                      <label slot="label" class="${e.label1}">Expiration date</label>
                      <span slot="value" class="${e.body1}">01/01/2028</span>
                    </div>
                    <div class="label-value-grid">
                      <label slot="label" class="${e.label1}">Type</label>
                      <span slot="value" class="${e.body1}">Certified Scrum Master</span>
                      <label slot="label" class="${e.label1}">Area</label>
                      <span slot="value" class="${e.body1}">Agile Methodology</span>
                      <label slot="label" class="${e.label1}">Effective date</label>
                      <span slot="value" class="${e.body1}">01/01/2026</span>
                      <label slot="label" class="${e.label1}">Expiration date</label>
                      <span slot="value" class="${e.body1}">01/01/2028</span>
                    </div>
                  </forge-stack>
                </forge-stack>
              </forge-stack>
            </forge-card>

            <div class="column-2">
              <forge-card>
                <forge-stack gap="16">
                  <h3 class="${e.heading4}">Workflow Status</h3>
                  <forge-select
                    label="Applicant status"
                    aria-label="Label"
                    label-position="block-start"
                    label-alignment="default"
                    variant="outlined"
                    theme="default"
                    shape="default"
                    density="default"
                    value="1"
                    placeholder
                    support-text-inset
                    select-all-label="Select all">
                    <forge-option value="1">Interview</forge-option>
                    <forge-option value="2">Option 2</forge-option>
                    <forge-option value="3">Option 3</forge-option>
                  </forge-select>
                  <forge-stack gap="8">
                    <forge-button variant="filled">
                      <forge-icon name="calendar_today" slot="start" external></forge-icon>
                      <span>Schedule interview</span>
                    </forge-button>
                    <forge-button variant="tonal">
                      <forge-icon name="send_variant_outline" slot="start" external></forge-icon>
                      <span>Send reference request</span>
                    </forge-button>
                  </forge-stack>
                </forge-stack>
              </forge-card>

              <forge-card class="workflow-status-card">
                <forge-stack gap="16">
                  <h3 class="${e.heading4}">Interview details</h3>
                  <forge-date-picker>
                    <forge-text-field label-position="block-start">
                      <label for="date-picker">Date</label>
                      <input aria-label="Pick a date" type="text" id="date-picker" autocomplete="off" placeholder="mm/dd/yyyy" />
                    </forge-text-field>
                  </forge-date-picker>
                  <forge-stack gap="8">
                    <forge-button variant="tonal">
                      <forge-icon name="question_answer" slot="start" external></forge-icon>
                      <span>Generate questions</span>
                    </forge-button>
                    <forge-button variant="tonal">
                      <forge-icon name="star_border" slot="start" external></forge-icon>
                      <span>Add evaluation</span>
                    </forge-button>
                    <forge-button variant="tonal">
                      <forge-icon name="notes" slot="start" external></forge-icon>
                      <span>View notes</span>
                    </forge-button>
                  </forge-stack>
                </forge-stack>
              </forge-card>

              <forge-card class="workflow-status-card">
                <forge-stack gap="16">
                  <h3 class="${e.heading4}">Verification status</h3>
                  <forge-stack gap="8">
                    <div class="label-value-grid">
                      <span class="${e.label1}">Background check</span>
                      <forge-badge theme="info-secondary">Initiated</forge-badge>

                      <span class="${e.label1}">Reference check</span>
                      <forge-badge theme="tertiary">Sent</forge-badge>
                    </div>
                  </forge-stack>
                </forge-stack>
              </forge-card>
            </div>
          </div>
        </main>

        <div slot="footer">
          <div
            style="padding: 16px; background: var(--forge-theme-surface-container); border-top: 1px solid var(--forge-theme-outline-low); text-align: center;">
            Footer Content
          </div>
        </div>
      </forge-app-layout>
    `},argTypes:{appTitle:{control:"text",description:"The title text to display in the app bar",table:{category:"Properties"}},breakpoint:{control:"number",description:"The screen width breakpoint in pixels for responsive behavior",table:{category:"Properties"}},miniHover:{control:"boolean",description:"Whether the mini drawer should expand on hover",table:{category:"Properties"}}},args:{appTitle:"App Layout Mini Drawer",breakpoint:768,miniHover:!1}},a={};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};const Se=["MiniDrawer"];export{a as MiniDrawer,Se as __namedExportsOrder,Ae as default};
