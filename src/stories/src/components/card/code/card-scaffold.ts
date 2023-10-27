export const CardScaffoldCodeHtml = () => {
  return `
<forge-card class="scaffold-card">
  <forge-scaffold>
    <forge-toolbar slot="header">
      <h1 slot="start" class="forge-typography--heading4">Lorem ipsum</h1>
    </forge-toolbar>

    <p slot="body" className="forge-typography--body1" tabindex="0" class="card-content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed
      aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus
      enim sint nesciunt provident excepturi dolorum pariatur illum?

      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed
      aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus
      enim sint nesciunt provident excepturi dolorum pariatur illum?

      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed
      aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus
      enim sint nesciunt provident excepturi dolorum pariatur illum?
    </p>

    <forge-toolbar slot="footer" inverted>
      <forge-button type="outlined" slot="end">
        <button type="button">Cancel</button>
      </forge-button>
      <forge-button type="unelevated" slot="end" style="margin-left: 8px;">
        <button type="button">Ok</button>
      </forge-button>
    </forge-toolbar>
  </forge-scaffold>
</forge-card>
  `;
};

export const CardScaffoldCodeScss = () =>
  `
.scaffold-card {
  width: 400px;
  --forge-card-padding: 0;
  --forge-card-height: 300px
}

.card-content {
  padding: 16px;
  margin: 0;
}
  `;
