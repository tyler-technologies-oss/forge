export const PageStateDefaultHtml = () => `
<forge-page-state>
  <img src="https://cdn.forge.tylertech.com/v1/images/spot-hero/404-error-spot-hero.svg" alt="" slot="graphic" />
  <div slot="title">Nothing but tumbleweeds here...</div>
  <p slot="message">Even our best explorer couldn't find the page you're looking for. It might have been removed or you may have mistyped the URL.</p>
  <forge-button variant="raised" slot="action">Go back</forge-button>
  <forge-button variant="outlined" slot="action">Refresh</forge-button>
</forge-page-state>
`;
