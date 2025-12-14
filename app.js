// Application State
const appState = {
  currentUser: null,
  isAdminLoggedIn: false,
  cart: [],
  products: [],
  categories: [],
  orders: [],
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  initializeProducts()
  initializeCategories()
  setupEventListeners()
})

// Initialize Sample Products
function initializeProducts() {
  appState.products = [
    {
      id: 1,
      name: "Oxidize Earrings",
      category: "Oxidize Earrings",
      price: 250,
      description: "Elegant oxidize earrings",
      image: "https://vkjtnupknuwhtyqiefwa.supabase.co/storage/v1/object/public/Jewelry/250tk%20(5).jpg"
    },
    {
      id: 2,
      name: "Oxidize Ring Set",
      category: "Oxidize Rings",
      price: 300,
      description: "Beautiful oxidize ring set",
      image: "https://vkjtnupknuwhtyqiefwa.supabase.co/storage/v1/object/public/Jewelry/300oxidizedring.png"
    },
    {
      id: 3,
      name: "Oxidize Choker",
      category: "Oxidize Choker",
      price: 350,
      description: "Stunning oxidize choker",
      image: "https://vkjtnupknuwhtyqiefwa.supabase.co/storage/v1/object/public/Jewelry/Ozidized_chocker350tk%20.jpg"
    },
    {
      id: 4,
      name: "Neckpiece Set",
      category: "Golden Polish Neckpiece",
      price: 800,
      description: "18k golden neckpiece",
      image: "https://vkjtnupknuwhtyqiefwa.supabase.co/storage/v1/object/public/Jewelry/850tkgoldchoker%20.jpg"
    },
    {
      id: 5,
      name: "Golden Earrings",
      category: "Golden Polish Earrings",
      price: 300,
      description: "18k golden earrings",
      image: "https://vkjtnupknuwhtyqiefwa.supabase.co/storage/v1/object/public/Jewelry/goldEARring.png"
    },
    {
      id: 6,
      name: "Choker Necklace",
      category: "Oxidize Choker",
      price: 550,
      description: "Stunning choker",
      image: "https://vkjtnupknuwhtyqiefwa.supabase.co/storage/v1/object/public/Jewelry/550tkchoker%20.jpg"
    },
    {
      id: 7,
      name: "Choker Necklace",
      category: "Oxidize Choker",
      price: 550,
      description: "Stunning choker",
      image:"https://vkjtnupknuwhtyqiefwa.supabase.co/storage/v1/object/public/Jewelry/550tk%20choker%20(1).jpg"
    },
    {
      id: 8,
      name: "Oxidize Earrings",
      category: "Oxidize Earrings",
      price: 800,
      description: "Elegant oxidize earring",
      image: "https://vkjtnupknuwhtyqiefwa.supabase.co/storage/v1/object/public/Jewelry/250tk%20(6).jpg"
    },
    {
      id: 9,
      name: "Nose Pin",
      category: "Oxidize Noth Nose Pin",
      price: 100,
      description: "Traditional nose pin",
      image: "https://vkjtnupknuwhtyqiefwa.supabase.co/storage/v1/object/public/Jewelry/100tk%20%20(1)nosering.jpg"
    },
    {
      id: 10,
      name: "Neckpiece Set",
      category: "Golden Polish Neckpiece",
      price: 300,
      description: " neckpiece ",
      image: "https://vkjtnupknuwhtyqiefwa.supabase.co/storage/v1/object/public/Jewelry/300tk%20.jpg"
    },
    {
      id: 11,
      name: "Simple Banglest",
      category: "Oxidize Bangles",
      price: 260,
      description: "Minimalist bangles",
      image: "https://vkjtnupknuwhtyqiefwa.supabase.co/storage/v1/object/public/Jewelry/220tkbangles.jpg"
    },
    {
      id: 12,
      name: "Nose Pin",
      category: "Oxidize Noth Nose Pin",
      price: 100,
      description: "Traditional nose pin",
      image:"https://vkjtnupknuwhtyqiefwa.supabase.co/storage/v1/object/public/Jewelry/100tknosering%20.jpg"
    },
  ]
  renderProducts()
  updateAdminStats()
}

