import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  variant: figma.enum('Variant', {
    Filled: 'filled',
    Outlined: 'outlined',
    Plain: 'plain'
  }),
  state: figma.enum('State', {
    Invalid: 'invalid',
    Disabled: 'disabled',
    Enabled: undefined,
    Focused: undefined
  }),
  floatLabel: figma.boolean('Floating label', {
    true: html`float-label`,
    false: undefined
  }),
  multiline: figma.boolean('Multiline', {
    true: html`multiline`,
    false: undefined
  }),
  required: figma.boolean('Required', {
    true: html`required`,
    false: undefined
  }),
  label: figma.string('Label'),
  startSlot: figma.boolean('Start slot', {
    true: html`<forge-icon name="icon_name" slot="start"></forge-icon>`,
    false: undefined
  }),
  endSlot: figma.boolean('End slot', {
    true: figma.instance('End instance'),
    false: undefined
  }),
  supportText: figma.boolean('Support Text', {
    true: html`<span slot="support-text">Support text</span> <span slot="support-text-end"></span>`,
    false: undefined
  })
};

// Field component
figma.connect('<FIGMA_FIELD_FIELD>', {
  props: {
    ...sharedProps
  },
  example: (props: any) =>
    html`<forge-field variant="${props.variant}" ${props.state} ${props.floatLabel} ${props.multiline} ${props.required}>
      ${props.startSlot}
      <label for="input">${props.label}</label>
      <input type="text" id="input" />
      <div slot="end">${props.endSlot}</div>
      ${props.supportText}
    </forge-field>`
});

// Field type variants - Text field
figma.connect('<FIGMA_FIELD_TYPE>', {
  variant: { 'Field Type': 'Text' },
  props: {
    fieldLabel: figma.nestedProps('forge-field', {
      ...sharedProps
    })
  },
  example: (props: any) =>
    html`<forge-text-field variant="${props.fieldLabel.variant}" ${props.fieldLabel.state} ${props.fieldLabel.floatLabel} ${props.fieldLabel.required}>
      <label>${props.fieldLabel.label}</label>
      <input type="text" />
    </forge-text-field>`
});

// Field type variants - Select
figma.connect('<FIGMA_FIELD_TYPE>', {
  variant: { 'Field Type': 'Select' },
  props: {
    fieldLabel: figma.nestedProps('forge-field', {
      ...sharedProps
    })
  },
  example: (props: any) =>
    html`<forge-select
      label="${props.fieldLabel.label}"
      variant="${props.fieldLabel.variant}"
      ${props.fieldLabel.state}
      ${props.fieldLabel.floatLabel}
      ${props.fieldLabel.required}>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
      ${props.fieldLabel.supportText}
    </forge-select>`
});

// Field type variants - Date picker
figma.connect('<FIGMA_FIELD_TYPE>', {
  variant: { 'Field Type': 'Date picker' },
  props: {
    fieldLabel: figma.nestedProps('forge-field', {
      ...sharedProps
    })
  },
  example: (props: any) =>
    html`<forge-date-picker>
      <forge-text-field variant="${props.fieldLabel.variant}" ${props.fieldLabel.state} ${props.fieldLabel.floatLabel} ${props.fieldLabel.required}>
        <label for="date-picker" slot="label">${props.fieldLabel.label}</label>
        <input type="text" id="date-picker" />
        ${props.fieldLabel.supportText}
      </forge-text-field>
    </forge-date-picker>`
});

// Field type variants - Date range picker
figma.connect('<FIGMA_FIELD_TYPE>', {
  variant: { 'Field Type': 'Date range picker' },
  props: {
    fieldLabel: figma.nestedProps('forge-field', {
      ...sharedProps
    })
  },
  example: (props: any) =>
    html`<forge-date-range-picker>
      <forge-text-field variant="${props.fieldLabel.variant}" ${props.fieldLabel.state} ${props.fieldLabel.floatLabel} ${props.fieldLabel.required}>
        <label for="date-range-picker-01" slot="label">${props.fieldLabel.label}</label>
        <input type="text" id="date-range-picker-01" placeholder="mm/dd/yyyy" />
        <input type="text" id="date-range-picker-02" placeholder="mm/dd/yyyy" />
        ${props.fieldLabel.supportText}
      </forge-text-field>
    </forge-date-range-picker>`
});

// Field type variants - Time picker
figma.connect('<FIGMA_FIELD_TYPE>', {
  variant: { 'Field Type': 'Time picker' },
  props: {
    fieldLabel: figma.nestedProps('forge-field', {
      ...sharedProps
    })
  },
  example: (props: any) =>
    html`<forge-time-picker>
      <forge-text-field variant="${props.fieldLabel.variant}" ${props.fieldLabel.state} ${props.fieldLabel.floatLabel} ${props.fieldLabel.required}>
        <label for="time-picker" slot="label">${props.fieldLabel.label}</label>
        <input type="text" id="time-picker" />
        ${props.fieldLabel.supportText}
      </forge-text-field>
    </forge-time-picker>`
});

// Field type variants - Text field
figma.connect('<FIGMA_FIELD_TYPE>', {
  variant: { 'Field Type': 'Textarea' },
  props: {
    fieldLabel: figma.nestedProps('forge-field', {
      ...sharedProps
    })
  },
  example: (props: any) =>
    html`<forge-text-field variant="${props.fieldLabel.variant}" ${props.fieldLabel.state} ${props.fieldLabel.floatLabel} ${props.fieldLabel.required}>
      <label>${props.fieldLabel.label}</label>
      <textarea></textarea>
    </forge-text-field>`
});

// Field type variants - Chip field
figma.connect('<FIGMA_FIELD_TYPE>', {
  variant: { 'Field Type': 'Chip field' },
  props: {
    fieldLabel: figma.nestedProps('forge-field', {
      ...sharedProps
    })
  },
  example: (props: any) =>
    html`<forge-chip-field variant="${props.fieldLabel.variant}" ${props.fieldLabel.state} ${props.fieldLabel.floatLabel} ${props.fieldLabel.required}>
      <label slot="label" for="tag-input">${props.fieldLabel.label}</label>
      <input type="text" id="tag-input" />
      <div slot="support-text">${props.fieldLabel.supportText}</div>
      <forge-chip slot="member" type="field" dense="">example_chip1</forge-chip>
      <forge-chip slot="member" type="field" dense="">example_chip2</forge-chip>
    </forge-chip-field>`
});

// Chip - field type
figma.connect('<FIGMA_FIELD_FIELD_CHIP>', {
  props: {
    text: figma.string('Text')
  },
  example: (props: any) => html`<forge-chip type="field" slot="member" dense="">${props.text}</forge-chip>`
});
