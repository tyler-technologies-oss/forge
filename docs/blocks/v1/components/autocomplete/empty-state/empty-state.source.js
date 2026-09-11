const states = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" }
];
const filter = (filterText) => states.filter((state) => state.label.toLowerCase().includes(filterText.toLowerCase()));
const autocomplete = document.querySelector("forge-autocomplete");
if (autocomplete) {
  autocomplete.filter = filter;
  autocomplete.emptyStateBuilder = (filterText) => {
    const el = document.createElement("div");
    el.innerHTML = `<strong>No matches for "${filterText}"</strong><br>Try a different search term.`;
    return el;
  };
}
