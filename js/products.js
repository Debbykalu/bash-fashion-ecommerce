/* ==========================================================================
   BIODUN STYLE GRID (BSG) - SAMPLE PRODUCTS CATALOG
   Featuring Real BSG Showroom Outfits:
   - Deep Burgundy Embroidered Kaftan
   - Navy Blue Kaftan with Cap
   - Charcoal Monogram Pattern Kaftan
   - Purple Short-Sleeve Senator Native Set
   ========================================================================== */

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Deep Burgundy Embroidered Kaftan",
    category: "Kaftan",
    price: 85000,
    oldPrice: 95000,
    colour: "Burgundy",
    colourHex: "#6A1222",
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    image: "assets/images/burgundy_embroidered_kaftan.jpg",
    description: "Tailored deep burgundy long kaftan with geometric chest embroidery and matching traditional Fila cap.",
    featured: true,
    isNew: false,
    discount: "10% OFF"
  },
  {
    id: 2,
    name: "Classic Navy Blue Kaftan & Cap",
    category: "Kaftan",
    price: 75000,
    oldPrice: null,
    colour: "Blue",
    colourHex: "#1034A6",
    sizes: ["M", "L", "XL", "XXL"],
    image: "assets/images/navy_kaftan_fila.jpg",
    description: "Sleek navy blue full-length kaftan outfit complete with gold-accented traditional cap for formal events.",
    featured: true,
    isNew: true,
    discount: null
  },
  {
    id: 3,
    name: "Charcoal Monogram Pattern Kaftan",
    category: "Agbada",
    price: 95000,
    oldPrice: 110000,
    colour: "Black",
    colourHex: "#010101",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "assets/images/charcoal_monogram_kaftan.jpg",
    description: "Exclusive charcoal monogram printed luxury kaftan ensemble with traditional neck beads and cap.",
    featured: true,
    isNew: false,
    discount: "13% OFF"
  },
  {
    id: 4,
    name: "Short-Sleeve Purple Senator Set",
    category: "Senator",
    price: 80000,
    oldPrice: null,
    colour: "Purple",
    colourHex: "#4B2840",
    sizes: ["M", "L", "XL", "XXL", "XXXL"],
    image: "assets/images/purple_native_set.jpg",
    description: "Modern short-sleeved purple senator shirt with zip collar and matching tailored trousers.",
    featured: true,
    isNew: true,
    discount: null
  },
  {
    id: 5,
    name: "Burgundy Royal Senator Suite",
    category: "Senator",
    price: 90000,
    oldPrice: 100000,
    colour: "Burgundy",
    colourHex: "#6A1222",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "assets/images/burgundy_embroidered_kaftan.jpg",
    description: "Signature burgundy senator set handcrafted with precise chest detailing for weddings and galas.",
    featured: true,
    isNew: false,
    discount: "10% OFF"
  },
  {
    id: 6,
    name: "Midnight Navy Kaftan Set",
    category: "Kaftan",
    price: 78000,
    oldPrice: null,
    colour: "Blue",
    colourHex: "#1034A6",
    sizes: ["M", "L", "XL", "XXL"],
    image: "assets/images/navy_kaftan_fila.jpg",
    description: "Tailored midnight navy kaftan two-piece outfit offering timeless Nigerian sophistication.",
    featured: true,
    isNew: false,
    discount: null
  },
  {
    id: 7,
    name: "Black Monogram Heritage Outfit",
    category: "Native Two-Piece",
    price: 88000,
    oldPrice: 98000,
    colour: "Black",
    colourHex: "#010101",
    sizes: ["S", "M", "L", "XL"],
    image: "assets/images/charcoal_monogram_kaftan.jpg",
    description: "Contemporary black monogram native two-piece designed for modern corporate Friday native wear.",
    featured: true,
    isNew: true,
    discount: "10% OFF"
  },
  {
    id: 8,
    name: "Executive Purple Native Two-Piece",
    category: "Native Shirts",
    price: 72000,
    oldPrice: null,
    colour: "Purple",
    colourHex: "#4B2840",
    sizes: ["M", "L", "XL", "XXL", "XXXL"],
    image: "assets/images/purple_native_set.jpg",
    description: "Short-sleeved purple native shirt paired with tapered trousers for relaxed elegance.",
    featured: true,
    isNew: false,
    discount: null
  },
  {
    id: 9,
    name: "Burgundy Grand Atelier Kaftan",
    category: "Agbada",
    price: 105000,
    oldPrice: 120000,
    colour: "Burgundy",
    colourHex: "#6A1222",
    sizes: ["M", "L", "XL", "XXL"],
    image: "assets/images/burgundy_embroidered_kaftan.jpg",
    description: "Grand burgundy embroidered kaftan set crafted for royalty and milestone celebrations.",
    featured: false,
    isNew: true,
    discount: "12% OFF"
  },
  {
    id: 10,
    name: "Royal Navy Ceremonial Kaftan",
    category: "Kaftan",
    price: 82000,
    oldPrice: null,
    colour: "Blue",
    colourHex: "#1034A6",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "assets/images/navy_kaftan_fila.jpg",
    description: "Premium blue ceremonial kaftan with matching embroidered cap for traditional engagements.",
    featured: false,
    isNew: false,
    discount: null
  },
  {
    id: 11,
    name: "Charcoal Signature Monogram Kaftan",
    category: "Agbada",
    price: 92000,
    oldPrice: 100000,
    colour: "Black",
    colourHex: "#010101",
    sizes: ["M", "L", "XL", "XXL"],
    image: "assets/images/charcoal_monogram_kaftan.jpg",
    description: "Statement charcoal monogram kaftan tailored with sharp proportions and comfortable fit.",
    featured: false,
    isNew: true,
    discount: "8% OFF"
  },
  {
    id: 12,
    name: "Casual Purple Zip Native Shirt",
    category: "Native Shirts",
    price: 65000,
    oldPrice: null,
    colour: "Purple",
    colourHex: "#4B2840",
    sizes: ["S", "M", "L", "XL"],
    image: "assets/images/purple_native_set.jpg",
    description: "Comfortable short-sleeve purple zip native shirt for casual weekend outings.",
    featured: false,
    isNew: false,
    discount: null
  }
];

