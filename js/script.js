// ================= 1. LOGICA PRODUSE (Automata) =================
const grid = document.getElementById('prodGrid');

// Aici detectam automat in ce pagina suntem pentru a incarca JSON-ul corect
const urlPagina = window.location.pathname;
let fisierJSON = "products.json"; // Fisierul default (acasa)

if (urlPagina.includes("laptopuri")) fisierJSON = "laptopuri.json";
else if (urlPagina.includes("calculatoare")) fisierJSON = "calculatoare.json";
else if (urlPagina.includes("apple")) fisierJSON = "apple.json";
else if (urlPagina.includes("monitoare")) fisierJSON = "monitoare.json";
else if (urlPagina.includes("componente")) fisierJSON = "componente-pc.json";
else if (urlPagina.includes("gaming")) fisierJSON = "gaming.json";
else if (urlPagina.includes("imprimante")) fisierJSON = "imprimante.json";
else if (urlPagina.includes("oferte")) fisierJSON = "oferte.json";

async function incarcaProduse() {
    try {
        const raspuns = await fetch(fisierJSON);
        if (!raspuns.ok) throw new Error('Nu am gasit ' + fisierJSON);
        const produse = await raspuns.json();
        afiseazaProduse(produse);
    } catch (e) {
        console.error(e);
        grid.innerHTML = "<p>⚠️ Eroare: Fișierul " + fisierJSON + " lipsește.</p>";
    }
}

function afiseazaProduse(produse) {
    grid.innerHTML = '';
    produse.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        // Aici adaugam butonul "+ Adauga" cu functia de cos
        card.innerHTML = `
           <div class="product-img">
             <img src="${p.img}" alt="${p.name}">
           </div>
           <div class="product-info">
             <h3>${p.name}</h3>
             <p>${p.desc}</p>
             <div class="price-row">
               <span class="price">${p.price}</span>
               <button class="add-btn" onclick="adaugaInCos('${p.name}', '${p.price}', '${p.img}')">+ Adaugă</button>
             </div>
           </div>
        `;
        grid.appendChild(card);
    });
}

// ================= 2. LOGICA COS (Cumparaturi) =================
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartCountSpan = document.getElementById('cartCount');
const cartTotalSpan = document.getElementById('cartTotal');

// Coșul este salvat în memoria browserului
let cart = JSON.parse(localStorage.getItem('cosCumparaturi')) || [];

if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        cartModal.style.display = 'flex';
        renderCart();
    });
}

if (closeCart) {
    closeCart.addEventListener('click', () => cartModal.style.display = 'none');
}

// Inchide modalul daca dai click in afara lui
window.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.style.display = 'none';
});

// Functia de adaugare in cos
window.adaugaInCos = function(nume, pret, img) {
    cart.push({ name: nume, price: pret, img: img });
    localStorage.setItem('cosCumparaturi', JSON.stringify(cart));
    renderCart();
    
    // Efect vizual buton
    const btn = event.target;
    const textOriginal = btn.textContent;
    btn.textContent = "✅";
    setTimeout(() => btn.textContent = textOriginal, 1000);
};

// Functia de stergere (Cosul de gunoi)
window.stergeProdus = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('cosCumparaturi', JSON.stringify(cart));
    renderCart();
};

function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; padding:20px;">Coșul este gol.</p>';
        cartCountSpan.textContent = '0';
        cartTotalSpan.textContent = '0 MDL';
        return;
    }

    cart.forEach((item, index) => {
        // Calculam totalul (scoate MDL si spatiile pentru a face adunarea)
        let pretNumeric = parseInt(item.price.replace(/\D/g, ''));
        total += pretNumeric;

        const el = document.createElement('div');
        el.className = 'cart-item';
        el.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div>
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price}</div>
                </div>
            </div>
            <!-- Aici este butonul de gunoi -->
            <button class="delete-btn" onclick="stergeProdus(${index})">🗑️</button>
        `;
        cartItemsContainer.appendChild(el);
    });

    cartCountSpan.textContent = cart.length;
    cartTotalSpan.textContent = total.toLocaleString() + ' MDL';
}

// ================= 3. LOGICA LOGIN =================
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.querySelector('.close-modal');
const loginForm = document.getElementById('loginForm');
const userEmail = document.getElementById('userEmail');

if (loginBtn) loginBtn.addEventListener('click', () => loginModal.style.display = 'flex');
if (closeModal) closeModal.addEventListener('click', () => loginModal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === loginModal) loginModal.style.display = 'none';
});

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        if (email) {
            localStorage.setItem('userEmail', email);
            showLoggedInState(email);
            loginModal.style.display = 'none';
            loginForm.reset();
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('userEmail');
        showLoggedOutState();
    });
}

function showLoggedInState(email) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'flex';
    if (userEmail) { userEmail.style.display = 'inline'; userEmail.textContent = email; }
}

function showLoggedOutState() {
    if (loginBtn) loginBtn.style.display = 'flex';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (userEmail) { userEmail.style.display = 'none'; userEmail.textContent = ''; }
}

// Verificam la incarcare daca suntem logati
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('userEmail');
    if (savedUser) showLoggedInState(savedUser);
});

// ================= START =================
incarcaProduse();
renderCart();
