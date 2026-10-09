/* ==========================================================================
   BIODUN STYLE GRID (BSG) - MAIN APPLICATION LOGIC
   Handles page product renders, wishlist management, search, and interactions
   ========================================================================== */

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem('bsg_wishlist')) || [];
  } catch (e) {
    return [];
  }
}

function toggleWishlist(productId) {
  let wishlist = getWishlist();
  const index = wishlist.indexOf(productId);

  if (index > -1) {
    wishlist.splice(index, 1);
    showBsgToast("Item removed from wishlist.", "info");
  } else {
    wishlist.push(productId);
    showBsgToast("Item saved to wishlist.", "success");
  }

  localStorage.setItem('bsg_wishlist', JSON.stringify(wishlist));
  updateWishlistIcons();
}

function updateWishlistIcons() {
  const wishlist = getWishlist();
  document.querySelectorAll('.btn-wishlist').forEach(btn => {
    const pId = parseInt(btn.dataset.id);
    if (wishlist.includes(pId)) {
      btn.innerHTML = `<i class="bi bi-heart-fill text-danger"></i>`;
    } else {
      btn.innerHTML = `<i class="bi bi-heart"></i>`;
    }
  });
}

/**
 * Render Product Card HTML
 */
function createProductCardHtml(product) {
  const wishlist = getWishlist();
  const isWishlisted = wishlist.includes(product.id);

  return `
    <div class="col-6 col-md-4 col-lg-3">
      <div class="bsg-product-card">
        <div class="bsg-product-img-wrapper">
          ${product.discount ? `<span class="badge-bsg-discount">${product.discount}</span>` : ''}
          ${product.isNew ? `<span class="badge-bsg-new">NEW</span>` : ''}
          <a href="product.html?id=${product.id}">
            <img src="${product.image}" alt="${product.name}" class="bsg-product-img" loading="lazy">
          </a>
          <button class="btn btn-sm bg-white rounded-circle position-absolute top-0 end-0 m-2 shadow-sm btn-wishlist" 
                  data-id="${product.id}" onclick="toggleWishlist(${product.id})" title="Add to Wishlist">
            <i class="bi ${isWishlisted ? 'bi-heart-fill text-danger' : 'bi-heart'}"></i>
          </button>
        </div>
        <div class="bsg-card-body">
          <div class="text-muted small mb-1">${product.category}</div>
          <h6 class="bsg-product-title">
            <a href="product.html?id=${product.id}" class="text-dark">${product.name}</a>
          </h6>
          <div class="mt-auto d-flex align-items-center justify-content-between pt-2">
            <div>
              <span class="bsg-product-price">₦${product.price.toLocaleString()}</span>
              ${product.oldPrice ? `<span class="bsg-product-old-price">₦${product.oldPrice.toLocaleString()}</span>` : ''}
            </div>
          </div>
          <div class="d-grid gap-2 mt-3">
            <a href="product.html?id=${product.id}" class="btn btn-bsg-primary btn-sm py-2">View & Select Size</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  updateWishlistIcons();
});
