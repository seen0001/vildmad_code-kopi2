// kode til at filter virker dynamisk
function filterItems() {
  const checkedCategories = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const items = document.querySelectorAll(".item");
  items.forEach(function (item) {
    const categories = item.classList;
    if (checkedCategories.length === 0 || checkedCategories.some((category) => categories.contains(category))) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
