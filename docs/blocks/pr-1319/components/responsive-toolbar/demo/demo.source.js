const menu = document.querySelector("#example-menu");
if (menu) {
  menu.options = [
    { label: "Add User", value: "add-user" },
    { label: "Remove User", value: "remove-user" },
    { label: "Third action", value: "third-action" }
  ];
}
