(function () {
  let modes = ['two-third', 'equal', 'three', 'single'];
  let whereImAt = 0;
  document.querySelector('#layout-mode-button').textContent = layout.mode;
  document.querySelector('#layout-align-button').textContent = layout.alignment;

  function toggle() {
    let layout = document.querySelector('#layout');
    whereImAt += 1;
    whereImAt = whereImAt % modes.length;
    layout.mode = modes[whereImAt];
    document.querySelector('#layout-mode-button').textContent = layout.mode;
  }

  function toggleTop() {
    if (document.querySelector('#top')) {
      document.querySelector('#top').remove();
    } else {
      let top = document.querySelector('#sudo-top').cloneNode(true);
      top.setAttribute('id', 'top');
      top.style.display = 'flex';
      document.querySelector('#layout').appendChild(top);
    }
  }

  function toggleAlign() {
    let layout = document.querySelector('#layout');
    let align = layout.alignment;
    layout.alignment = align === 'center' ? 'left' : 'center';

    document.querySelector('#layout-align-button').textContent = layout.alignment;
  }

  function toggleSize() {
    let layout = document.querySelector('#layout');
    let size = layout.size;
    layout.size = size === 'wide' ? 'normal' : 'wide';
  }

  document.querySelector('#toggle-top').addEventListener('click', toggleTop);
  document.querySelector('#toggle-mode').addEventListener('click', toggle);
  document.querySelector('#toggle-align').addEventListener('click', toggleAlign);
  document.querySelector('#toggle-size').addEventListener('click', toggleSize);
})();
