const url = "https://srnudmmexjrrynebtaij.supabase.co";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNybnVkbW1leGpycnluZWJ0YWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwMjUzMDYsImV4cCI6MjAyMzYwMTMwNn0.GrQk7oO_Z8bc9084uQ5SaBluU_EcBb_6p76ob4Pe6PA";

let items = [];
fetch(url + "/rest/v1/vildmad", {
  method: "GET",
  headers: {
    apikey: key,
  },
})
  .then((res) => res.json())
  .then((data) => {
    items = data;
    showData();
  });

function showData() {
  document.querySelector(".products").innerHTML = "";

  const chosenSeasons = [...document.querySelectorAll("input[name='season[]']:checked")].map((i) => i.value);
  const chosenForests = [...document.querySelectorAll("input[name='forest[]']:checked")].map((i) => i.value);
  const chosenGroups = [...document.querySelectorAll("input[name='group[]']:checked")].map((i) => i.value);

  let filtered = items;
  console.log(filtered, "hej");
  if (chosenSeasons.length > 0) {
    filtered = filtered.filter((item) => chosenSeasons.includes(item.season));
  }
  if (chosenForests.length > 0) {
    filtered = filtered.filter((item) => chosenForests.includes(item.sankelandskaber_0_title));
  }
  if (chosenGroups.length > 0) {
    filtered = filtered.filter((item) => chosenGroups.includes(item.categories_0_name));
  }

  filtered.forEach(showProduct);
}

function showProduct(product) {
  const template = document.querySelector("template").content;

  const copy = template.cloneNode(true);
  const article = copy.querySelector("article");
  article.querySelector("a").href = `singlesite.html?id=${product.id}`;
  article.querySelector("img").src = `${product.illustration}`;
  article.querySelector("img").alt = product.title;
  article.querySelector("h2").textContent = product.title;

  document.querySelector(".products").appendChild(copy);
}

document.querySelectorAll(".sortby_form input[type='checkbox']").forEach((cb) => {
  cb.addEventListener("change", (e) => {
    showData();
  });
});
