import React from 'react';

export const FormikTextField = ({field, form, ...props}) => {
  return (
    <>
      <input type="text" {...field} {...props}/>
      {form.touched[field.name] && form.errors[field.name] && (
        <span slot="helper-text">{form.errors[field.name]}</span>
      )}
    </>
  )
};

export const FormikAutocompleteField = ({field, form, ...props}) => {
  return (
    <>
      <input type="text" {...field} {...props}/>
      <i slot="trailing" className={'tyler-icons forge-dropdown-icon'} aria-hidden="true">arrow_drop_down</i>
      {form.touched[field.name] && form.errors[field.name] && (
        <span slot="helper-text">{form.errors[field.name]}</span>
      )}
    </>
  )
}

export const FormikCheckbox = ({field, form, ...props}) => {
  return (
    <>
       <input type="checkbox" {...field} {...props}/>
      {form.touched[field.name] && form.errors[field.name] && (
        <span slot="helper-text">{form.errors[field.name]}</span>
      )}
    </>
  )
}

export const FormikRadioButton = ({field, form, ...props}) => {
  return (
    <>
      <input type="radio" {...field} {...props}/>
      {form.touched[field.name] && form.errors[field.name] && (
        <span slot="helper-text">{form.errors[field.name]}</span>
      )}
    </>
  ) 
}