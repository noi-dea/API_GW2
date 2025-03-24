window.onload = () => {
  const lastTab = localStorage.getItem("activeTab") || "products";
  showTab(lastTab);
};

function showTab(tab) {
  const tabs = ["products", "users", "bundles"];
  tabs.forEach((t) => {
    document.getElementById(`${t}-tab`).style.display =
      t === tab ? "block" : "none";
  });

  if (tab === "products") loadProducts();
  if (tab === "users") loadUsers();
  if (tab === "bundles") loadBundles();
}

async function fetchAndConfirm({
  url,
  method = "DELETE",
  body = null,
  confirmMsg,
  onSuccess,
}) {
  if (!confirm(confirmMsg)) return;

  try {
    const response = await fetch(url, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : null,
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      onSuccess?.();
    } else {
      alert(data.message || "Operation failed.");
    }
  } catch (err) {
    alert("Network error occurred.");
  }
}

// Product logic
async function loadProducts() {
  try {
    const res = await fetch("/api/products", { credentials: "include" });
    const products = await res.json();
    const tbody = document.getElementById("product-body");
    tbody.innerHTML = "";

    products.forEach((product) => {
      tbody.appendChild(
        createTableRow(
          [
            product.name,
            product.rarity?.name || "—",
            `$${product.price.toFixed(2)}`,
            `<button class="delete-btn" onclick="deleteProduct('${product._id}')">Delete</button>`,
          ],
          `row-${product._id}`
        )
      );
    });
  } catch {
    alert("Failed to load products.");
  }
}

function deleteProduct(productId) {
  fetchAndConfirm({
    url: `/api/products/${productId}`,
    confirmMsg: "Are you sure you want to delete this product?",
    onSuccess: () => {
      document.getElementById(`row-${productId}`).remove();
      alert("Product deleted.");
    },
  });
}

// Bundle logic
async function loadBundles() {
  try {
    const res = await fetch("/api/bundles", { credentials: "include" });
    const bundles = await res.json();
    const tbody = document.getElementById("bundle-body");
    tbody.innerHTML = "";

    bundles.forEach((bundle) => {
      tbody.appendChild(
        createTableRow(
          [
            bundle.name,
            // bundle.type,
            // bundle.series,
            `$${bundle.price.toFixed(2)}`,
            `<button class="delete-btn" onclick="deleteBundle('${bundle._id}')">Delete</button>`,
          ],
          `bundle-${bundle._id}`
        )
      );
    });
  } catch {
    alert("Failed to load bundles.");
  }
}

function deleteBundle(bundleId) {
  fetchAndConfirm({
    url: `/api/bundles/${bundleId}`,
    confirmMsg: "Are you sure you want to delete this bundle?",
    onSuccess: () => {
      document.getElementById(`bundle-${bundleId}`).remove();
      alert("Bundle deleted.");
    },
  });
}

// User logic
async function loadUsers() {
  try {
    const res = await fetch("/api/users/admin-view", {
      credentials: "include",
    });
    const users = await res.json();
    const tbody = document.getElementById("user-body");
    tbody.innerHTML = "";

    users.forEach((user) => {
      const roleToggle = user.role === "admin" ? "user" : "admin";
      tbody.appendChild(
        createTableRow([
          user.email,
          user.name,
          user.role,
          `<button class="change-role-btn" onclick="changeRole('${
            user._id
          }', '${roleToggle}')">Make ${
            roleToggle.charAt(0).toUpperCase() + roleToggle.slice(1)
          }</button>`,
        ])
      );
    });
  } catch {
    alert("Failed to load users.");
  }
}

function changeRole(userId, newRole) {
  fetchAndConfirm({
    url: `/api/users/${userId}/role`,
    method: "PATCH",
    body: { role: newRole },
    confirmMsg: `Change role to ${newRole}?`,
    onSuccess: () => {
      alert("Role updated.");
      loadUsers();
    },
  });
}

// Logout
async function logout() {
  try {
    const res = await fetch("/api/logout", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    if (res.ok) {
      alert("Logged out.");
      window.location.href = "/login";
    } else {
      alert(data.message || "Logout failed.");
    }
  } catch {
    alert("Logout error.");
  }
}

// Util: Generate table row
function createTableRow(cells, rowId = null) {
  const tr = document.createElement("tr");
  if (rowId) tr.id = rowId;
  tr.innerHTML = cells.map((cell) => `<td>${cell}</td>`).join("");
  return tr;
}
