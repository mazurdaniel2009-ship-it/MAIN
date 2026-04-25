const products = [
  {
    name: 'Laptop ASUS VivoBook 15',
    desc: 'Procesor Intel i5, 16GB RAM, 512GB SSD. Perfect pentru lucru și studii.',
    price: '7 490 MDL',
    img: 'asus-vivobook.png'
  },
  {
    name: 'iPhone 15 Pro Max',
    desc: 'Titanium design, A17 Pro chip, cel mai bun sistem de camere.',
    price: '24 900 MDL',
    img: 'iphone15promax.png'
  },
  {
    name: 'Monitor Gaming Samsung 27"',
    desc: 'Rată de refresh 144Hz, timp de răspuns 1ms, rezoluție 2K.',
    price: '4 200 MDL',
    img: 'monitor-samsung.png'
  },
  {
    name: 'Consolă PlayStation 5',
    desc: 'Experiență de gaming 4K, 825GB SSD, controller DualSense.',
    price: '10 500 MDL',
    img: 'ps5.png'
  },
  {
    name: 'Căști Sony WH-1000XM5',
    desc: 'Cea mai bună anulare a zgomotului, autonomie 30 ore.',
    price: '6 800 MDL',
    img: 'sony-headphones.png'
  },
  {
    name: 'Tastatură Mecanică RGB',
    desc: 'Switch-uri roșii, iluminare personalizabilă, carcasă aluminiu.',
    price: '1 250 MDL',
    img: 'keyboard-rgb.png'
  }
];

const grid = document.getElementById('prodGrid');

// Funcția de afișare
function displayProducts() {
  grid.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/250x250?text=Fara+Imagine'">
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="price-row">
          <span class="price">${p.price}</span>
          <button class="add-btn">+ Adaugă</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Apelăm funcția
displayProducts();
