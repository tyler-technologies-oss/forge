export const CardStyledCodeHtml = () => {
  return `<div class="demo-card">
      <forge-card>
        <div class="forge-card-header-container">
          <h3 class="forge-typography--headline6">This is the card title</h3>
          <forge-icon-button>
            <button class="tyler-icons">more_vert</button>
          </forge-icon-button>
        </div>
        <div>
          <p class="forge-typography--body2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias
          exercitationem doloremque dolorem ullam, nesciunt quia velit necessitatibus numquam quasi
          voluptates impedit
						earum dolores repudiandae facilis totam non quo labore itaque?</p>
        </div>

        <div className="forge-card-footer">
          <div>
            <forge-button>
              <button>Ok</button>
            </forge-button>
            <forge-button>
              <button>Cancel</button>
            </forge-button>
          </div>
        </div>
      </forge-card>
    </div>`;
};

export const CardStyledCodeBlazor = () => {
  return `<div class="demo-card">
  <ForgeCard>
    <div>
      <div class="forge-card-header-container">
        <h3 class="forge-typography--headline6">This is the card title</h3>
        <ForgeIconButton>
          <button class="tyler-icons">more_vert</button>
        </ForgeIconButton>
      </div>
      <p class="forge-typography--body2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias
      exercitationem doloremque dolorem ullam, nesciunt quia velit necessitatibus numquam quasi
      voluptates impedit
        earum dolores repudiandae facilis totam non quo labore itaque?</p>
      <div class="forge-card-footer">
        <ForgeButton>Ok</ForgeButton>
        <ForgeButton>Cancel</ForgeButton>
      </div>
    </div>
  </ForgeCard>
</div>`;
};

export const CardStyledCodeScss = () =>
  `.demo-card {
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
