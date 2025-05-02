
// Giỏ hàng lưu trong localStorage
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let item = cart.find(p => p.name === name);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Đã thêm vào giỏ hàng!");
  updateCartIcon();
}

// Cập nhật số hiển thị trên biểu tượng giỏ
function updateCartIcon() {
  const countEl = document.getElementById("cart-count");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (countEl) countEl.innerText = total;
}

// Áp dụng khi trang đã load
document.addEventListener("DOMContentLoaded", () => {
  updateCartIcon();

  // Gắn sự kiện cho tất cả nút "Thêm vào giỏ"
  document.querySelectorAll("button").forEach(btn => {
    if (btn.textContent.includes("Thêm vào giỏ")) {
      btn.addEventListener("click", () => {
        const card = btn.closest(".product-card");
        const name = card.querySelector("h4").innerText;
        const price = parseInt(card.querySelector("p").innerText.replace(/\D/g, ""));
        addToCart(name, price);
      });
    }
  });
});
