import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const FormGeneratorSchema = z.object({
  fields: z.array(z.object({
    name: z.string().describe('Field name/id'),
    type: z.enum(['text', 'email', 'password', 'number', 'tel', 'url', 'date', 'select', 'checkbox', 'radio', 'textarea']).describe('Field type'),
    label: z.string().describe('Field label'),
    required: z.boolean().optional().describe('Is field required'),
    placeholder: z.string().optional().describe('Placeholder text'),
    helperText: z.string().optional().describe('Helper text'),
    validation: z.object({
      minLength: z.number().optional(),
      maxLength: z.number().optional(),
      pattern: z.string().optional(),
      min: z.number().optional(),
      max: z.number().optional()
    }).optional(),
    options: z.array(z.object({
      value: z.string(),
      label: z.string()
    })).optional().describe('Options for select/radio fields')
  })),
  framework: z.enum(['vanilla', 'react', 'angular']).optional().default('vanilla'),
  includeValidation: z.boolean().optional().default(true),
  includeAccessibility: z.boolean().optional().default(true),
  submitButton: z.object({
    text: z.string(),
    variant: z.enum(['raised', 'outlined', 'text']).optional(),
    theme: z.enum(['primary', 'secondary', 'error', 'success', 'warning']).optional()
  }).optional()
});

export class FormGenerator {
  getSchema() {
    return zodToJsonSchema(FormGeneratorSchema) as any;
  }

  async generate(input: z.infer<typeof FormGeneratorSchema>): Promise<string> {
    const { fields, framework = 'vanilla', includeValidation, includeAccessibility, submitButton } = input;

    switch (framework) {
      case 'react':
        return this.generateReactForm(fields, includeValidation, includeAccessibility, submitButton);
      case 'angular':
        return this.generateAngularForm(fields, includeValidation, includeAccessibility, submitButton);
      default:
        return this.generateVanillaForm(fields, includeValidation, includeAccessibility, submitButton);
    }
  }

  private generateVanillaForm(
    fields: any[], 
    includeValidation: boolean, 
    includeAccessibility: boolean,
    submitButton?: any
  ): string {
    let form = `<!-- Tyler Forge Form -->\n`;
    form += `<form id="forgeForm"${includeAccessibility ? ' novalidate' : ''}>\n`;

    // Generate fields
    for (const field of fields) {
      form += this.generateField(field, includeAccessibility);
    }

    // Submit button
    if (submitButton) {
      form += `\n  <forge-button type="submit"`;
      if (submitButton.variant) form += ` variant="${submitButton.variant}"`;
      if (submitButton.theme) form += ` theme="${submitButton.theme}"`;
      form += `>\n    ${submitButton.text || 'Submit'}\n  </forge-button>\n`;
    }

    form += `</form>\n\n`;

    // Add validation script
    if (includeValidation) {
      form += this.generateValidationScript(fields);
    }

    return form;
  }

  private generateReactForm(
    fields: any[], 
    includeValidation: boolean, 
    includeAccessibility: boolean,
    submitButton?: any
  ): string {
    let form = `import { useState } from 'react';\n`;
    form += `import { ForgeTextField, ForgeSelect, ForgeCheckbox, ForgeButton } from '@tylertech/forge-react';\n\n`;

    form += `export function ContactForm() {\n`;
    form += `  const [formData, setFormData] = useState({\n`;
    for (const field of fields) {
      form += `    ${field.name}: '',\n`;
    }
    form += `  });\n\n`;

    form += `  const [errors, setErrors] = useState({});\n\n`;

    form += `  const handleSubmit = (e) => {\n`;
    form += `    e.preventDefault();\n`;
    
    if (includeValidation) {
      form += `    const newErrors = {};\n`;
      for (const field of fields) {
        if (field.required) {
          form += `    if (!formData.${field.name}) newErrors.${field.name} = '${field.label} is required';\n`;
        }
      }
      form += `    \n    if (Object.keys(newErrors).length > 0) {\n`;
      form += `      setErrors(newErrors);\n`;
      form += `      return;\n`;
      form += `    }\n`;
    }
    
    form += `    console.log('Form submitted:', formData);\n`;
    form += `  };\n\n`;

    form += `  return (\n`;
    form += `    <form onSubmit={handleSubmit}${includeAccessibility ? ' noValidate' : ''}>\n`;

    // Generate React fields
    for (const field of fields) {
      form += this.generateReactField(field, includeAccessibility);
    }

    // Submit button
    if (submitButton) {
      form += `      <ForgeButton type="submit"`;
      if (submitButton.variant) form += ` variant="${submitButton.variant}"`;
      if (submitButton.theme) form += ` theme="${submitButton.theme}"`;
      form += `>\n        ${submitButton.text || 'Submit'}\n      </ForgeButton>\n`;
    }

    form += `    </form>\n`;
    form += `  );\n`;
    form += `}\n`;

    return form;
  }

