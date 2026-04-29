const grid = document.getElementById('prodGrid');

async function incarcaProduse() {
  try {
    const raspuns = await fetch('apple.json');
    const produse = await raspuns.json();
    afiseazaProduse(produse);
  } catch (e) {
    grid.innerHTML = "⚠️ Eroare";
  }
}

function afiseazaProduse(produse) {
  grid.innerHTML = '';
  produse.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}">
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

incarcaProduse();