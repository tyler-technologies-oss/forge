import '$src/shared';
import '@tylertech/forge/radio';
import '@tylertech/forge/label';
import '@tylertech/forge/radio/radio/forge-radio.scss';
import './radio.scss';

const form = document.getElementById('radio-form') as HTMLFormElement;

form.addEventListener('submit', evt => {
  evt.preventDefault();
  const formData = new FormData(form);
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
});
