const url = "https://srnudmmexjrrynebtaij.supabase.co";

const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNybnVkbW1leGpycnluZWJ0YWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwMjUzMDYsImV4cCI6MjAyMzYwMTMwNn0.GrQk7oO_Z8bc9084uQ5SaBluU_EcBb_6p76ob4Pe6PA";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let items = [];

// få produkt gjennom ID
function getProduct() {
  // Check if id is not null before proceeding
  if (id !== null) {
    // Find the product with the specified ID
    const product = items.find((item) => item.id == id);

    // Call the function to display product details on singlesite.html
    showData(product);
  } else {
    console.error("ID parameter is null");
  }
}

// fetche data fra API så lenge ID ikke er 0
if (id !== null) {
  fetch(`${url}/rest/v1/vildmad?id=eq.${id}`, {
    method: "GET",
    headers: {
      apikey: key,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // hente API, sørge for at det ikke er 0
      items = Array.isArray(data) ? data : data.data;
      getProduct(); // kalle på getProduct
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
} else {
  console.error("ID parameter is null");
}

// displayer produktdetaljer
function showData(product) {
  // sørge for at produkt ikke er udefinert
  if (product) {
    document.querySelector(".name").textContent = product.title;
    document.querySelector(".list_head").textContent =
      product.sankelandskaber_0_title;
    document.querySelector(".image").src = product.billede;
    document.querySelector(".where").textContent = product.where;
    document.querySelector(".when").textContent = product.when;
    document.querySelector(".spot").textContent = product.spot;
    document.querySelector(".pick").textContent = product.pick;
    document.querySelector(".be_aware").textContent = product.be_aware;
    document.querySelector(".fun_fact").textContent = product.fun_fact;
  } else {
    console.error("Product not found");
  }
}
