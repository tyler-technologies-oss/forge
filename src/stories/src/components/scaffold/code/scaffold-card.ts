export const ScaffoldCardHtml = () => `
  <forge-card>
    <div style="display: flex; justify-content: space-between">
      <h3 class="forge-typography--headline6">Scaffold header</h3>
      <forge-icon-button>
        <button class="tyler-icons">more_vert</button>
      </forge-icon-button>
    </div>
    <div>
      <p class="forge-typography--body2">Scaffold body</p>
    </div>
    <div style="display: flex; justify-content: flex-end">
      <div>
        <forge-button type="unelevated">
          <button>Scaffold footer</button>
        </forge-button>
      </div>
    </div>
  </forge-card>
`;

export const ScaffoldCardBlazor = () => `
  <ForgeCard>
    <div style="display: flex; justify-content: space-between">
      <h3 class="forge-typography--headline6">Scaffold header</h3>
      <ForgeIconButton>
        <button class="tyler-icons">more_vert</button>
      </ForgeIconButton>
    </div>
    <div>
      <p class="forge-typography--body2">Scaffold body</p>
    </div>
    <div style="display: flex; justify-content: flex-end">
      <div>
        <ForgeButton ButtonType="@ButtonType.Unelevated">
          <button>Scaffold footer</button>
        </ForgeButton>
      </div>
    </div>
  </ForgeCard>
`;