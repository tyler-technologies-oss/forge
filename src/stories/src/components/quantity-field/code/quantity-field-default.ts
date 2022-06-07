export const QuantityFieldDefaultHtml = () =>`
<forge-quantity-field>
  <label slot="label" for="amount">Label</label>
  <forge-icon-button slot="decrement-button">
    <button type="button" aria-label="Decrement">
      <forge-icon name="remove_circle_outline"></forge-icon>
    </button>
  </forge-icon-button>
  <forge-text-field>
    <input type="number" id="amount" style="text-align: center;" value="10" />
  </forge-text-field>
  <forge-icon-button slot="increment-button">
    <button type="button" aria-label="Increment">
      <forge-icon name="control_point"></forge-icon>
    </button>
  </forge-icon-button>
  <div slot="helper-text">This is helpful text</div>
</forge-quantity-field>
`;
