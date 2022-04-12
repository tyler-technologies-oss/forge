export const QuantityFieldDefaultHtml = () =>`
<forge-quantity-field>
  <label slot="label" for="amount">Label</label>
  <forge-icon-button slot="decrement-button">
    <button type="button" class="tyler-icons" aria-label="Decrement">remove_circle_outline</button>
  </forge-icon-button>
  <forge-text-field>
    <input type="number" id="amount" style="text-align: center;" value="10" />
  </forge-text-field>
  <forge-icon-button slot="increment-button">
    <button type="button" class="tyler-icons" aria-label="Increment">control_point</button>
  </forge-icon-button>
  <div slot="helper-text">This is helpful text</div>
</forge-quantity-field>
`;
