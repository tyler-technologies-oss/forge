export const CardStyledCodeHtml = () => {
  return `
<div class="demo-card">
  <forge-card>
    <div class="forge-card-header-container">
      <h3 class="forge-typography--heading4">This is the card title</h3>
      <forge-icon-button>
        <button type="button">
          <forge-icon name="more_vert"></forge-icon>
        </button>
      </forge-icon-button>
    </div>

    <div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias exercitationem doloremque dolorem ullam, nesciunt quia velit necessitatibus numquam quasi voluptates impedit earum dolores repudiandae facilis totam non quo labore itaque?
      </p>
    </div>

    <div className="forge-card-footer">
      <div>
        <forge-button>
          <button type="button">Ok</button>
        </forge-button>
        <forge-button>
          <button type="button">Cancel</button>
        </forge-button>
      </div>
    </div>
  </forge-card>
</div>
  `;
};

export const CardStyledCodeScss = () =>
  `
.demo-card {
  max-width: 400px;

  .forge-card-header-container {
    display: flex;
    justify-content: space-between;
  }

  .forge-card-footer {
    display: flex;
    justify-content: flex-end;
  }
}`;
