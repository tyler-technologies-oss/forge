export const TimePickerUnmaskedHtml = () => `
<forge-time-picker masked="false">
  <forge-text-field>
    <input type="text" id="time-picker-unmasked" placeholder="hh:mm AM" />
    <label for="time-picker-unmasked" slot="label">Time</label>
  </forge-text-field>
</forge-time-picker>
`;

export const TimePickerUnmaskedBlazor = () => `
<ForgeTimePicker Label="Time" Masked="false" />
`;
