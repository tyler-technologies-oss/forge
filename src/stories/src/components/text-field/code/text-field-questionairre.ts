export const TextFieldQuestionairreHtml = () => `
<label class="forge-typography--body2">
  Provide a brief description of relevant skillwork for this position.
</label>
<forge-text-field>
  <textarea 
  id="questionairre" 
  placeholder="Add your description..."
  max-length="500"
  type="text"></textarea>
  <span id="count" slot="helper-text" style="text-align: end">&lt;{count}/500&gt;</span>
</forge-text-field>
`;

export const TextFieldQuestionairreTs = () => `
  const textarea = document.getElementById('questionairre');
  const counter = document.getElementById('count');
  textarea.addEventListener('input', () => {
    counter.innerHtml = '&lt;' + textarea.value.length + '/500&gt;'; 
  });
`;