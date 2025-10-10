const products = [
  { id: 1, title: 'Blue T-Shirt', category: 'Clothing', price: 19.99, rating: 4.2, img: "images/tshirt.jpg" },
  { id: 2, title: 'Running Shoes', category: 'Footwear', price: 49.99, rating: 4.6, img: "images/shoes.jpg" },
  { id: 3, title: 'Coffee Mug', category: 'Home', price: 9.99, rating: 4.0, img: "images/mug.jpg" },
  { id: 4, title: 'Denim Jacket', category: 'Clothing', price: 79.99, rating: 4.7, img: "images/jacket.jpg" },
  { id: 5, title: 'Sneakers', category: 'Footwear', price: 59.99, rating: 4.4, img: "images/sneakers.jpg" },
  { id: 6, title: 'Notebook', category: 'Stationery', price: 4.99, rating: 3.9, img: "images/notebook.jpg" }
];

const categoryFilter = document.getElementById('categoryFilter');
const sortSelect = document.getElementById('sortSelect');
const searchInput = document.getElementById('searchInput');
const productsGrid = document.getElementById('productsGrid');

function initFilters(){
  const cats = Array.from(new Set(products.map(p=>p.category)));
  cats.forEach(c=> {
    const opt = document.createElement('option'); 
    opt.value = c; 
    opt.textContent = c; 
    categoryFilter.appendChild(opt);
  });
}

function render(list){
  productsGrid.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('div'); 
    card.className = 'product';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h4>${p.title}</h4>
      <p class="muted">${p.category}</p>
      <p class="price">$${p.price.toFixed(2)}</p>
      <p>Rating: ${p.rating}</p>
    `;
    productsGrid.appendChild(card);
  });
}

function applyFilters(){
  const cat = categoryFilter.value;
  const sort = sortSelect.value;
  const q = searchInput.value.trim().toLowerCase();
  let list = products.slice();

  if(cat !== 'all') list = list.filter(p => p.category === cat);
  if(q) list = list.filter(p => p.title.toLowerCase().includes(q));

  if(sort === 'price-asc') list.sort((a,b) => a.price - b.price);
  if(sort === 'price-desc') list.sort((a,b) => b.price - a.price);
  if(sort === 'rating-desc') list.sort((a,b) => b.rating - a.rating);

  render(list);
}

categoryFilter.addEventListener('change', applyFilters);
sortSelect.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);

initFilters();
render(products);