// Helper to get all products (Initial + Admin Uploaded)
function getAllProducts() {
  const customProducts = JSON.parse(localStorage.getItem('bsg_custom_products')) || [];
  return [...customProducts, ...INITIAL_PRODUCTS];
}

const PRODUCTS = getAllProducts();

function getProductById(id) {
  const all = getAllProducts();
  const numericId = parseInt(id);
  return all.find(p => p.id === numericId || p.id === id);
}

function saveCustomProduct(productData) {
  const custom = JSON.parse(localStorage.getItem('bsg_custom_products')) || [];
  const newProduct = {
    id: Date.now(),
    name: productData.name,
    category: productData.category,
    price: parseFloat(productData.price),
    oldPrice: productData.oldPrice ? parseFloat(productData.oldPrice) : null,
    colour: productData.colour,
    colourHex: productData.colourHex || '#6A1222',
    sizes: productData.sizes || ["M", "L", "XL", "XXL"],
    image: productData.image || "assets/images/burgundy_embroidered_kaftan.jpg",
    description: productData.description,
    featured: productData.featured || false,
    isNew: true,
    discount: productData.discount || null
  };

  custom.unshift(newProduct);
  localStorage.setItem('bsg_custom_products', JSON.stringify(custom));
  return newProduct;
}

function deleteCustomProduct(id) {
  let custom = JSON.parse(localStorage.getItem('bsg_custom_products')) || [];
  custom = custom.filter(p => p.id !== parseInt(id) && p.id !== id);
  localStorage.setItem('bsg_custom_products', JSON.stringify(custom));
}