// Initialize Sample Categories
function initializeCategories() {
  appState.categories = [
    { id: 1, name: "Oxidize Earrings", description: "Beautiful oxidize earrings collection" },
    { id: 2, name: "Oxidize Rings", description: "Elegant oxidize rings" },
    { id: 3, name: "Stone Rings", description: "Precious stone rings" },
    { id: 4, name: "Golden Polish", description: "18k golden polish jewelry" },
    { id: 5, name: "Multani Earrings", description: "Traditional multani earrings" },
  ]
}

// Setup Event Listeners
function setupEventListeners() {
  document.getElementById("loginForm").addEventListener("submit", handleLogin)
  document.getElementById("signupForm").addEventListener("submit", handleSignup)
  document.getElementById("productImage").addEventListener("change", previewProductImage)
  // Ensure admin UI reflects stored admin account state
  checkAdminPresence()
}

// Navigation and Page Management
function showHome(e) {
  if (e) e.preventDefault()
  switchPage("homeSection")
}

function showShop(e) {
  if (e) e.preventDefault()
  switchPage("shopSection")
}

function showAbout(e) {
  if (e) e.preventDefault()
  switchPage("aboutSection")
}

function showAdmin(e) {
  if (e) e.preventDefault()
  switchPage("adminSection")
}

function switchPage(pageId) {
  document.querySelectorAll(".page-section").forEach((section) => {
    section.classList.remove("active")
  })
  document.getElementById(pageId).classList.add("active")
  window.scrollTo(0, 0)
}

// Authentication
function toggleAuthModal(e) {
  if (e) e.preventDefault()
  const modal = document.getElementById("authModal")
  modal.classList.toggle("active")
}

function closeAuthModal() {
  document.getElementById("authModal").classList.remove("active")
}

function switchAuthTab(tab) {
  document.querySelectorAll(".auth-tab").forEach((t) => t.classList.remove("active"))
  document.querySelectorAll(".auth-form").forEach((f) => f.classList.remove("active"))

  document.querySelector(`[onclick="switchAuthTab('${tab}')"]`).classList.add("active")

  if (tab === "login") {
    document.getElementById("loginForm").classList.add("active")
  } else {
    document.getElementById("signupForm").classList.add("active")
  }
}

function handleLogin(e) {
  e.preventDefault()
  const email = e.target[0].value
  appState.currentUser = { email, name: email.split("@")[0] }
  closeAuthModal()
  document.querySelector(".auth-link").textContent = `Hi, ${appState.currentUser.name}`
  e.target.reset()
}

function handleSignup(e) {
  e.preventDefault()
  const name = e.target[0].value
  const email = e.target[1].value
  appState.currentUser = { name, email }
  closeAuthModal()
  document.querySelector(".auth-link").textContent = `Hi, ${name}`
  e.target.reset()
}

// Search and Filter
function toggleSearch() {
  document.getElementById("searchBar").classList.toggle("active")
}

function filterProducts() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase()
  const filtered = appState.products.filter(
    (p) => p.name.toLowerCase().includes(searchTerm) || p.category.toLowerCase().includes(searchTerm),
  )
  renderProducts(filtered)
}

function filterByCategory(category) {
  document.getElementById("categoryFilter").value = category
  switchPage("shopSection")
  applyFilters()
}

function applyFilters() {
  let filtered = appState.products

  const categoryFilter = document.getElementById("categoryFilter").value
  const priceFilter = Number.parseInt(document.getElementById("priceFilter").value)
  const sortFilter = document.getElementById("sortFilter").value

  if (categoryFilter) {
    filtered = filtered.filter((p) => p.category === categoryFilter)
  }

  filtered = filtered.filter((p) => p.price <= priceFilter)

  if (sortFilter === "price-low") {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sortFilter === "price-high") {
    filtered.sort((a, b) => b.price - a.price)
  }

  renderProducts(filtered)
  document.getElementById("maxPrice").textContent = `₹${priceFilter.toLocaleString()}`
}