  private generateAngularForm(
    fields: any[], 
    _includeValidation: boolean, 
    includeAccessibility: boolean,
    submitButton?: any
  ): string {
    let form = `<!-- Angular Component Template -->\n`;
    form += `<form [formGroup]="form" (ngSubmit)="onSubmit()"${includeAccessibility ? ' novalidate' : ''}>\n`;

    for (const field of fields) {
      form += this.generateAngularField(field, includeAccessibility);
    }

    if (submitButton) {
      form += `  <forge-button type="submit"`;
      if (submitButton.variant) form += ` variant="${submitButton.variant}"`;
      if (submitButton.theme) form += ` theme="${submitButton.theme}"`;
      form += ` [disabled]="!form.valid">\n    ${submitButton.text || 'Submit'}\n  </forge-button>\n`;
    }

    form += `</form>\n\n`;

    // TypeScript component
    form += `// Component TypeScript\n`;
    form += `import { Component } from '@angular/core';\n`;
    form += `import { FormBuilder, FormGroup, Validators } from '@angular/forms';\n\n`;

    form += `@Component({\n`;
    form += `  selector: 'app-form',\n`;
    form += `  templateUrl: './form.component.html'\n`;
    form += `})\n`;
    form += `export class FormComponent {\n`;
    form += `  form: FormGroup;\n\n`;

    form += `  constructor(private fb: FormBuilder) {\n`;
    form += `    this.form = this.fb.group({\n`;
    
    for (const field of fields) {
      form += `      ${field.name}: ['', `;
      const validators = [];
      if (field.required) validators.push('Validators.required');
      if (field.validation?.minLength) validators.push(`Validators.minLength(${field.validation.minLength})`);
      if (field.validation?.maxLength) validators.push(`Validators.maxLength(${field.validation.maxLength})`);
      if (field.type === 'email') validators.push('Validators.email');
      form += validators.length ? `[${validators.join(', ')}]` : '[]';
      form += `],\n`;
    }
    
    form += `    });\n`;
    form += `  }\n\n`;

    form += `  onSubmit() {\n`;
    form += `    if (this.form.valid) {\n`;
    form += `      console.log('Form submitted:', this.form.value);\n`;
    form += `    }\n`;
    form += `  }\n`;
    form += `}\n`;

    return form;
  }

  private generateField(field: any, includeAccessibility: boolean): string {
    let html = `  <div class="form-field">\n`;

    if (field.type === 'select') {
      html += `    <forge-select\n`;
      html += `      id="${field.name}"\n`;
      html += `      name="${field.name}"\n`;
      html += `      label="${field.label}"`;
      if (field.required) html += `\n      required`;
      if (field.helperText) html += `\n      helper-text="${field.helperText}"`;
      html += `>\n`;
      
      if (field.options) {
        for (const option of field.options) {
          html += `      <forge-option value="${option.value}">${option.label}</forge-option>\n`;
        }
      }
      
      html += `    </forge-select>\n`;
    } else if (field.type === 'checkbox') {
      html += `    <forge-checkbox\n`;
      html += `      id="${field.name}"\n`;
      html += `      name="${field.name}"`;
      if (field.required) html += `\n      required`;
      html += `>\n      ${field.label}\n    </forge-checkbox>\n`;
    } else if (field.type === 'textarea') {
      html += `    <forge-text-field\n`;
      html += `      id="${field.name}"\n`;
      html += `      name="${field.name}"\n`;
      html += `      label="${field.label}"\n`;
      html += `      multiline`;
      if (field.required) html += `\n      required`;
      if (field.placeholder) html += `\n      placeholder="${field.placeholder}"`;
      if (field.helperText) html += `\n      helper-text="${field.helperText}"`;
      html += `>\n    </forge-text-field>\n`;
    } else {
      html += `    <forge-text-field\n`;
      html += `      id="${field.name}"\n`;
      html += `      name="${field.name}"\n`;
      html += `      label="${field.label}"\n`;
      html += `      type="${field.type}"`;
      if (field.required) html += `\n      required`;
      if (field.placeholder) html += `\n      placeholder="${field.placeholder}"`;
      if (field.helperText) html += `\n      helper-text="${field.helperText}"`;
      if (field.validation?.minLength) html += `\n      minlength="${field.validation.minLength}"`;
      if (field.validation?.maxLength) html += `\n      maxlength="${field.validation.maxLength}"`;
      if (field.validation?.pattern) html += `\n      pattern="${field.validation.pattern}"`;
      html += `>\n    </forge-text-field>\n`;
    }

    // Error message for accessibility
    if (includeAccessibility && field.required) {
      html += `    <forge-inline-message id="${field.name}-error" theme="error" style="display: none;">\n`;
      html += `      ${field.label} is required\n`;
      html += `    </forge-inline-message>\n`;
    }

    html += `  </div>\n`;
    return html;
  }

