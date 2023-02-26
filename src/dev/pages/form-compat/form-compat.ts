import '$src/shared';
import '@tylertech/forge/autocomplete';
import '@tylertech/forge/select';
import '@tylertech/forge/text-field';
import '@tylertech/forge/date-picker';
import '@tylertech/forge/date-range-picker';
import '@tylertech/forge/time-picker';
import '@tylertech/forge/file-picker';
import '@tylertech/forge/checkbox';
import '@tylertech/forge/radio';
import '@tylertech/forge/switch';
import '@tylertech/forge/button-toggle';
import '@tylertech/forge/button';
import '@tylertech/forge/button/forge-button.scss';
import './form-compat.scss';
import { ISelectComponent } from '@tylertech/forge/select';

const form = document.querySelector('form#demo-form') as HTMLFormElement;

form.addEventListener('submit', evt => {
  evt.preventDefault();

  const formData = new FormData(form);

  console.group('formData');
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
  console.groupEnd();
});

form.addEventListener('formdata', ({ formData }) => {

});