// Render Products
function renderProducts(productsToRender = appState.products) {
  const grid = document.getElementById("productsGrid")
  grid.innerHTML = ""

  if (productsToRender.length === 0) {
    grid.innerHTML = '<div class="no-products">No products found</div>'
    return
  }

  productsToRender.forEach((product) => {
    const card = document.createElement("div")
    card.className = "product-card"

    const imageHtml = product.image
      ? `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: cover;">`
      : '<div class="product-image">No Image Available</div>'

    card.innerHTML = `
      ${imageHtml}
      <div class="product-content">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">₹${product.price}</div>
        <p class="product-description">${product.description}</p>
        <div class="product-actions">
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `
    grid.appendChild(card)
  })
}

// Cart Management
function addToCart(productId) {
  const product = appState.products.find((p) => p.id === productId)
  const existingItem = appState.cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    appState.cart.push({ ...product, quantity: 1 })
  }

  updateCart()
  showCart()
}

function updateCart() {
  document.getElementById("cartCount").textContent = appState.cart.length
  renderCartItems()
  updateCartTotal()
}

function renderCartItems() {
  const cartItems = document.getElementById("cartItems")
  cartItems.innerHTML = ""

  if (appState.cart.length === 0) {
    cartItems.innerHTML =
      '<p style="padding: 1rem; text-align: center; color: var(--text-secondary);">Your cart is empty</p>'
    return
  }

  appState.cart.forEach((item) => {
    const itemElement = document.createElement("div")
    itemElement.className = "cart-item"
    itemElement.innerHTML = `
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price}</div>
            </div>
            <div class="cart-item-actions">
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `
    cartItems.appendChild(itemElement)
  })
}

function updateQty(productId, change) {
  const item = appState.cart.find((i) => i.id === productId)
  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      removeFromCart(productId)
    } else {
      updateCart()
    }
  }
}

function removeFromCart(productId) {
  appState.cart = appState.cart.filter((item) => item.id !== productId)
  updateCart()
}

function updateCartTotal() {
  const total = appState.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  document.getElementById("cartTotal").textContent = `₹${total.toLocaleString()}`
}

function showCart() {
  document.getElementById("cartSidebar").classList.add("active")
}

function closeCart() {
  document.getElementById("cartSidebar").classList.remove("active")
}

// Checkout
function proceedToCheckout() {
  if (appState.cart.length === 0) {
    alert("Your cart is empty!")
    return
  }

  if (!appState.currentUser) {
    alert("Please sign in to checkout")
    toggleAuthModal()
    return
  }

  renderOrderSummary()
  document.getElementById("checkoutModal").classList.add("active")
}