  private generateReactField(field: any, includeAccessibility: boolean): string {
    let jsx = `      <div className="form-field">\n`;

    if (field.type === 'select') {
      jsx += `        <ForgeSelect\n`;
      jsx += `          label="${field.label}"\n`;
      jsx += `          value={formData.${field.name}}\n`;
      jsx += `          onChange={(e) => setFormData({...formData, ${field.name}: e.target.value})}`;
      if (field.required) jsx += `\n          required`;
      if (field.helperText) jsx += `\n          helperText="${field.helperText}"`;
      jsx += `>\n`;
      
      if (field.options) {
        for (const option of field.options) {
          jsx += `          <option value="${option.value}">${option.label}</option>\n`;
        }
      }
      
      jsx += `        </ForgeSelect>\n`;
    } else if (field.type === 'checkbox') {
      jsx += `        <ForgeCheckbox\n`;
      jsx += `          checked={formData.${field.name}}\n`;
      jsx += `          onChange={(e) => setFormData({...formData, ${field.name}: e.target.checked})}`;
      if (field.required) jsx += `\n          required`;
      jsx += `>\n          ${field.label}\n        </ForgeCheckbox>\n`;
    } else {
      jsx += `        <ForgeTextField\n`;
      jsx += `          label="${field.label}"\n`;
      jsx += `          type="${field.type}"\n`;
      jsx += `          value={formData.${field.name}}\n`;
      jsx += `          onChange={(e) => setFormData({...formData, ${field.name}: e.target.value})}`;
      if (field.required) jsx += `\n          required`;
      if (field.placeholder) jsx += `\n          placeholder="${field.placeholder}"`;
      if (field.helperText) jsx += `\n          helperText="${field.helperText}"`;
      jsx += `\n        />\n`;
    }

    if (includeAccessibility) {
      jsx += `        {errors.${field.name} && <span className="error">{errors.${field.name}}</span>}\n`;
    }

    jsx += `      </div>\n`;
    return jsx;
  }

  private generateAngularField(field: any, includeAccessibility: boolean): string {
    let html = `  <div class="form-field">\n`;

    if (field.type === 'select') {
      html += `    <forge-select\n`;
      html += `      formControlName="${field.name}"\n`;
      html += `      label="${field.label}"`;
      if (field.helperText) html += `\n      helper-text="${field.helperText}"`;
      html += `>\n`;
      
      if (field.options) {
        for (const option of field.options) {
          html += `      <forge-option value="${option.value}">${option.label}</forge-option>\n`;
        }
      }
      
      html += `    </forge-select>\n`;
    } else if (field.type === 'checkbox') {
      html += `    <forge-checkbox formControlName="${field.name}">\n`;
      html += `      ${field.label}\n`;
      html += `    </forge-checkbox>\n`;
    } else {
      html += `    <forge-text-field\n`;
      html += `      formControlName="${field.name}"\n`;
      html += `      label="${field.label}"\n`;
      html += `      type="${field.type}"`;
      if (field.placeholder) html += `\n      placeholder="${field.placeholder}"`;
      if (field.helperText) html += `\n      helper-text="${field.helperText}"`;
      html += `>\n    </forge-text-field>\n`;
    }

    if (includeAccessibility) {
      html += `    <div *ngIf="form.get('${field.name}')?.invalid && form.get('${field.name}')?.touched" class="error">\n`;
      html += `      ${field.label} is required\n`;
      html += `    </div>\n`;
    }

    html += `  </div>\n`;
    return html;
  }

  private generateValidationScript(fields: any[]): string {
    let script = `<script>
document.getElementById('forgeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  let isValid = true;
  const formData = new FormData(this);
  
`;

    for (const field of fields) {
      if (field.required) {
        script += `  // Validate ${field.name}\n`;
        script += `  const ${field.name}Field = document.getElementById('${field.name}');\n`;
        script += `  const ${field.name}Error = document.getElementById('${field.name}-error');\n`;
        script += `  if (!formData.get('${field.name}')) {\n`;
        script += `    ${field.name}Field.invalid = true;\n`;
        script += `    if (${field.name}Error) ${field.name}Error.style.display = 'block';\n`;
        script += `    isValid = false;\n`;
        script += `  } else {\n`;
        script += `    ${field.name}Field.invalid = false;\n`;
        script += `    if (${field.name}Error) ${field.name}Error.style.display = 'none';\n`;
        script += `  }\n\n`;
      }
    }

    script += `  if (isValid) {
    console.log('Form is valid, submitting...');
    // Submit form or handle data
    const data = Object.fromEntries(formData.entries());
    console.log('Form data:', data);
  }
});
</script>`;

    return script;
  }
}