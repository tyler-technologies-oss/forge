export const TextFieldChatFieldHtml = () => `
<forge-text-field>
  <label for="chat-field" slot="label">
    Message
  </label>
  <input type="text" id="chat-field" />
  <forge-icon-button slot="trailing">
    <button class="tyler-icons">send</button>
  </forge-icon-button>
</forge-text-field>
`;