function renderOrderSummary() {
  const summary = document.getElementById("orderSummary")
  summary.innerHTML = ""

  appState.cart.forEach((item) => {
    const itemTotal = item.price * item.quantity
    const div = document.createElement("div")
    div.className = "order-item"
    div.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>₹${itemTotal.toLocaleString()}</span>
        `
    summary.appendChild(div)
  })

  const total = appState.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  document.getElementById("checkoutTotal").textContent = `₹${total.toLocaleString()}`
}

function completeCheckout(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const order = {
    id: Date.now(),
    customer: Object.fromEntries(formData),
    items: appState.cart,
    total: appState.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    date: new Date().toLocaleDateString(),
  }

  appState.orders.push(order)

  const totalAmount = appState.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  document.getElementById("confirmationMessage").textContent =
    `Your order #${order.id} for ₹${totalAmount.toLocaleString()} has been placed successfully! We'll contact you soon.`

  document.getElementById("checkoutModal").classList.remove("active")
  document.getElementById("confirmationModal").classList.add("active")

  appState.cart = []
  updateCart()
  closeCart()
}

function closeCheckout() {
  document.getElementById("checkoutModal").classList.remove("active")
}

function backToHome() {
  document.getElementById("confirmationModal").classList.remove("active")
  showHome()
}

// Admin Panel and Authentication (uses localStorage with hashed password)
async function loginAdmin(e) {
  e.preventDefault()

  const email = e.target[0].value.trim().toLowerCase()
  const password = e.target[1].value

  const stored = getStoredAdmin()
  if (!stored || stored.email !== email) {
    alert("No admin account found for that email. Create an account first.")
    return
  }

  const hashed = await hashPassword(password, stored.salt)
  if (hashed === stored.hash) {
    appState.isAdminLoggedIn = true
    document.getElementById("adminLogin").style.display = "none"
    document.getElementById("adminPanel").style.display = "block"
    const infoEl = document.getElementById("adminInfo")
    if (infoEl) infoEl.textContent = `Logged in as ${stored.name || stored.email}`
    updateAdminStats()
    renderAdminProducts()
    renderAdminCategories()
  } else {
    alert("Invalid email or password.")
  }
}

function logoutAdmin() {
  appState.isAdminLoggedIn = false
  document.getElementById("adminLogin").style.display = "block"
  document.getElementById("adminPanel").style.display = "none"
  const infoEl = document.getElementById("adminInfo")
  if (infoEl) infoEl.textContent = ""
}

function showAdminCreateForm() {
  document.getElementById("adminLoginForm").style.display = "none"
  document.getElementById("adminCreateForm").style.display = "block"
  document.getElementById("adminFormTitle").textContent = "Create Admin Account"
}

function showAdminLoginForm() {
  document.getElementById("adminCreateForm").style.display = "none"
  document.getElementById("adminLoginForm").style.display = "block"
  document.getElementById("adminFormTitle").textContent = "Admin Login"
}

async function createAdmin(e) {
  e.preventDefault()

  if (getStoredAdmin()) {
    alert("An admin account already exists.")
    showAdminLoginForm()
    return
  }

  const name = document.getElementById("adminName").value.trim()
  const email = document.getElementById("adminEmail").value.trim().toLowerCase()
  const password = document.getElementById("adminPassword").value
  const confirm = document.getElementById("adminPasswordConfirm").value

  if (password.length < 8) {
    alert("Password must be at least 8 characters")
    return
  }
  if (password !== confirm) {
    alert("Passwords do not match")
    return
  }

  const salt = generateSalt()
  const hash = await hashPassword(password, salt)

  const adminObj = { name, email, salt, hash }
  setStoredAdmin(adminObj)

  alert("Admin account created. Please log in.")
  showAdminLoginForm()
  document.getElementById("adminCreateForm").reset()
}

function generateSalt() {
  const arr = new Uint8Array(16)
  window.crypto.getRandomValues(arr)
  return bufferToHex(arr)
}

function bufferToHex(buffer) {
  if (buffer instanceof ArrayBuffer) buffer = new Uint8Array(buffer)
  return Array.from(buffer).map((b) => b.toString(16).padStart(2, "0")).join("")
}

async function hashPassword(password, saltHex) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + saltHex)
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data)
  return bufferToHex(hashBuffer)
}

function getStoredAdmin() {
  try {
    const raw = localStorage.getItem("alok_admin")
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    return null
  }
}

function setStoredAdmin(adminObj) {
  localStorage.setItem("alok_admin", JSON.stringify(adminObj))
}

function checkAdminPresence() {
  const stored = getStoredAdmin()
  if (stored) {
    // show login by default
    document.getElementById("adminCreateForm").style.display = "none"
    document.getElementById("adminLoginForm").style.display = "block"
    document.getElementById("adminFormTitle").textContent = "Admin Login"
  } else {
    // no admin yet => prompt to create one
    document.getElementById("adminCreateForm").style.display = "block"
    document.getElementById("adminLoginForm").style.display = "none"
    document.getElementById("adminFormTitle").textContent = "Create Admin Account"
  }
}

function switchAdminTab(tab) {
  document.querySelectorAll(".admin-tab").forEach((t) => t.classList.remove("active"))
  document.querySelectorAll(".admin-tab-content").forEach((c) => c.classList.remove("active"))

  document.querySelector(`[onclick="switchAdminTab('${tab}')"]`).classList.add("active")
  document.getElementById(tab + "Tab").classList.add("active")
}

