export const PageStateDefaultHtml = () => `
<forge-page-state>
  <img src="https://cdn.forge.tylertech.com/v1/images/spot-hero/404-error-spot-hero.svg" alt="" slot="graphic" />
  <div slot="title">Nothing but tumbleweeds here...</div>
  <p slot="message">Even our best explorer couldn't find the page you're looking for. It might have been removed or you may have mistyped the URL.</p>
  <forge-button type="raised" slot="action">
    <button type="button">Go back</button>
  </forge-button>
  <forge-button type="outlined" slot="action">
    <button type="button">Refresh</button>
  </forge-button>
</forge-page-state>
`;
