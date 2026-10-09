# BIODUN STYLE GRID (BSG) — RESPONSIVE MEN'S NATIVE WEAR E-COMMERCE PROTOTYPE

This is the official frontend prototype/MVP for **BIODUN STYLE GRID (BSG)**, a Nigerian men's native-wear fashion brand, built for stakeholder review and Netlify deployment.

---

## 1. BRAND & STYLING SPECIFICATIONS

- **Brand Name**: BIODUN STYLE GRID (BSG)
- **Primary Burgundy**: `#6A1222` (primary buttons, header accents, key CTA, selected states)
- **Gold**: `#B98B36` (highlights, borders, selected icons)
- **Light Green**: `#AAE3B8` (success states, badges)
- **Black**: `#010101` (headings, main text, nav, footer)
- **White**: `#FFFFFF` (page background, clean spacing)
- **Tech Stack**: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, Bootstrap Icons.

---

## 2. HOW TO RUN LOCALLY

Because this is a pure static HTML5/CSS3/JavaScript web app, no build step or node_modules installation is required.

1. Open your terminal in the project directory:
   ```bash
   cd c:\Users\DELL\Desktop\brand-fashion
   ```
2. Start any standard local HTTP web server:
   - **Python**: `python -m http.server 8000`
   - **Node / npx**: `npx serve .`
   - **VS Code**: Right-click `index.html` -> "Open with Live Server"
3. Open `http://localhost:8000` in your web browser.

---

## 3. HOW TO DEPLOY TO NETLIFY

### Method A: Drag & Drop (Easiest)
1. Log in to [Netlify](https://app.netlify.com).
2. Navigate to **Sites** -> **Add new site** -> **Deploy manually**.
3. Drag and drop the `brand-fashion` root folder directly onto the Netlify upload zone.
4. Your prototype site will be live instantly!

### Method B: Git Continuous Deployment
1. Push this repository to GitHub or GitLab.
2. Select **New site from Git** on Netlify.
3. Set build command to empty (no build step needed) and publish directory to `.` (the root).

---

## 4. WHERE TO ADD THE PAYSTACK TEST PUBLIC KEY

Open `js/paystack.js` and locate the configuration constant at the top of the file:

```javascript
const PAYSTACK_PUBLIC_KEY = "pk_test_xxxxxxxxxxxxx";
```

Replace `"pk_test_xxxxxxxxxxxxx"` with your actual Paystack test public key from your Paystack dashboard settings.

> **IMPORTANT**: Never put a Paystack secret key in frontend JavaScript code! Production payment verification must eventually be performed securely on a backend server via Paystack webhooks or API endpoints.

---

## 5. HOW TO ADD OR EDIT PRODUCTS

All prototype catalog items are stored in `js/products.js`. 

To add a new product, open `js/products.js` and append an object to the `PRODUCTS` array:

```javascript
{
  id: 13,
  name: "Navy Blue Senator Set",
  category: "Senator",
  price: 90000,
  oldPrice: 100000,
  colour: "Blue",
  colourHex: "#000080",
  sizes: ["S", "M", "L", "XL", "XXL"],
  image: "assets/images/your_product_image.jpg",
  description: "Classic navy blue senator outfit crafted for formal events.",
  featured: true,
  isNew: true,
  discount: "10% OFF"
}
```

---

## 6. HOW TO REPLACE PLACEHOLDER IMAGES WITH OFFICIAL PRODUCT PHOTOGRAPHY

1. Save your official high-resolution product photos into the `assets/images/` directory.
2. Update the `image` field in `js/products.js` to point to your new filename (e.g. `assets/images/senator_blue.jpg`).
3. To update the logo, replace `assets/logo.svg` and `assets/logo-white.svg`.

---

## 7. HOW TO CHANGE BRAND COLOURS

All brand color tokens are declared at the top of `css/style.css` in CSS custom properties:

```css
:root {
  --bsg-burgundy: #6A1222;
  --bsg-gold: #B98B36;
  --bsg-light-green: #AAE3B8;
  --bsg-black: #010101;
  --bsg-white: #FFFFFF;
}
```

---

## 8. PROTOTYPE-ONLY FEATURES VS. FUTURE BACKEND REQUIREMENTS

| Feature | Current Prototype Implementation | Future Production Backend Requirement |
|---|---|---|
| **Shopping Cart** | `localStorage` state persistence | DB sync or session token storage |
| **Authentication** | Simulated `localStorage` (`auth.js`) | JWT / Session cookies, password hashing (Bcrypt), OAuth |
| **Orders** | Stored in browser `localStorage` | PostgreSQL / MySQL database with order status workflows |
| **Payment Verification** | Frontend callback modal simulation | Webhook signature verification on server |
| **Inventory Stock** | Static sample array (`products.js`) | Real-time database inventory deduction & stock alerts |
| **Search & Filtering** | Fast client-side JavaScript filtering | Algolia / ElasticSearch / DB queries |

---

## 9. MAIN STAKEHOLDER USER JOURNEYS TO TEST

1. **Standard Shopping & Checkout Flow**:
   - `index.html` -> Click Product -> Select Size (Mandatory) -> Select Color -> Click **ADD TO CART** -> Open `cart.html` -> Proceed to Checkout -> Enter Delivery Details -> Click **PAY WITH PAYSTACK** -> Confirm Order (`order-success.html`).
2. **Buy Now Direct Flow**:
   - Product Page -> Select Size -> Click **BUY NOW** -> Instant redirect to Checkout.
3. **Guest Checkout**:
   - Add item to cart -> Checkout -> Complete purchase without registering an account.
4. **Registration & Login**:
   - Register -> Log in -> View Account details & past order history (`account.html`).