function updateAdminStats() {
  document.getElementById("totalProducts").textContent = appState.products.length
  document.getElementById("totalCategories").textContent = appState.categories.length
}

function openProductForm() {
  document.getElementById("productForm").style.display = "block"
}

function closeProductForm() {
  document.getElementById("productForm").style.display = "none"
  document.querySelector(".product-form form").reset()
}

function saveProduct(e) {
  e.preventDefault()

  const newProduct = {
    id: Date.now(),
    name: document.getElementById("productName").value,
    category: document.getElementById("productCategory").value,
    price: Number.parseInt(document.getElementById("productPrice").value),
    description: document.getElementById("productDescription").value,
    image: window.currentProductImageBase64 || null, // Store the Base64 image
  }

  appState.products.push(newProduct)

  // Reset image data for next upload
  window.currentProductImageBase64 = null
  document.getElementById("productImage").value = ""
  document.getElementById("productImagePreview").style.display = "none"

  closeProductForm()
  renderAdminProducts()
  updateAdminStats()
  renderProducts()
}

function renderAdminProducts() {
  const list = document.getElementById("adminProductsList")
  list.innerHTML = ""

  appState.products.forEach((product) => {
    const item = document.createElement("div")
    item.className = "admin-product-item"

    const imageThumbnail = product.image
      ? `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 4px; margin-bottom: 1rem;">`
      : '<div style="width: 100%; height: 150px; background: #f5f5f5; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; border-radius: 4px; color: #999;">No Image</div>'

    item.innerHTML = `
      ${imageThumbnail}
      <h4>${product.name}</h4>
      <p><strong>Category:</strong> ${product.category}</p>
      <p><strong>Price:</strong> ₹${product.price}</p>
      <p>${product.description}</p>
      <div class="admin-item-actions">
        <button class="edit-btn" onclick="editProduct(${product.id})">Edit</button>
        <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
      </div>
    `
    list.appendChild(item)
  })
}

function deleteProduct(productId) {
  if (confirm("Are you sure?")) {
    appState.products = appState.products.filter((p) => p.id !== productId)
    renderAdminProducts()
    renderProducts()
    updateAdminStats()
  }
}

function openCategoryForm() {
  document.getElementById("categoryForm").style.display = "block"
}

function closeCategoryForm() {
  document.getElementById("categoryForm").style.display = "none"
  document.querySelector(".category-form form").reset()
}

function saveCategory(e) {
  e.preventDefault()

  const newCategory = {
    id: Date.now(),
    name: document.getElementById("categoryName").value,
    description: document.getElementById("categoryDescription").value,
  }

  appState.categories.push(newCategory)
  closeCategoryForm()
  renderAdminCategories()
  updateAdminStats()
}

function renderAdminCategories() {
  const list = document.getElementById("categoriesList")
  list.innerHTML = ""

  appState.categories.forEach((category) => {
    const item = document.createElement("div")
    item.className = "admin-category-item"
    item.innerHTML = `
            <h4>${category.name}</h4>
            <p>${category.description}</p>
            <div class="admin-item-actions">
                <button class="edit-btn" onclick="editCategory(${category.id})">Edit</button>
                <button class="delete-btn" onclick="deleteCategory(${category.id})">Delete</button>
            </div>
        `
    list.appendChild(item)
  })
}

function deleteCategory(categoryId) {
  if (confirm("Are you sure?")) {
    appState.categories = appState.categories.filter((c) => c.id !== categoryId)
    renderAdminCategories()
    updateAdminStats()
  }
}

// Image Handling Function for Product Preview
function previewProductImage(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()

    reader.onload = (e) => {
      const previewDiv = document.getElementById("productImagePreview")
      const previewImg = document.getElementById("previewImg")

      previewImg.src = e.target.result
      previewDiv.style.display = "block"

      window.currentProductImageBase64 = e.target.result
    }

    reader.readAsDataURL(file)
  }
}
