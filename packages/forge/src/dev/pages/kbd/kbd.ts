import '$src/shared';
import '@tylertech/forge/kbd';

document.addEventListener('keydown', (event: KeyboardEvent) => {
  console.log(event.key);
});
